

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7b423177.js","_app/immutable/chunks/index.0c8a5be0.js","_app/immutable/chunks/stores.868e44f5.js","_app/immutable/chunks/singletons.41c929d1.js"];
export const stylesheets = [];
export const fonts = [];
