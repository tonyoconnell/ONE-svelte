import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.486190c5.js","_app/immutable/chunks/index.0c8a5be0.js","_app/immutable/chunks/forms.9ce4998a.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.aed9d15b.js","_app/immutable/chunks/stores.5dc0faaa.js","_app/immutable/chunks/Icon.f0955e1a.js"];
export const stylesheets = ["_app/immutable/assets/0.5545e852.css"];
export const fonts = [];
