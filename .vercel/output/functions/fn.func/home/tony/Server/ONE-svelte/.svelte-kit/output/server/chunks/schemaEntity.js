import { U as UNDEFINED, N as NAN, P as POSITIVE_INFINITY, c as NEGATIVE_INFINITY, d as NEGATIVE_ZERO, H as HOLE, b as stringify } from "./stringify.js";
import { ZodString, ZodNumber, ZodBoolean, ZodArray, ZodObject, ZodRecord, ZodBigInt, ZodSymbol, ZodDate } from "zod";
function parse(serialized, revivers) {
  return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
  if (typeof parsed === "number")
    return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  function hydrate(index, standalone = false) {
    if (index === UNDEFINED)
      return void 0;
    if (index === NAN)
      return NaN;
    if (index === POSITIVE_INFINITY)
      return Infinity;
    if (index === NEGATIVE_INFINITY)
      return -Infinity;
    if (index === NEGATIVE_ZERO)
      return -0;
    if (standalone)
      throw new Error(`Invalid input`);
    if (index in hydrated)
      return hydrated[index];
    const value = values[index];
    if (!value || typeof value !== "object") {
      hydrated[index] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers?.[type];
        if (reviver) {
          return hydrated[index] = reviver(hydrate(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated[index] = new Date(value[1]);
            break;
          case "Set":
            const set = /* @__PURE__ */ new Set();
            hydrated[index] = set;
            for (let i = 1; i < value.length; i += 1) {
              set.add(hydrate(value[i]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index] = map;
            for (let i = 1; i < value.length; i += 2) {
              map.set(hydrate(value[i]), hydrate(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated[index] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index] = obj;
            for (let i = 1; i < value.length; i += 2) {
              obj[value[i]] = hydrate(value[i + 1]);
            }
            break;
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array = new Array(value.length);
        hydrated[index] = array;
        for (let i = 0; i < value.length; i += 1) {
          const n = value[i];
          if (n === HOLE)
            continue;
          array[i] = hydrate(n);
        }
      }
    } else {
      const object = {};
      hydrated[index] = object;
      for (const key in value) {
        const n = value[key];
        object[key] = hydrate(n);
      }
    }
    return hydrated[index];
  }
  return hydrate(0);
}
class SuperFormError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, SuperFormError.prototype);
  }
}
function mapErrors(obj, top = true) {
  const output = {};
  const entries = Object.entries(obj);
  if (entries.length === 1 && entries[0][0] === "_errors" && obj._errors.length) {
    return top ? obj : obj._errors;
  } else if (obj._errors.length) {
    output._errors = obj._errors;
  }
  for (const [key, value] of entries.filter(([key2]) => key2 !== "_errors")) {
    output[key] = mapErrors(value, false);
  }
  return output;
}
function findErrors(errors, path = []) {
  const entries = Object.entries(errors);
  return entries.filter(([, value]) => value !== void 0).flatMap(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      const currPath = path.concat([key]);
      return value.map((message) => ({ path: currPath, message }));
    } else {
      return findErrors(errors[key], path.concat([key]));
    }
  });
}
function setPath(parent, key, value) {
  parent[key] = value;
  return "skip";
}
function pathExists(obj, path, value) {
  const exists = traversePath(obj, path);
  if (!exists)
    return void 0;
  if (value === void 0)
    return exists;
  return value(exists.value) ? exists : void 0;
}
function traversePath(obj, realPath, modifier) {
  if (!realPath.length)
    return void 0;
  const path = [realPath[0]];
  let parent = obj;
  while (path.length < realPath.length) {
    const key2 = path[path.length - 1];
    const value = modifier ? modifier({
      parent,
      key: String(key2),
      value: parent[key2],
      path: path.map((p) => String(p)),
      isLeaf: false,
      set: (v) => setPath(parent, key2, v)
    }) : parent[key2];
    if (value === void 0)
      return void 0;
    else
      parent = value;
    path.push(realPath[path.length]);
  }
  const key = realPath[realPath.length - 1];
  return {
    parent,
    key: String(key),
    value: parent[key],
    path: realPath.map((p) => String(p)),
    isLeaf: true,
    set: (v) => setPath(parent, key, v)
  };
}
function traversePaths(parent, modifier, path = []) {
  for (const key in parent) {
    const value = parent[key];
    const isLeaf = value === null || typeof value !== "object";
    const pathData = {
      parent,
      key,
      value,
      path: path.map(String).concat([key]),
      isLeaf,
      set: (v) => setPath(parent, key, v)
    };
    const status = modifier(pathData);
    if (status === "abort")
      return status;
    else if (status === "skip")
      continue;
    else if (!isLeaf) {
      const status2 = traversePaths(value, modifier, pathData.path);
      if (status2 === "abort")
        return status2;
    }
  }
}
async function traversePathsAsync(parent, modifier, path = []) {
  for (const key in parent) {
    const value = parent[key];
    const isLeaf = value === null || typeof value !== "object";
    const pathData = {
      parent,
      key,
      value,
      path: path.map(String).concat([key]),
      isLeaf,
      set: (v) => setPath(parent, key, v)
    };
    const status = await modifier(pathData);
    if (status === "abort")
      return status;
    else if (status === "skip")
      break;
    else if (!isLeaf) {
      const status2 = traversePaths(value, modifier, pathData.path);
      if (status2 === "abort")
        return status2;
    }
  }
}
function comparePaths(newObj, oldObj) {
  const diffPaths = /* @__PURE__ */ new Map();
  function checkPath(data, compareTo) {
    if (data.isLeaf) {
      const exists = traversePath(compareTo, data.path);
      if (!exists) {
        diffPaths.set(data.path.join(" "), data.path);
      } else if (data.value instanceof Date && exists.value instanceof Date && data.value.getTime() != exists.value.getTime()) {
        diffPaths.set(data.path.join(" "), data.path);
      } else if (data.value !== exists.value) {
        diffPaths.set(data.path.join(" "), data.path);
      }
    }
  }
  traversePaths(newObj, (data) => checkPath(data, oldObj));
  traversePaths(oldObj, (data) => checkPath(data, newObj));
  return Array.from(diffPaths.values());
}
function setPaths(obj, paths, value) {
  for (const path of paths) {
    const leaf = traversePath(obj, path, ({ parent, key, value: value2 }) => {
      if (value2 === void 0 || typeof value2 !== "object") {
        parent[key] = {};
      }
      return parent[key];
    });
    if (leaf)
      leaf.parent[leaf.key] = value;
  }
}
function clone(data) {
  if ("structuredClone" in globalThis) {
    return structuredClone(data);
  }
  return parse(stringify(data));
}
function hasEffects(zodType) {
  const type = unwrapZodType(zodType);
  if (type.effects)
    return true;
  const name = type.zodType._def.typeName;
  if (name == "ZodObject") {
    const obj = type.zodType;
    for (const field of Object.values(obj._def.shape())) {
      if (hasEffects(field))
        return true;
    }
  } else if (name == "ZodArray") {
    const array = type.zodType;
    return hasEffects(array.element);
  }
  return false;
}
function unwrapZodType(zodType) {
  let _wrapped = true;
  let isNullable = false;
  let isOptional = false;
  let hasDefault = false;
  let effects = void 0;
  let defaultValue = void 0;
  while (_wrapped) {
    if (zodType._def.typeName == "ZodNullable") {
      isNullable = true;
      zodType = zodType.unwrap();
    } else if (zodType._def.typeName == "ZodDefault") {
      hasDefault = true;
      defaultValue = zodType._def.defaultValue();
      zodType = zodType._def.innerType;
    } else if (zodType._def.typeName == "ZodOptional") {
      isOptional = true;
      zodType = zodType.unwrap();
    } else if (zodType._def.typeName == "ZodEffects") {
      if (!effects)
        effects = zodType;
      zodType = zodType._def.schema;
    } else {
      _wrapped = false;
    }
  }
  return {
    zodType,
    isNullable,
    isOptional,
    hasDefault,
    defaultValue,
    effects
  };
}
function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  if (hash < 0)
    hash = hash >>> 0;
  return hash.toString(36);
}
function entityHash(meta2) {
  return hashCode(JSON.stringify(meta2.types));
}
function entityData(schema) {
  const cached = getCached(schema);
  if (cached)
    return cached;
  const typeInfos = schemaInfo(schema);
  const defaultEnt = defaultData(schema);
  const metaData = meta(schema);
  const entity = {
    typeInfo: typeInfos,
    defaultEntity: defaultEnt,
    constraints: constraints(schema),
    meta: metaData,
    hash: entityHash(metaData),
    keys: Object.keys(schema.keyof().Values)
  };
  setCached(schema, entity);
  return entity;
}
function setCached(schema, entity) {
  entityCache.set(schema, entity);
}
function getCached(schema) {
  return entityCache.get(schema);
}
const entityCache = /* @__PURE__ */ new WeakMap();
function schemaInfo(schema) {
  return _mapSchema(schema, (obj) => unwrapZodType(obj));
}
function valueOrDefault(value, strict, implicitDefaults, schemaInfo2) {
  if (value)
    return value;
  const { zodType, isNullable, isOptional, hasDefault, defaultValue } = schemaInfo2;
  if (strict && value !== void 0)
    return value;
  if (hasDefault)
    return defaultValue;
  if (isNullable)
    return null;
  if (isOptional)
    return void 0;
  if (implicitDefaults) {
    if (zodType instanceof ZodString)
      return "";
    if (zodType instanceof ZodNumber)
      return 0;
    if (zodType instanceof ZodBoolean)
      return false;
    if (zodType instanceof ZodArray)
      return [];
    if (zodType instanceof ZodObject)
      return defaultData(zodType);
    if (zodType instanceof ZodRecord)
      return {};
    if (zodType instanceof ZodBigInt)
      return BigInt(0);
    if (zodType instanceof ZodSymbol)
      return Symbol();
  }
  return void 0;
}
function defaultData(schema) {
  const fields = Object.keys(schema.keyof().Values);
  let output = {};
  const schemaTypeInfo = schemaInfo(schema);
  output = Object.fromEntries(fields.map((field) => {
    const typeInfo = schemaTypeInfo[field];
    const newValue = valueOrDefault(void 0, true, true, typeInfo);
    return [field, newValue];
  }));
  return output;
}
function constraints(schema) {
  function constraint(key, zodType, info) {
    const output = {};
    if (zodType instanceof ZodString) {
      const patterns = zodType._def.checks.filter((f) => f.kind == "regex");
      if (patterns.length > 1) {
        throw new SuperFormError(`Invalid field "${key}": Only one regex is allowed per field.`);
      }
      const pattern = patterns.length == 1 && patterns[0].kind == "regex" ? patterns[0].regex.source : void 0;
      if (pattern)
        output.pattern = pattern;
      if (zodType.minLength !== null)
        output.minlength = zodType.minLength;
      if (zodType.maxLength !== null)
        output.maxlength = zodType.maxLength;
    } else if (zodType instanceof ZodNumber) {
      const steps = zodType._def.checks.filter((f) => f.kind == "multipleOf");
      if (steps.length > 1) {
        throw new SuperFormError(`Invalid field "${key}": Only one multipleOf is allowed per field.`);
      }
      const step = steps.length == 1 && steps[0].kind == "multipleOf" ? steps[0].value : null;
      if (zodType.minValue !== null)
        output.min = zodType.minValue;
      if (zodType.maxValue !== null)
        output.max = zodType.maxValue;
      if (step !== null)
        output.step = step;
    } else if (zodType instanceof ZodDate) {
      if (zodType.minDate)
        output.min = zodType.minDate.toISOString();
      if (zodType.maxDate)
        output.max = zodType.maxDate.toISOString();
    } else if (zodType instanceof ZodArray) {
      if (zodType._def.minLength)
        output.min = zodType._def.minLength.value;
      if (zodType._def.maxLength)
        output.max = zodType._def.maxLength.value;
      if (zodType._def.exactLength)
        output.min = output.max = zodType._def.exactLength.value;
    }
    if (!info.isNullable && !info.isOptional) {
      output.required = true;
    }
    return Object.keys(output).length > 0 ? output : void 0;
  }
  function mapField(key, value) {
    const info = unwrapZodType(value);
    value = info.zodType;
    if (value instanceof ZodArray) {
      return mapField(key, value._def.type);
    } else if (value instanceof ZodObject) {
      return constraints(value);
    } else {
      return constraint(key, value, info);
    }
  }
  return _mapSchema(schema, (obj, key) => {
    return mapField(key, obj);
  }, (data) => !!data);
}
function meta(schema) {
  return {
    types: _mapSchema(schema, (obj) => {
      let type = unwrapZodType(obj).zodType;
      let name = "";
      let depth = 0;
      while (type instanceof ZodArray) {
        name += "ZodArray<";
        depth++;
        type = type._def.type;
      }
      return name + type.constructor.name + ">".repeat(depth);
    })
  };
}
function _mapSchema(schema, factory, filter) {
  const keys = schema.keyof().Values;
  return Object.fromEntries(Object.keys(keys).map((key) => [key, factory(schema.shape[key], key)]).filter((entry) => filter ? filter(entry[1]) : true));
}
export {
  SuperFormError as S,
  traversePaths as a,
  comparePaths as b,
  clone as c,
  traversePathsAsync as d,
  pathExists as e,
  findErrors as f,
  entityData as g,
  hasEffects as h,
  mapErrors as m,
  parse as p,
  setPaths as s,
  traversePath as t,
  unwrapZodType as u,
  valueOrDefault as v
};
