

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.85f75054.js","_app/immutable/chunks/index.0c8a5be0.js"];
export const stylesheets = ["_app/immutable/assets/2.1d121e74.css"];
export const fonts = [];
