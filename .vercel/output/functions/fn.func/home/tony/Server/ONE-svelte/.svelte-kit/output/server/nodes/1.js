

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.2ba4218f.js","_app/immutable/chunks/index.0c8a5be0.js","_app/immutable/chunks/stores.5dc0faaa.js","_app/immutable/chunks/singletons.aed9d15b.js"];
export const stylesheets = [];
export const fonts = [];
