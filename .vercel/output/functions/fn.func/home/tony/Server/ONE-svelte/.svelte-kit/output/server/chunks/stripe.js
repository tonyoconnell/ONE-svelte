import Stripe from "stripe";
const SECRET_STRIPE_KEY = "ei9HSOPvKSLfk9IFthGStdZnLUwPaOMp";
const STRIPE_WEBHOOK_SECRET = "we_0NSTzeqs14Mpveu1xVd89zbE";
const stripe = new Stripe(SECRET_STRIPE_KEY, {
  apiVersion: "2022-11-15"
});
export {
  STRIPE_WEBHOOK_SECRET as S,
  stripe as s
};
