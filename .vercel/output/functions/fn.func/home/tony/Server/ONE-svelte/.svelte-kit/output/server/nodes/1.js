

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.3fdac5cc.js","_app/immutable/chunks/index.0c8a5be0.js","_app/immutable/chunks/stores.21eb68ed.js","_app/immutable/chunks/singletons.70ac0210.js"];
export const stylesheets = [];
export const fonts = [];
