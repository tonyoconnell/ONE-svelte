import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index3.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Check_circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M22 11.08V12a10 10 0 1 1-5.93-9.14"
      }
    ],
    ["polyline", { "points": "22 4 12 14.01 9 11.01" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check-circle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const CheckCircle = Check_circle;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="card m-auto mt-16 max-w-sm p-8"><h2>Enterprise</h2>
	<p class="description mt-8 text-gray-400">A plan that scales with you.</p>

	<div class="mt-8"><span class="mr-2 text-5xl font-extrabold">$10</span>
		<span class="text-gray-400">/month</span></div>

	<ol class="mt-8 space-y-4"><li class="flex gap-4">${validate_component(CheckCircle, "CheckCircle").$$render($$result, {}, {}, {})}
			<span>Individual configuration</span></li>
		<li class="flex gap-4">${validate_component(CheckCircle, "CheckCircle").$$render($$result, {}, {}, {})}
			<span>No hidden fees</span></li>
		<li class="flex gap-4">${validate_component(CheckCircle, "CheckCircle").$$render($$result, {}, {}, {})}
			<span>Free updates</span></li>
		<li class="flex gap-4">${validate_component(CheckCircle, "CheckCircle").$$render($$result, {}, {}, {})}
			<span>Email support</span></li></ol>

	<form method="POST" action="?/checkout"><input type="hidden" name="priceId" value="price_1MmhOkELPOBIZNpzNzbcEB2r">
		<button class="btn variant-filled-primary mt-16 w-full">Checkout</button></form></section>`;
});
export {
  Page as default
};
