import{S as U,i as B,s as q,a as W,L as h,g as z,h as E,D as d,Q as P,C as g,f as w,R as Q,T as X,e as j,c as F,b as G,o as T,U as p,t as H,d as J,k as K,V as D,W as V,X as k,y as v,z as y,A as R,E as L}from"../chunks/index.e5838562.js";const M="modulepreload",Y=function(a,e){return new URL(a,e).href},A={},m=function(e,n,i){if(!n||n.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(n.map(f=>{if(f=Y(f,i),f in A)return;A[f]=!0;const t=f.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(!!i)for(let l=r.length-1;l>=0;l--){const u=r[l];if(u.href===f&&(!t||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${f}"]${s}`))return;const o=document.createElement("link");if(o.rel=t?"stylesheet":M,t||(o.as="script",o.crossOrigin=""),o.href=f,document.head.appendChild(o),t)return new Promise((l,u)=>{o.addEventListener("load",l),o.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${f}`)))})})).then(()=>e())},ie={};function Z(a){let e,n,i;var r=a[1][0];function f(t){return{props:{data:t[3],form:t[2]}}}return r&&(e=k(r,f(a)),a[12](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&y(e.$$.fragment,t),n=h()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){const _={};if(s&8&&(_.data=t[3]),s&4&&(_.form=t[2]),s&2&&r!==(r=t[1][0])){if(e){D();const o=e;d(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=k(r,f(t)),t[12](e),v(e.$$.fragment),g(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else r&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&d(e.$$.fragment,t),i=!1},d(t){a[12](null),t&&w(n),e&&L(e,t)}}}function $(a){let e,n,i;var r=a[1][0];function f(t){return{props:{data:t[3],$$slots:{default:[x]},$$scope:{ctx:t}}}}return r&&(e=k(r,f(a)),a[11](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&y(e.$$.fragment,t),n=h()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){const _={};if(s&8&&(_.data=t[3]),s&8215&&(_.$$scope={dirty:s,ctx:t}),s&2&&r!==(r=t[1][0])){if(e){D();const o=e;d(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=k(r,f(t)),t[11](e),v(e.$$.fragment),g(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else r&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&d(e.$$.fragment,t),i=!1},d(t){a[11](null),t&&w(n),e&&L(e,t)}}}function x(a){let e,n,i;var r=a[1][1];function f(t){return{props:{data:t[4],form:t[2]}}}return r&&(e=k(r,f(a)),a[10](e)),{c(){e&&v(e.$$.fragment),n=h()},l(t){e&&y(e.$$.fragment,t),n=h()},m(t,s){e&&R(e,t,s),E(t,n,s),i=!0},p(t,s){const _={};if(s&16&&(_.data=t[4]),s&4&&(_.form=t[2]),s&2&&r!==(r=t[1][1])){if(e){D();const o=e;d(o.$$.fragment,1,0,()=>{L(o,1)}),P()}r?(e=k(r,f(t)),t[10](e),v(e.$$.fragment),g(e.$$.fragment,1),R(e,n.parentNode,n)):e=null}else r&&e.$set(_)},i(t){i||(e&&g(e.$$.fragment,t),i=!0)},o(t){e&&d(e.$$.fragment,t),i=!1},d(t){a[10](null),t&&w(n),e&&L(e,t)}}}function I(a){let e,n=a[6]&&O(a);return{c(){e=j("div"),n&&n.c(),this.h()},l(i){e=F(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=G(e);n&&n.l(r),r.forEach(w),this.h()},h(){T(e,"id","svelte-announcer"),T(e,"aria-live","assertive"),T(e,"aria-atomic","true"),p(e,"position","absolute"),p(e,"left","0"),p(e,"top","0"),p(e,"clip","rect(0 0 0 0)"),p(e,"clip-path","inset(50%)"),p(e,"overflow","hidden"),p(e,"white-space","nowrap"),p(e,"width","1px"),p(e,"height","1px")},m(i,r){E(i,e,r),n&&n.m(e,null)},p(i,r){i[6]?n?n.p(i,r):(n=O(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&w(e),n&&n.d()}}}function O(a){let e;return{c(){e=H(a[7])},l(n){e=J(n,a[7])},m(n,i){E(n,e,i)},p(n,i){i&128&&K(e,n[7])},d(n){n&&w(e)}}}function ee(a){let e,n,i,r,f;const t=[$,Z],s=[];function _(l,u){return l[1][1]?0:1}e=_(a),n=s[e]=t[e](a);let o=a[5]&&I(a);return{c(){n.c(),i=W(),o&&o.c(),r=h()},l(l){n.l(l),i=z(l),o&&o.l(l),r=h()},m(l,u){s[e].m(l,u),E(l,i,u),o&&o.m(l,u),E(l,r,u),f=!0},p(l,[u]){let b=e;e=_(l),e===b?s[e].p(l,u):(D(),d(s[b],1,1,()=>{s[b]=null}),P(),n=s[e],n?n.p(l,u):(n=s[e]=t[e](l),n.c()),g(n,1),n.m(i.parentNode,i)),l[5]?o?o.p(l,u):(o=I(l),o.c(),o.m(r.parentNode,r)):o&&(o.d(1),o=null)},i(l){f||(g(n),f=!0)},o(l){d(n),f=!1},d(l){s[e].d(l),l&&w(i),o&&o.d(l),l&&w(r)}}}function te(a,e,n){let{stores:i}=e,{page:r}=e,{constructors:f}=e,{components:t=[]}=e,{form:s}=e,{data_0:_=null}=e,{data_1:o=null}=e;Q(i.page.notify);let l=!1,u=!1,b=null;X(()=>{const c=i.page.subscribe(()=>{l&&(n(6,u=!0),n(7,b=document.title||"untitled page"))});return n(5,l=!0),c});function N(c){V[c?"unshift":"push"](()=>{t[1]=c,n(0,t)})}function S(c){V[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}function C(c){V[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}return a.$$set=c=>{"stores"in c&&n(8,i=c.stores),"page"in c&&n(9,r=c.page),"constructors"in c&&n(1,f=c.constructors),"components"in c&&n(0,t=c.components),"form"in c&&n(2,s=c.form),"data_0"in c&&n(3,_=c.data_0),"data_1"in c&&n(4,o=c.data_1)},a.$$.update=()=>{a.$$.dirty&768&&i.page.set(r)},[t,f,s,_,o,l,u,b,i,r,N,S,C]}class re extends U{constructor(e){super(),B(this,e,te,ee,q,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const se=[()=>m(()=>import("../nodes/0.e1f979dc.js"),["../nodes/0.e1f979dc.js","../chunks/index.e5838562.js","../chunks/forms.256d3e1b.js","../chunks/parse.7d180a0f.js","../chunks/singletons.fa4d4adc.js","../chunks/stores.332d1960.js","../chunks/Icon.95a544e9.js","../assets/0.aa9cd69e.css"],import.meta.url),()=>m(()=>import("../nodes/1.598afb12.js"),["../nodes/1.598afb12.js","../chunks/index.e5838562.js","../chunks/stores.332d1960.js","../chunks/singletons.fa4d4adc.js"],import.meta.url),()=>m(()=>import("../nodes/2.f612196e.js"),["../nodes/2.f612196e.js","../chunks/index.e5838562.js","../assets/2.1d121e74.css"],import.meta.url),()=>m(()=>import("../nodes/3.b50ca27c.js"),["../nodes/3.b50ca27c.js","../chunks/index.e5838562.js","../chunks/index.6ca8c04f.js","../chunks/forms.256d3e1b.js","../chunks/parse.7d180a0f.js","../chunks/singletons.fa4d4adc.js","../chunks/stores.332d1960.js"],import.meta.url),()=>m(()=>import("../chunks/4.4ed993c7.js"),[],import.meta.url),()=>m(()=>import("../nodes/5.310e6cdd.js"),["../nodes/5.310e6cdd.js","../chunks/index.e5838562.js","../chunks/index.6ca8c04f.js","../chunks/forms.256d3e1b.js","../chunks/parse.7d180a0f.js","../chunks/singletons.fa4d4adc.js","../chunks/stores.332d1960.js"],import.meta.url),()=>m(()=>import("../nodes/6.7fafa15d.js"),["../nodes/6.7fafa15d.js","../chunks/index.e5838562.js","../chunks/forms.256d3e1b.js","../chunks/parse.7d180a0f.js","../chunks/singletons.fa4d4adc.js","../chunks/Icon.95a544e9.js"],import.meta.url),()=>m(()=>import("../nodes/7.344e834a.js"),["../nodes/7.344e834a.js","../chunks/index.e5838562.js"],import.meta.url),()=>m(()=>import("../nodes/8.a78aa27b.js"),["../nodes/8.a78aa27b.js","../chunks/index.e5838562.js"],import.meta.url),()=>m(()=>import("../nodes/9.91376fac.js"),["../nodes/9.91376fac.js","../chunks/index.e5838562.js"],import.meta.url)],oe=[0],ae={"/":[2],"/authenticated":[-10],"/(auth)/login":[-4],"/(auth)/logout":[4],"/(payment)/pricing":[6],"/(auth)/register":[-6],"/(payment)/stripe/cancel":[7],"/(payment)/stripe/success":[8]},le={handleError:({error:a})=>{console.error(a)}};export{ae as dictionary,le as hooks,ie as matchers,se as nodes,re as root,oe as server_loads};
