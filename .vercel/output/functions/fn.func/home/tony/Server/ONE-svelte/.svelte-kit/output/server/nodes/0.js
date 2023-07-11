import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.df0d7418.js","_app/immutable/chunks/index.0c8a5be0.js","_app/immutable/chunks/forms.afd9f5f8.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.70ac0210.js","_app/immutable/chunks/stores.21eb68ed.js","_app/immutable/chunks/Icon.f0955e1a.js"];
export const stylesheets = ["_app/immutable/assets/0.5545e852.css"];
export const fonts = [];
