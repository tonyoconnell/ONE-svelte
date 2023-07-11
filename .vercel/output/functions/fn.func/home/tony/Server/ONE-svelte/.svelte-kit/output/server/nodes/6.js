import * as server from '../entries/pages/(payment)/pricing/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(payment)/pricing/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(payment)/pricing/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.62f8be50.js","_app/immutable/chunks/index.0c8a5be0.js","_app/immutable/chunks/forms.3ee8d24e.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.41c929d1.js","_app/immutable/chunks/Icon.f0955e1a.js"];
export const stylesheets = [];
export const fonts = [];
