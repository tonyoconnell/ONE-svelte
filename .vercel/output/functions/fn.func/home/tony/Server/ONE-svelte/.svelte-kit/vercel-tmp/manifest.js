export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.704faa50.js","app":"_app/immutable/entry/app.612e3d1a.js","imports":["_app/immutable/entry/start.704faa50.js","_app/immutable/chunks/index.e5838562.js","_app/immutable/chunks/singletons.fa4d4adc.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/entry/app.612e3d1a.js","_app/immutable/chunks/index.e5838562.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/authenticated",
				pattern: /^\/authenticated\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(auth)/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(payment)/pricing",
				pattern: /^\/pricing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(auth)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(payment)/stripe/cancel",
				pattern: /^\/stripe\/cancel\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(payment)/stripe/success",
				pattern: /^\/stripe\/success\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(payment)/stripe/webhook",
				pattern: /^\/stripe\/webhook\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/(payment)/stripe/webhook/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
