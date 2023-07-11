import { f as fail } from "../../../../chunks/index.js";
import { a as auth } from "../../../../chunks/auth.js";
const actions = {
  async default({ locals }) {
    const { session } = await locals.auth.validateUser();
    if (!session)
      return fail(401);
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
  }
};
export {
  actions
};
