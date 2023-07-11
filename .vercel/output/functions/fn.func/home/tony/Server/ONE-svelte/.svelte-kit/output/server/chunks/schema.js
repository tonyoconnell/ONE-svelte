import { f as fail } from "./index.js";
import { t as traversePath, S as SuperFormError, g as entityData, m as mapErrors, c as clone, u as unwrapZodType, p as parse, v as valueOrDefault } from "./schemaEntity.js";
import { ZodEffects, ZodObject, ZodArray, ZodString, ZodNumber, ZodBoolean, ZodDate, ZodBigInt, ZodLiteral, ZodUnion, ZodEnum, ZodAny, ZodNativeEnum, ZodSymbol, z } from "zod";
function setError(form, path, error, options = {
  overwrite: false,
  status: 400
}) {
  const errArr = Array.isArray(error) ? error : [error];
  if (!form.errors)
    form.errors = {};
  if (path === null || Array.isArray(path) && path.length === 0) {
    if (!form.errors._errors)
      form.errors._errors = [];
    form.errors._errors = form.errors._errors.concat(errArr);
  } else {
    const realPath = Array.isArray(path) ? path : [path];
    const leaf = traversePath(form.errors, realPath, ({ parent, key, value }) => {
      if (value === void 0)
        parent[key] = {};
      return parent[key];
    });
    if (leaf) {
      leaf.parent[leaf.key] = Array.isArray(leaf.value) && !options.overwrite ? leaf.value.concat(errArr) : errArr;
    }
  }
  form.valid = false;
  return fail(options.status ?? 400, { form });
}
function formDataToValidation(schema, fields, data) {
  const output = {};
  const entityInfo = entityData(schema);
  function parseSingleEntry(key, entry, typeInfo) {
    if (entry && typeof entry !== "string") {
      return void 0;
    } else {
      return parseEntry(key, entry, typeInfo);
    }
  }
  for (const key of fields) {
    const typeInfo = entityInfo.typeInfo[key];
    const entries = data.getAll(key);
    if (!(typeInfo.zodType instanceof ZodArray)) {
      output[key] = parseSingleEntry(key, entries[0], typeInfo);
    } else {
      const arrayType = unwrapZodType(typeInfo.zodType._def.type);
      output[key] = entries.map((e) => parseSingleEntry(key, e, arrayType));
    }
  }
  function parseEntry(field, value, typeInfo) {
    const newValue = valueOrDefault(value, false, true, typeInfo);
    if (!value)
      return newValue;
    const zodType = typeInfo.zodType;
    if (zodType instanceof ZodString) {
      return value;
    } else if (zodType instanceof ZodNumber) {
      return zodType.isInt ? parseInt(value ?? "", 10) : parseFloat(value ?? "");
    } else if (zodType instanceof ZodBoolean) {
      return Boolean(value).valueOf();
    } else if (zodType instanceof ZodDate) {
      return new Date(value ?? "");
    } else if (zodType instanceof ZodArray) {
      const arrayType = unwrapZodType(zodType._def.type);
      return parseEntry(field, value, arrayType);
    } else if (zodType instanceof ZodBigInt) {
      try {
        return BigInt(value ?? ".");
      } catch {
        return NaN;
      }
    } else if (zodType instanceof ZodLiteral) {
      const literalType = typeof zodType.value;
      if (literalType === "string")
        return value;
      else if (literalType === "number")
        return parseFloat(value ?? "");
      else if (literalType === "boolean")
        return Boolean(value).valueOf();
      else {
        throw new SuperFormError("Unsupported ZodLiteral type: " + literalType);
      }
    } else if (zodType instanceof ZodUnion || zodType instanceof ZodEnum || zodType instanceof ZodAny) {
      return value;
    } else if (zodType instanceof ZodNativeEnum) {
      if (value in zodType.enum) {
        const enumValue = zodType.enum[value];
        if (typeof enumValue === "number")
          return enumValue;
        else if (enumValue in zodType.enum)
          return zodType.enum[enumValue];
      }
      return void 0;
    } else if (zodType instanceof ZodSymbol) {
      return Symbol(value);
    }
    throw new SuperFormError("Unsupported Zod default type: " + zodType.constructor.name);
  }
  return output;
}
async function superValidate(data, schema, options) {
  if (data && typeof data === "object" && "safeParseAsync" in data) {
    options = schema;
    schema = data;
    data = null;
  }
  options = {
    noErrors: false,
    errors: void 0,
    includeMeta: false,
    ...options
  };
  const originalSchema = schema;
  let wrappedSchema = schema;
  let hasEffects = false;
  while (wrappedSchema instanceof ZodEffects) {
    hasEffects = true;
    wrappedSchema = wrappedSchema._def.schema;
  }
  if (!(wrappedSchema instanceof ZodObject)) {
    throw new SuperFormError("Only Zod schema objects can be used with superValidate. Define the schema with z.object({ ... }) and optionally refine/superRefine/transform at the end.");
  }
  const realSchema = wrappedSchema;
  const entityInfo = entityData(realSchema);
  const schemaKeys = entityInfo.keys;
  function parseFormData(data2) {
    function tryParseSuperJson(data3) {
      if (data3.has("__superform_json")) {
        try {
          const output2 = parse(data3.getAll("__superform_json").join("") ?? "");
          if (typeof output2 === "object") {
            return output2;
          }
        } catch {
        }
      }
      return null;
    }
    const superJson = tryParseSuperJson(data2);
    return superJson ? superJson : formDataToValidation(realSchema, schemaKeys, data2);
  }
  async function tryParseFormData(request) {
    let formData = void 0;
    try {
      formData = await request.formData();
    } catch (e) {
      if (e instanceof TypeError && e.message.includes("already been consumed")) {
        throw e;
      }
      return null;
    }
    return parseFormData(formData);
  }
  function parseSearchParams(data2) {
    if (data2 instanceof URL)
      data2 = data2.searchParams;
    const convert = new FormData();
    for (const [key, value] of data2.entries()) {
      convert.append(key, value);
    }
    return parseFormData(convert);
  }
  if (data instanceof FormData) {
    data = parseFormData(data);
  } else if (data instanceof Request) {
    data = await tryParseFormData(data);
  } else if (data instanceof URL || data instanceof URLSearchParams) {
    data = parseSearchParams(data);
  } else if (data && typeof data === "object" && "request" in data && data.request instanceof Request) {
    data = await tryParseFormData(data.request);
  }
  let output;
  if (!data) {
    const addErrors = options.errors === true;
    let valid = false;
    let errors = {};
    if (hasEffects || addErrors) {
      const result = await originalSchema.spa(entityInfo.defaultEntity);
      valid = result.success;
      if (result.success) {
        data = result.data;
      } else if (addErrors) {
        errors = mapErrors(result.error.format());
      }
    }
    output = {
      valid,
      errors,
      // Copy the default entity so it's not modified
      data: data ?? clone(entityInfo.defaultEntity),
      empty: true,
      constraints: entityInfo.constraints
    };
  } else {
    const addErrors = options.errors !== false && options.noErrors !== true;
    const partialData = data;
    const result = await originalSchema.spa(partialData);
    if (!result.success) {
      const errors = addErrors ? mapErrors(result.error.format()) : {};
      output = {
        valid: false,
        errors,
        data: Object.fromEntries(schemaKeys.map((key) => [
          key,
          key in partialData ? partialData[key] : clone(entityInfo.defaultEntity[key])
        ])),
        empty: false,
        constraints: entityInfo.constraints
      };
    } else {
      output = {
        valid: true,
        errors: {},
        data: result.data,
        empty: false,
        constraints: entityInfo.constraints
      };
    }
  }
  if (options.includeMeta) {
    output.meta = entityInfo.meta;
  }
  if (options.id !== void 0) {
    output.id = options.id === true ? entityInfo.hash : options.id;
  }
  return output;
}
const authSchema = z.object({
  username: z.string(),
  password: z.string()
});
export {
  setError as a,
  authSchema as b,
  superValidate as s
};
