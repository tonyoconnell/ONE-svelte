import { e as error, j as json } from "../../../../../chunks/index.js";
import { s as stripe, S as STRIPE_WEBHOOK_SECRET } from "../../../../../chunks/stripe.js";
async function POST({ request }) {
  let eventType = null;
  {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature") ?? "";
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
      eventType = event.type;
    } catch (e) {
      throw error(500, { message: "Something went wrong" });
    }
  }
  switch (eventType) {
    case "checkout.session.completed":
      console.log("Checkout completed");
      break;
    case "invoice.paid":
      console.log("Another payment");
      break;
    case "invoice.payment_failed":
      console.log("Checkout failed");
      break;
    default:
      throw Error("Something went wrong");
  }
  return json({ message: "success" }, { status: 200 });
}
export {
  POST
};
