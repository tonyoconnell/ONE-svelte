import * as server from '../entries/pages/(auth)/login/_page.server.ts.js';

export const index = 3;
export const component = async () => (await import('../entries/pages/(auth)/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(auth)/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.b50ca27c.js","_app/immutable/chunks/index.e5838562.js","_app/immutable/chunks/index.6ca8c04f.js","_app/immutable/chunks/forms.256d3e1b.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/chunks/singletons.fa4d4adc.js","_app/immutable/chunks/stores.332d1960.js"];
export const stylesheets = [];
export const fonts = [];
