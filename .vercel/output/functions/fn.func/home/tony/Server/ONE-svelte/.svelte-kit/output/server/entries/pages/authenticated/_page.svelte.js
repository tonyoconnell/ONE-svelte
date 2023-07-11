import { c as create_ssr_component, e as escape } from "../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="p-4"><h1>Profile</h1>
	<p class="mt-4 capitalize">Welcome, ${escape(data.user.username)}!</p></div>`;
});
export {
  Page as default
};
