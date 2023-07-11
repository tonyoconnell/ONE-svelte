import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.e1f979dc.js","_app/immutable/chunks/index.e5838562.js","_app/immutable/chunks/forms.256d3e1b.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.fa4d4adc.js","_app/immutable/chunks/stores.332d1960.js","_app/immutable/chunks/Icon.95a544e9.js"];
export const stylesheets = ["_app/immutable/assets/0.aa9cd69e.css"];
export const fonts = [];
