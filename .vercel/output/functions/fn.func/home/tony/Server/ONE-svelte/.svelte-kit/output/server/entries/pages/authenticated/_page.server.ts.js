import { r as redirect } from "../../../chunks/index.js";
async function load({ locals }) {
  const { user } = await locals.auth.validateUser();
  if (!user)
    throw redirect(302, "/login");
  return { user };
}
export {
  load
};
