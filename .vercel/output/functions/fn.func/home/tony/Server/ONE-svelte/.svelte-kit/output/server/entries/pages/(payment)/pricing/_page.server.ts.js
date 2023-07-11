import { f as fail, r as redirect } from "../../../../chunks/index.js";
import { s as stripe } from "../../../../chunks/stripe.js";
const actions = {
  async checkout({ request, url }) {
    const data = await request.formData();
    const priceId = String(data.get("priceId"));
    if (!priceId || typeof priceId !== "string") {
      return fail(400, { error: "`priceId` is required" });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${url.origin}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url.origin}/stripe/cancel`
    });
    throw redirect(303, session.url ?? "/");
  }
};
export {
  actions
};
