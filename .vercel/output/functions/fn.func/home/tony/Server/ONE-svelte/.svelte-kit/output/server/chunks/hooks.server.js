import { a as auth } from "./auth.js";
async function handle({ event, resolve }) {
  event.locals.auth = auth.handleRequest(event);
  return await resolve(event);
}
export {
  handle
};
