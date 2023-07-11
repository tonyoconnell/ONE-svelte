import * as server from '../entries/pages/(payment)/pricing/_page.server.ts.js';

export const index = 6;
export const component = async () => (await import('../entries/pages/(payment)/pricing/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(payment)/pricing/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.7fafa15d.js","_app/immutable/chunks/index.e5838562.js","_app/immutable/chunks/forms.256d3e1b.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.fa4d4adc.js","_app/immutable/chunks/Icon.95a544e9.js"];
export const stylesheets = [];
export const fonts = [];
