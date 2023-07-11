import { p as parse, t as traversePath, S as SuperFormError, c as clone$1, a as traversePaths, s as setPaths, h as hasEffects, u as unwrapZodType, b as comparePaths, f as findErrors, m as mapErrors, d as traversePathsAsync, e as pathExists } from "./schemaEntity.js";
import { p as page } from "./stores.js";
import { d as derived, w as writable } from "./index2.js";
import { g as get_store_value, o as onDestroy, t as tick } from "./index3.js";
import { B as BROWSER } from "./prod-ssr.js";
import { b as stringify } from "./stringify.js";
import "./index.js";
const browser = BROWSER;
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const invalidateAll = /* @__PURE__ */ client_method("invalidate_all");
const applyAction = client_method("apply_action");
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = parse(parsed.data);
  }
  return parsed;
}
function clone(element) {
  return (
    /** @type {T} */
    HTMLElement.prototype.cloneNode.call(element)
  );
}
function enhance(form_element, submit = () => {
}) {
  const fallback_callback = async ({ action, result, reset }) => {
    if (result.type === "success") {
      if (reset !== false) {
        HTMLFormElement.prototype.reset.call(form_element);
      }
      await invalidateAll();
    }
    if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") {
      applyAction(result);
    }
  };
  async function handle_submit(event) {
    event.preventDefault();
    const action = new URL(
      // We can't do submitter.formAction directly because that property is always set
      event.submitter?.hasAttribute("formaction") ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : clone(form_element).action
    );
    const form_data = new FormData(form_element);
    const submitter_name = event.submitter?.getAttribute("name");
    if (submitter_name) {
      form_data.append(submitter_name, event.submitter?.getAttribute("value") ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit({
      action,
      cancel,
      controller,
      get data() {
        return form_data;
      },
      formData: form_data,
      get form() {
        return form_element;
      },
      formElement: form_element,
      submitter: event.submitter
    }) ?? fallback_callback;
    if (cancelled)
      return;
    let result;
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-sveltekit-action": "true"
        },
        cache: "no-store",
        body: form_data,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error")
        result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        error?.name === "AbortError"
      )
        return;
      result = { type: "error", error };
    }
    callback({
      action,
      get data() {
        return form_data;
      },
      formData: form_data,
      get form() {
        return form_element;
      },
      formElement: form_element,
      update: (opts) => fallback_callback({ action, result, reset: opts?.reset }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
    }
  };
}
const isElementInViewport = (el, topOffset = 0) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
const scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
  const elementRect = el.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const top = absoluteElementTop - window.innerHeight / (2 * offset);
  window.scrollTo({ left: 0, top, behavior });
};
function normalizePath(path) {
  return Array.isArray(path) ? path : [path];
}
function fieldProxy(form, path) {
  const path2 = normalizePath(path);
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => {
        unsub();
      };
    },
    //subscribe: proxy.subscribe,
    update(upd) {
      form.update((f) => {
        const output = traversePath(f, path2);
        if (output)
          output.parent[output.key] = upd(output.value);
        return f;
      });
    },
    set(value) {
      form.update((f) => {
        const output = traversePath(f, path2);
        if (output)
          output.parent[output.key] = value;
        return f;
      });
    }
  };
}
var FetchStatus;
(function(FetchStatus2) {
  FetchStatus2[FetchStatus2["Idle"] = 0] = "Idle";
  FetchStatus2[FetchStatus2["Submitting"] = 1] = "Submitting";
  FetchStatus2[FetchStatus2["Delayed"] = 2] = "Delayed";
  FetchStatus2[FetchStatus2["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
const defaultFormOptions = {
  applyAction: true,
  invalidateAll: true,
  resetForm: false,
  autoFocusOnError: "detect",
  scrollToError: "smooth",
  errorSelector: "[data-invalid]",
  selectErrorText: false,
  stickyNavbar: void 0,
  taintedMessage: "Do you want to leave this page? Changes you made may not be saved.",
  onSubmit: void 0,
  onResult: void 0,
  onUpdate: void 0,
  onUpdated: void 0,
  onError: (event) => {
    console.warn("Unhandled Superform error, use onError event to handle it:", event.result.error);
  },
  dataType: "form",
  validators: void 0,
  defaultValidator: "keep",
  clearOnSubmit: "errors-and-message",
  delayMs: 500,
  timeoutMs: 8e3,
  multipleSubmits: "prevent",
  validation: void 0,
  SPA: void 0,
  validateMethod: "auto"
};
function superForm(form, options = {}) {
  {
    options = { ...defaultFormOptions, ...options };
    if (typeof form === "string" && typeof options.id === "string") {
      throw new SuperFormError("You cannot specify an id both in the first superForm argument and in the options.");
    }
    if (options.SPA && options.validators === void 0) {
      console.warn("No validators set for Superform in SPA mode. Add them to the validators option, or set it to false to disable this warning.");
    }
  }
  let _formId = typeof form === "string" ? form : options.id ?? form?.id;
  const FormId = writable(_formId);
  const postedForm = get_store_value(page).form;
  if (postedForm && typeof postedForm === "object") {
    for (const superForm2 of Context_findValidationForms(postedForm).reverse()) {
      if (superForm2.id === _formId) {
        form = superForm2;
        break;
      }
    }
  }
  if (!form || typeof form === "string") {
    form = Context_newEmptyForm();
  } else if (Context_isValidationObject(form) === false) {
    form = Context_newEmptyForm(form);
  }
  const form2 = form;
  const initialForm = clone$1(form2);
  if (typeof initialForm.valid !== "boolean") {
    throw new SuperFormError("A non-validation object was passed to superForm. Check what's passed to its first parameter (null/undefined is allowed).");
  }
  const _errors = writable(form2.errors);
  const Context = {
    taintedMessage: options.taintedMessage,
    taintedFormState: clone$1(initialForm.data)
  };
  function Context_setTaintedFormState(data) {
    Context.taintedFormState = clone$1(data);
  }
  function Context_newEmptyForm(data = {}) {
    return {
      valid: false,
      errors: {},
      data,
      empty: true,
      constraints: {}
    };
  }
  function Context_findValidationForms(data) {
    return Object.values(data).filter((v) => Context_isValidationObject(v) !== false);
  }
  function Context_isValidationObject(object) {
    if (!object || typeof object !== "object")
      return false;
    if (!("valid" in object && "empty" in object && typeof object.valid === "boolean")) {
      return false;
    }
    return "id" in object && typeof object.id === "string" ? object.id : void 0;
  }
  function Context_enableTaintedMessage() {
    options.taintedMessage = Context.taintedMessage;
  }
  function Context_newFormStore(data) {
    const _formData = writable(data);
    return {
      subscribe: _formData.subscribe,
      set: (value, options2 = {}) => {
        Tainted_update(value, Context.taintedFormState, options2.taint ?? true);
        Context.taintedFormState = clone$1(value);
        return _formData.set(value);
      },
      update: (updater, options2 = {}) => {
        return _formData.update((value) => {
          const output = updater(value);
          Tainted_update(output, Context.taintedFormState, options2.taint ?? true);
          Context.taintedFormState = clone$1(value);
          return output;
        });
      }
    };
  }
  const Unsubscriptions = [
    FormId.subscribe((id) => _formId = id)
  ];
  function Unsubscriptions_unsubscribe() {
    Unsubscriptions.forEach((unsub) => unsub());
  }
  const Form = Context_newFormStore(form2.data);
  function Form_checkForNestedData(key, value) {
    if (!value || typeof value !== "object")
      return;
    if (Array.isArray(value)) {
      if (value.length > 0)
        Form_checkForNestedData(key, value[0]);
    } else if (!(value instanceof Date)) {
      throw new SuperFormError(`Object found in form field "${key}". Set options.dataType = 'json' and use:enhance to use nested data structures.`);
    }
  }
  async function Form_updateFromValidation(form3, untaint) {
    let cancelled = false;
    const data = {
      form: form3,
      cancel: () => cancelled = true
    };
    for (const event of formEvents.onUpdate) {
      await event(data);
    }
    if (cancelled) {
      if (options.flashMessage)
        cancelFlash(options);
      return;
    }
    if (form3.valid && options.resetForm && (options.resetForm === true || await options.resetForm())) {
      Form_reset(form3.message);
    } else {
      rebind(form3, untaint);
    }
    if (formEvents.onUpdated.length) {
      await tick();
    }
    for (const event of formEvents.onUpdated) {
      event({ form: form3 });
    }
  }
  function Form_reset(message) {
    rebind(clone$1(initialForm), true, message);
  }
  const Form_updateFromActionResult = async (result, untaint) => {
    if (result.type == "error") {
      throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
    }
    if (result.type == "redirect") {
      if (options.resetForm && (options.resetForm === true || await options.resetForm())) {
        Form_reset();
      }
      return;
    }
    if (typeof result.data !== "object") {
      throw new SuperFormError("Non-object validation data returned from ActionResult.");
    }
    const forms = Context_findValidationForms(result.data);
    if (!forms.length) {
      throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
    }
    for (const newForm of forms) {
      if (newForm.id !== _formId)
        continue;
      await Form_updateFromValidation(newForm, untaint ?? (result.status >= 200 && result.status < 300));
    }
  };
  const LastChanges = writable([]);
  const Valid = writable(form2.valid);
  const Empty = writable(form2.empty);
  const Message = writable(form2.message);
  const Constraints = writable(form2.constraints);
  const Meta = writable(form2.meta);
  const Errors = {
    subscribe: _errors.subscribe,
    set: _errors.set,
    update: _errors.update,
    /**
     * To work with client-side validation, errors cannot be deleted but must
     * be set to undefined, to know where they existed before (tainted+error check in oninput)
     */
    clear: (undefinePath) => {
      _errors.update(($errors) => {
        traversePaths($errors, (pathData) => {
          if (Array.isArray(pathData.value)) {
            return pathData.set(void 0);
          }
        });
        if (undefinePath)
          setPaths($errors, [undefinePath], void 0);
        return $errors;
      });
    }
  };
  const Tainted = writable();
  function Tainted__validate(path, taint) {
    if (options.validationMethod == "onblur" || options.validationMethod == "submit-only") {
      return;
    }
    let shouldValidate = options.validationMethod === "oninput";
    if (!shouldValidate) {
      const errorContent = get_store_value(Errors);
      const errorNode = errorContent ? pathExists(errorContent, path) : void 0;
      const hasError = errorNode && errorNode.key in errorNode.parent;
      shouldValidate = !!hasError;
    }
    if (shouldValidate) {
      validateField(path, options.validators, options.defaultValidator, Form, Errors, Tainted, { taint });
    }
  }
  function Tainted_update(newObj, compareAgainst, options2) {
    if (options2 === false) {
      return;
    } else if (options2 === "untaint-all") {
      Tainted.set(void 0);
      return;
    }
    const paths = comparePaths(newObj, compareAgainst);
    if (options2 === true) {
      LastChanges.set(paths);
    }
    if (paths.length) {
      Tainted.update((tainted) => {
        if (!tainted)
          tainted = {};
        setPaths(tainted, paths, options2 === true ? true : void 0);
        return tainted;
      });
      for (const path of paths) {
        Tainted__validate(path, options2);
      }
    }
  }
  function Tainted_set(tainted, newData) {
    Tainted.set(tainted);
    Context_setTaintedFormState(newData);
  }
  const Submitting = writable(false);
  const Delayed = writable(false);
  const Timeout = writable(false);
  const AllErrors = derived(Errors, ($errors) => {
    if (!$errors)
      return [];
    return findErrors($errors);
  });
  const FirstError = derived(AllErrors, ($all) => $all[0] ?? null);
  options.taintedMessage = void 0;
  onDestroy(() => {
    Unsubscriptions_unsubscribe();
    for (const events of Object.values(formEvents)) {
      events.length = 0;
    }
  });
  if (options.dataType !== "json") {
    for (const [key, value] of Object.entries(form2.data)) {
      Form_checkForNestedData(key, value);
    }
  }
  function rebind(form3, untaint, message) {
    if (untaint) {
      Tainted_set(typeof untaint === "boolean" ? void 0 : untaint, form3.data);
    }
    message = message ?? form3.message;
    Form.set(form3.data);
    Message.set(message);
    Empty.set(form3.empty);
    Valid.set(form3.valid);
    Errors.set(form3.errors);
    Meta.set(form3.meta);
    FormId.set(form3.id);
    if (options.flashMessage && shouldSyncFlash(options)) {
      const flash = options.flashMessage.module.getFlash(page);
      if (message && get_store_value(flash) === void 0) {
        flash.set(message);
      }
    }
  }
  const formEvents = {
    onSubmit: options.onSubmit ? [options.onSubmit] : [],
    onResult: options.onResult ? [options.onResult] : [],
    onUpdate: options.onUpdate ? [options.onUpdate] : [],
    onUpdated: options.onUpdated ? [options.onUpdated] : [],
    onError: options.onError ? [options.onError] : []
  };
  const Fields = Object.fromEntries(Object.keys(initialForm.data).map((key) => {
    return [
      key,
      {
        name: key,
        value: fieldProxy(Form, key),
        errors: fieldProxy(Errors, key),
        constraints: fieldProxy(Constraints, key),
        type: initialForm.meta?.types[key]
      }
    ];
  }));
  return {
    form: Form,
    formId: FormId,
    errors: Errors,
    message: Message,
    constraints: Constraints,
    meta: derived(Meta, ($m) => $m),
    fields: Fields,
    tainted: Tainted,
    valid: derived(Valid, ($s) => $s),
    empty: derived(Empty, ($e) => $e),
    submitting: derived(Submitting, ($s) => $s),
    delayed: derived(Delayed, ($d) => $d),
    timeout: derived(Timeout, ($t) => $t),
    options,
    capture: function() {
      return {
        valid: get_store_value(Valid),
        errors: get_store_value(Errors),
        data: get_store_value(Form),
        empty: get_store_value(Empty),
        constraints: get_store_value(Constraints),
        message: get_store_value(Message),
        id: _formId,
        meta: get_store_value(Meta),
        tainted: get_store_value(Tainted)
      };
    },
    restore: function(snapshot) {
      return rebind(snapshot, snapshot.tainted ?? true);
    },
    validate: (path, opts) => {
      return validateField(Array.isArray(path) ? path : [path], options.validators, options.defaultValidator, Form, Errors, Tainted, opts);
    },
    enhance: (el, events) => {
      if (events) {
        if (events.onError) {
          if (options.onError === "apply") {
            throw new SuperFormError('options.onError is set to "apply", cannot add any onError events.');
          } else if (events.onError === "apply") {
            throw new SuperFormError('Cannot add "apply" as onError event in use:enhance.');
          }
          formEvents.onError.push(events.onError);
        }
        if (events.onResult)
          formEvents.onResult.push(events.onResult);
        if (events.onSubmit)
          formEvents.onSubmit.push(events.onSubmit);
        if (events.onUpdate)
          formEvents.onUpdate.push(events.onUpdate);
        if (events.onUpdated)
          formEvents.onUpdated.push(events.onUpdated);
      }
      return formEnhance(el, Submitting, Delayed, Timeout, Errors, Form_updateFromActionResult, options, Form, Message, Context_enableTaintedMessage, formEvents, FormId, Meta, Constraints, Tainted, LastChanges);
    },
    firstError: FirstError,
    allErrors: AllErrors,
    reset: (options2) => Form_reset(options2?.keepMessage ? get_store_value(Message) : void 0)
  };
}
function cancelFlash(options) {
  if (!options.flashMessage || !browser)
    return;
  if (!shouldSyncFlash(options))
    return;
  document.cookie = `flash=; Max-Age=0; Path=${options.flashMessage.cookiePath ?? "/"};`;
}
function shouldSyncFlash(options) {
  if (!options.flashMessage || !browser)
    return false;
  return options.syncFlashMessage;
}
const effectMapCache = /* @__PURE__ */ new WeakMap();
async function validateField(path, validators, defaultValidator, data, Errors, tainted, options = {}) {
  if (options.update === void 0)
    options.update = true;
  if (options.taint === void 0)
    options.taint = false;
  const Context = {
    value: options.value,
    shouldUpdate: true,
    currentData: void 0,
    // Remove numeric indices, they're not used for validators.
    validationPath: path.filter((p) => isNaN(parseInt(p)))
  };
  async function defaultValidate() {
    if (defaultValidator == "clear") {
      Errors_update(void 0);
    }
    return void 0;
  }
  function isPathTainted(path2, tainted2) {
    if (tainted2 === void 0)
      return false;
    const leaf = traversePath(tainted2, path2);
    if (!leaf)
      return false;
    return leaf.value === true;
  }
  function extractValidator(data2, key) {
    if (data2.effects)
      return void 0;
    const type = data2.zodType;
    if (type._def.typeName == "ZodObject") {
      const nextType = type._def.shape()[key];
      const unwrapped = unwrapZodType(nextType);
      return unwrapped.effects ? void 0 : unwrapped.zodType;
    } else if (type._def.typeName == "ZodArray") {
      const array = type;
      const unwrapped = unwrapZodType(array.element);
      if (unwrapped.effects)
        return void 0;
      return extractValidator(unwrapped, key);
    } else {
      throw new SuperFormError("Invalid validator");
    }
  }
  function Errors_get() {
    return get_store_value(Errors);
  }
  function Errors_clear(undefinePath) {
    Errors.clear(undefinePath);
  }
  function Errors_set(newErrors) {
    Errors.set(newErrors);
  }
  function Errors_fromZod(errors) {
    return mapErrors(errors.format());
  }
  function Errors_update(errorMsgs) {
    if (typeof errorMsgs === "string")
      errorMsgs = [errorMsgs];
    if (options.update === true || options.update == "errors") {
      Errors.update((errors) => {
        const error = traversePath(errors, path, (node) => {
          if (node.value === void 0) {
            node.parent[node.key] = {};
            return node.parent[node.key];
          } else {
            return node.value;
          }
        });
        if (!error)
          throw new SuperFormError("Error path could not be created: " + path);
        error.parent[error.key] = errorMsgs ?? void 0;
        return errors;
      });
    }
    return errorMsgs ?? void 0;
  }
  if (!("value" in options)) {
    Context.currentData = get_store_value(data);
    const dataToValidate = traversePath(Context.currentData, path);
    Context.value = dataToValidate?.value;
  } else if (options.update === true || options.update === "value") {
    data.update(($data) => {
      setPaths($data, [path], Context.value);
      return Context.currentData = $data;
    }, { taint: options.taint });
  } else {
    Context.shouldUpdate = false;
  }
  if (typeof validators !== "object") {
    return defaultValidate();
  }
  if ("safeParseAsync" in validators) {
    if (!effectMapCache.has(validators)) {
      effectMapCache.set(validators, hasEffects(validators));
    }
    const effects = effectMapCache.get(validators);
    const perFieldValidator = effects ? void 0 : traversePath(validators, Context.validationPath, (pathData) => {
      return extractValidator(unwrapZodType(pathData.parent), pathData.key);
    });
    if (perFieldValidator) {
      const validator = extractValidator(unwrapZodType(perFieldValidator.parent), perFieldValidator.key);
      if (validator) {
        if (Context.currentData && validator._def.typeName == "ZodArray" && !isNaN(parseInt(path[path.length - 1]))) {
          const validateArray = traversePath(Context.currentData, path.slice(0, -1));
          Context.value = validateArray?.value;
        }
        const result2 = await validator.safeParseAsync(Context.value);
        if (!result2.success) {
          const errors = result2.error.format();
          return Errors_update(errors._errors);
        } else {
          return Errors_update(void 0);
        }
      }
    }
    if (!Context.shouldUpdate) {
      Context.currentData = clone$1(Context.currentData ?? get_store_value(data));
      setPaths(Context.currentData, [path], Context.value);
    }
    const result = await validators.safeParseAsync(Context.currentData);
    if (!result.success) {
      const newErrors = Errors_fromZod(result.error);
      if (options.update === true || options.update == "errors") {
        const taintedFields = get_store_value(tainted);
        const currentErrors = Errors_get();
        let updated = false;
        traversePaths(newErrors, (pathData) => {
          if (!Array.isArray(pathData.value))
            return;
          if (isPathTainted(pathData.path, taintedFields)) {
            setPaths(currentErrors, [pathData.path], pathData.value);
            updated = true;
          }
          return "skip";
        });
        if (updated)
          Errors_set(currentErrors);
      }
      const current = traversePath(newErrors, path);
      return Errors_update(options.errors ?? current?.value);
    } else {
      Errors_clear(path);
      return void 0;
    }
  } else {
    const validator = traversePath(validators, Context.validationPath);
    if (!validator) {
      throw new SuperFormError("No Superforms validator found: " + path);
    } else if (validator.value === void 0) {
      return defaultValidate();
    } else {
      const result = validator.value(Context.value);
      return Errors_update(result ? options.errors ?? result : result);
    }
  }
}
function formEnhance(formEl, submitting, delayed, timeout, errs, Data_update, options, data, message, enableTaintedForm, formEvents, id, meta, constraints, tainted, lastChanges) {
  enableTaintedForm();
  const errors = errs;
  function validateChange(change) {
    validateField(change, options.validators, options.defaultValidator, data, errors, tainted);
  }
  function timingIssue(el) {
    return el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && el.type == "radio");
  }
  async function checkBlur(e) {
    if (options.validationMethod == "oninput" || options.validationMethod == "submit-only") {
      return;
    }
    if (timingIssue(e.target)) {
      await new Promise((r) => setTimeout(r, 0));
    }
    for (const change of get_store_value(lastChanges)) {
      validateChange(change);
    }
    lastChanges.set([]);
  }
  formEl.addEventListener("focusout", checkBlur);
  const ErrorTextEvents = /* @__PURE__ */ new Set();
  function ErrorTextEvents_selectText(e) {
    const target = e.target;
    if (options.selectErrorText)
      target.select();
  }
  function ErrorTextEvents_addErrorTextListeners(formEl2) {
    formEl2.querySelectorAll("input").forEach((el) => {
      el.addEventListener("invalid", ErrorTextEvents_selectText);
    });
  }
  function ErrorTextEvents_removeErrorTextListeners(formEl2) {
    formEl2.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents_selectText));
  }
  onDestroy(() => {
    ErrorTextEvents.forEach((formEl2) => ErrorTextEvents_removeErrorTextListeners(formEl2));
    ErrorTextEvents.clear();
    formEl.removeEventListener("focusout", checkBlur);
  });
  function Form(formEl2) {
    function rebind() {
      if (options.selectErrorText) {
        const form = Form_element();
        if (form && formEl2 !== form) {
          ErrorTextEvents_removeErrorTextListeners(form);
          ErrorTextEvents.delete(form);
        }
        if (!ErrorTextEvents.has(formEl2)) {
          ErrorTextEvents_addErrorTextListeners(formEl2);
          ErrorTextEvents.add(formEl2);
        }
      }
      Form2 = formEl2;
    }
    let Form2;
    function Form_element() {
      return Form2;
    }
    function Form_shouldAutoFocus(userAgent) {
      if (typeof options.autoFocusOnError === "boolean")
        return options.autoFocusOnError;
      else
        return !/iPhone|iPad|iPod|Android/i.test(userAgent);
    }
    const Form_scrollToFirstError = async () => {
      if (options.scrollToError == "off")
        return;
      const selector = options.errorSelector;
      if (!selector)
        return;
      await tick();
      let el;
      el = Form2.querySelector(selector);
      if (!el)
        return;
      el = el.querySelector(selector) ?? el;
      const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
      if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) {
        scrollToAndCenter(el, void 0, options.scrollToError);
      }
      if (!Form_shouldAutoFocus(navigator.userAgent))
        return;
      let focusEl;
      focusEl = el;
      if (!["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(focusEl.tagName)) {
        focusEl = focusEl.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea');
      }
      if (focusEl) {
        try {
          focusEl.focus({ preventScroll: true });
          if (options.selectErrorText && focusEl.tagName == "INPUT") {
            focusEl.select();
          }
        } catch (err) {
        }
      }
    };
    rebind();
    {
      let state = FetchStatus.Idle;
      let delayedTimeout, timeoutTimeout;
      const setState = (s) => {
        state = s;
        submitting.set(state >= FetchStatus.Submitting);
        delayed.set(state >= FetchStatus.Delayed);
        timeout.set(state >= FetchStatus.Timeout);
      };
      return {
        submitting: () => {
          rebind();
          setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
          if (delayedTimeout)
            clearTimeout(delayedTimeout);
          if (timeoutTimeout)
            clearTimeout(timeoutTimeout);
          delayedTimeout = window.setTimeout(() => {
            if (state == FetchStatus.Submitting)
              setState(FetchStatus.Delayed);
          }, options.delayMs);
          timeoutTimeout = window.setTimeout(() => {
            if (state == FetchStatus.Delayed)
              setState(FetchStatus.Timeout);
          }, options.timeoutMs);
        },
        completed: (cancelled) => {
          if (delayedTimeout)
            clearTimeout(delayedTimeout);
          if (timeoutTimeout)
            clearTimeout(timeoutTimeout);
          delayedTimeout = timeoutTimeout = 0;
          setState(FetchStatus.Idle);
          if (!cancelled)
            setTimeout(Form_scrollToFirstError);
        },
        scrollToFirstError: () => setTimeout(Form_scrollToFirstError),
        isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
      };
    }
  }
  const htmlForm = Form(formEl);
  let currentRequest;
  return enhance(formEl, async (submit) => {
    let cancelled = false;
    function cancel() {
      cancelled = true;
      return submit.cancel();
    }
    if (htmlForm.isSubmitting() && options.multipleSubmits == "prevent") {
      cancel();
    } else {
      if (htmlForm.isSubmitting() && options.multipleSubmits == "abort") {
        if (currentRequest)
          currentRequest.abort();
      }
      currentRequest = submit.controller;
      const data2 = { ...submit, cancel };
      for (const event of formEvents.onSubmit) {
        await event(data2);
      }
    }
    if (cancelled) {
      if (options.flashMessage)
        cancelFlash(options);
    } else {
      if (options.validators) {
        const checkData = get_store_value(data);
        let valid;
        let clientErrors = {};
        if ("safeParseAsync" in options.validators) {
          const validator = options.validators;
          const result = await validator.safeParseAsync(checkData);
          valid = result.success;
          if (!result.success) {
            clientErrors = mapErrors(result.error.format());
          }
        } else {
          valid = true;
          const validator = options.validators;
          const newErrors = [];
          await traversePathsAsync(checkData, async ({ value, path }) => {
            const validationPath = path.filter((p) => isNaN(parseInt(p)));
            const maybeValidator = traversePath(validator, validationPath);
            if (typeof maybeValidator?.value === "function") {
              const check = maybeValidator.value;
              if (Array.isArray(value)) {
                for (const key in value) {
                  const errors2 = await check(value[key]);
                  if (errors2) {
                    valid = false;
                    newErrors.push({
                      path: path.concat([key]),
                      errors: typeof errors2 === "string" ? [errors2] : errors2 ?? void 0
                    });
                  }
                }
              } else {
                const errors2 = await check(value);
                if (errors2) {
                  valid = false;
                  newErrors.push({
                    path,
                    errors: typeof errors2 === "string" ? [errors2] : errors2 ?? void 0
                  });
                }
              }
            }
          });
          for (const { path, errors: errors2 } of newErrors) {
            const errorPath = traversePath(clientErrors, path, ({ parent, key, value }) => {
              if (value === void 0)
                parent[key] = {};
              return parent[key];
            });
            if (errorPath) {
              const { parent, key } = errorPath;
              parent[key] = errors2;
            }
          }
        }
        if (!valid) {
          cancel();
          const validationResult = {
            valid,
            errors: clientErrors,
            data: checkData,
            empty: false,
            constraints: get_store_value(constraints),
            message: void 0,
            id: get_store_value(id),
            meta: get_store_value(meta)
          };
          const result = {
            type: "failure",
            status: (typeof options.SPA === "boolean" ? void 0 : options.SPA?.failStatus) ?? 400,
            data: { form: validationResult }
          };
          setTimeout(() => validationResponse({ result }), 0);
        }
      }
      if (!cancelled) {
        switch (options.clearOnSubmit) {
          case "errors-and-message":
            errors.clear();
            message.set(void 0);
            break;
          case "errors":
            errors.clear();
            break;
          case "message":
            message.set(void 0);
            break;
        }
        if (options.flashMessage && (options.clearOnSubmit == "errors-and-message" || options.clearOnSubmit == "message") && shouldSyncFlash(options)) {
          options.flashMessage.module.getFlash(page).set(void 0);
        }
        htmlForm.submitting();
        if (options.SPA) {
          cancel();
          const validationResult = {
            valid: true,
            errors: {},
            data: get_store_value(data),
            empty: false,
            constraints: get_store_value(constraints),
            message: void 0,
            id: get_store_value(id),
            meta: get_store_value(meta)
          };
          const result = {
            type: "success",
            status: 200,
            data: { form: validationResult }
          };
          setTimeout(() => validationResponse({ result }), 0);
        } else if (options.dataType === "json") {
          const postData = get_store_value(data);
          const chunks = chunkSubstr(stringify(postData), options.jsonChunkSize ?? 5e5);
          for (const chunk of chunks) {
            submit.data.append("__superform_json", chunk);
          }
          Object.keys(postData).forEach((key) => {
            if (typeof submit.data.get(key) === "string") {
              submit.data.delete(key);
            }
          });
        }
      }
    }
    function chunkSubstr(str, size) {
      const numChunks = Math.ceil(str.length / size);
      const chunks = new Array(numChunks);
      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substring(o, o + size);
      }
      return chunks;
    }
    async function validationResponse(event) {
      const result = event.result;
      currentRequest = null;
      let cancelled2 = false;
      const data2 = {
        result,
        formEl,
        cancel: () => cancelled2 = true
      };
      for (const event2 of formEvents.onResult) {
        await event2(data2);
      }
      if (!cancelled2) {
        if (result.type !== "error") {
          if (result.type === "success" && options.invalidateAll) {
            await invalidateAll();
          }
          if (options.applyAction) {
            await applyAction(result);
          } else {
            await Data_update(result);
          }
        } else {
          if (options.applyAction) {
            if (options.onError == "apply") {
              await applyAction(result);
            } else {
              await applyAction({
                type: "failure",
                status: Math.floor(result.status || 500)
              });
            }
          }
          if (options.onError !== "apply") {
            const data3 = { result, message };
            for (const event2 of formEvents.onError) {
              if (event2 !== "apply")
                await event2(data3);
            }
          }
        }
        if (options.flashMessage) {
          if (result.type == "error" && options.flashMessage.onError) {
            await options.flashMessage.onError({
              result,
              message: options.flashMessage.module.getFlash(page)
            });
          } else if (result.type != "error") {
            await options.flashMessage.module.updateFlash(page);
          }
        }
      } else {
        if (options.flashMessage)
          cancelFlash(options);
      }
      htmlForm.completed(cancelled2);
    }
    return validationResponse;
  });
}
export {
  superForm as s
};
