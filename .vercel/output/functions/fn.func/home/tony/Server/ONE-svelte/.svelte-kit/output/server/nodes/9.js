import * as server from '../entries/pages/authenticated/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/authenticated/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/authenticated/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.837a09cd.js","_app/immutable/chunks/index.0c8a5be0.js"];
export const stylesheets = [];
export const fonts = [];
