import { c as create_ssr_component, d as subscribe, f as spread, h as escape_attribute_value, i as escape_object, a as add_attribute, e as escape } from "../../../../chunks/index3.js";
import { s as superForm } from "../../../../chunks/index4.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $errors, $$unsubscribe_errors;
  let $constraints, $$unsubscribe_constraints;
  let $form, $$unsubscribe_form;
  let { data } = $$props;
  const { form, errors, constraints, enhance } = superForm(data.form);
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_constraints = subscribe(constraints, (value) => $constraints = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_errors();
  $$unsubscribe_constraints();
  $$unsubscribe_form();
  return `<div class="card m-auto mt-16 max-w-md p-8"><h1>Register</h1>

	<form method="POST" class="mt-8 space-y-8"><label class="label" for="username"><span class="block">Username</span>
			<input${spread(
    [
      { class: "input" },
      { type: "text" },
      { name: "username" },
      { id: "username" },
      {
        "data-invalid": escape_attribute_value($errors.username)
      },
      escape_object($constraints.username)
    ],
    {
      classes: $errors.username ? "input-error" : ""
    }
  )}${add_attribute("value", $form.username, 0)}></label>
		${$errors.username ? `<span class="text-red-400">${escape($errors.username)}</span>` : ``}

		<label class="label" for="password"><span class="block">Password</span>
			<input${spread(
    [
      { class: "input" },
      { type: "password" },
      { name: "password" },
      { id: "password" },
      {
        "data-invalid": escape_attribute_value($errors.password)
      },
      escape_object($constraints.password)
    ],
    {
      classes: $errors.password ? "input-error" : ""
    }
  )}${add_attribute("value", $form.password, 0)}></label>
		${$errors.password ? `<span class="text-red-400">${escape($errors.password)}</span>` : ``}

		<button class="btn variant-filled" type="submit">Register</button></form></div>`;
});
export {
  Page as default
};
