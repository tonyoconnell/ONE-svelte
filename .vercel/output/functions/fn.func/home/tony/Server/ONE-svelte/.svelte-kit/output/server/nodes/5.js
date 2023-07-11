import * as server from '../entries/pages/(auth)/register/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(auth)/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(auth)/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.0868bf5c.js","_app/immutable/chunks/index.0c8a5be0.js","_app/immutable/chunks/index.f8cfc0e2.js","_app/immutable/chunks/forms.3ee8d24e.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.41c929d1.js","_app/immutable/chunks/stores.868e44f5.js"];
export const stylesheets = [];
export const fonts = [];
