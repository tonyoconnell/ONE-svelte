import * as server from '../entries/pages/authenticated/_page.server.ts.js';

export const index = 9;
export const component = async () => (await import('../entries/pages/authenticated/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/authenticated/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.91376fac.js","_app/immutable/chunks/index.e5838562.js"];
export const stylesheets = [];
export const fonts = [];
