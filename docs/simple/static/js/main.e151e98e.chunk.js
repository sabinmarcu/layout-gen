(this["webpackJsonp@la/app-simple"]=this["webpackJsonp@la/app-simple"]||[]).push([[0],{18:function(e,t,n){"use strict";n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return m})),n.d(t,"c",(function(){return v}));var r=n(9),a=n(0),o=n.n(a),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=Object(a.createContext)(e),n=function(n){var c=n.children,u=Object(a.useState)(e),l=Object(r.a)(u,2),i=l[0],f=l[1];return o.a.createElement(t.Provider,{value:{ref:i,setRef:f}},c)},c=function(){return Object(a.useContext)(t)};return{Provider:n,Context:t,usePortal:c}},u=function(e){return function(t){var n=t.Component,r=void 0===n?"div":n,o=Object(a.useRef)(),c=e().setRef;return Object(a.useEffect)((function(){return c(o.current)}),[o,c]),Object(a.createElement)(r,{ref:o})}},l=n(19),i=function(e){return function(t){var n=t.children,r=e().ref;return r?Object(l.createPortal)(n,r):null}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=c(e),n=t.Provider,r=t.Context,a=t.usePortal,o=i(a),l=u(a);return{Provider:n,Context:r,Portal:o,Slot:l}},s=f(),d=s.Provider,m=s.Portal,v=(s.Context,s.Slot)},49:function(e,t,n){e.exports=n(65)},60:function(e,t,n){var r={"./404.js":61,"./edit.js":62,"./list.js":63};function a(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id=60},61:function(e,t,n){"use strict";n.r(t),n.d(t,"FourOhFourScreen",(function(){return c}));var r=n(0),a=n.n(r),o=n(18),c=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(o.a,null,"Error: Not Found!"),a.a.createElement("h1",null,"404"))};t.default=c},62:function(e,t,n){"use strict";n.r(t),n.d(t,"route",(function(){return c})),n.d(t,"EditScreen",(function(){return u}));var r=n(0),a=n.n(r),o=n(18),c="/edit",u=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(o.a,null,"Edit Screen"),a.a.createElement("h1",null,"Edit"))};t.default=u},63:function(e,t,n){"use strict";n.r(t),n.d(t,"route",(function(){return c})),n.d(t,"ListScreen",(function(){return u}));var r=n(0),a=n.n(r),o=n(18),c="/",u=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(o.a,null,"Layouts List"),a.a.createElement("h1",null,"List"))};t.default=u},64:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(19),c=n.n(o),u=(n(54),n(9)),l=n(4),i=function(){var e=Object(l.f)(),t=Object(l.g)(),n=Object(r.useState)(!1),a=Object(u.a)(n,2),o=a[0],c=a[1],i=Object(r.useMemo)((function(){if(t){var e=t.search.substr(1).split("&").map((function(e){return e.split("=")})).find((function(e){return"r"===Object(u.a)(e,1)[0]}));return e?e[1]:null}}),[t.search]);Object(r.useEffect)((function(){e&&i&&!o&&(c(!0),e.replace(i))}),[e,i,o,c])},f=function(){return i(),null},s=n(11),d=function(e){var t=e.children;return e.contexts.reverse().reduce((function(e,t){var n=[t,{}].flat(),a=Object(u.a)(n,2),o=a[0],c=a[1];return Object(r.createElement)(o,Object(s.a)({children:e},c))}),t)},m=n(35),v=n(45),p=n(46),b=!1,h="app",O=function(){var e;return b&&(e=console).groupCollapsed.apply(e,arguments)},j=function(){var e;return b&&(e=console).groupEnd.apply(e,arguments)},g=function(){var e;return b&&(e=console).log.apply(e,arguments)},E=function(e,t){O("".concat(e," %c").concat(t),"color: grey; font-size: 0.9em");for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];r.forEach((function(e){Array.isArray(e)?g.apply(void 0,Object(p.a)(e)):g(e)})),j()},y=function(e){return new RegExp(["^",h,":",e].join(""))},k=function(e,t){return[h,[t,e].join("")].join(":")},S=function(e,t){return e.match(y(t))},w=function(e,t,n){E(e,t,["Key: %c".concat(t),"color: blue; text-decoration: underline"],["LocalStorage Key: %c".concat([h,t].join(":")),"color: blue; text-decoration: underline"],["Value:",n])},x=function(e,t){var n=Object(r.useState)(!1),a=Object(u.a)(n,2),o=a[0],c=a[1],l=Object(r.useState)(void 0),i=Object(u.a)(l,2),f=i[0],s=i[1];return Object(r.useEffect)((function(){if(!o){c(!0);var n=localStorage.getItem(k(e));if(n)try{w("\u2699 LocalStorage Get",e,n),s(JSON.parse(n))}catch(r){w("\u274c Could not parse LS data",e,n),s(t)}else s(t)}}),[o,e,t]),Object(r.useEffect)((function(){if(o){var t=!0;try{var n=localStorage.getItem(k(e));n&&JSON.parse(n)===f&&(t=!1)}finally{t&&(null===f?(w("\u2699 LocalStorage Remove",e,f),localStorage.removeItem(k(e))):(w("\u2699 LocalStorage Set",e,f),localStorage.setItem(k(e),JSON.stringify(f))))}}}),[e,f]),Object(r.useEffect)((function(){var t=function(t){var n=t.storageArea,r=t.key,a=t.oldValue,o=t.newValue,c=S(r),u=n===localStorage,l=r===k(e);if(u&&c&&l)try{var i=[JSON.parse(a),JSON.parse(o)],f=i[1];E("\u2699 LocalStorage Event",e,["Old Value: %c".concat(i[0]),"color: red; text-decoration: underline"],["New Value: %c".concat(f),"color: green; text-decoration: underline"]),s(f)}catch(d){w("\u274c Could not parse LS data from Event",e,o)}};return window.addEventListener("storage",t),function(){return window.removeEventListener("storage",t)}}),[s,e]),[f,s]},C=(n(27),n(83)),L=Object(r.createContext)("light"),N=n(85),P=function(e){var t=e.children,n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.light,n=void 0===t?{}:t,a=e.dark,o=void 0===a?{}:a,c=Object(C.a)("(prefers-color-scheme: dark)"),l=Object(r.useMemo)((function(){return c?"dark":"light"}),[c,"dark","light"]),i=x("theme",l),f=Object(u.a)(i,2),d=f[0],m=f[1],p=Object(r.useCallback)((function(e){return["dark","light"].includes(e)&&m(e)}),[m]),b=Object(r.useCallback)((function(){return m((function(e){return"dark"===e?"light":"dark"}))}),[m]),h=Object(r.useMemo)((function(){var e,t;return Object(v.a)("dark"===d?Object(s.a)(Object(s.a)({},o),{},{palette:Object(s.a)(Object(s.a)({},null!==(e=null===o||void 0===o?void 0:o.palette)&&void 0!==e?e:{}),{},{type:"dark"})}):Object(s.a)(Object(s.a)({},n),{},{palette:Object(s.a)(Object(s.a)({},null!==(t=null===n||void 0===n?void 0:n.palette)&&void 0!==t?t:{}),{},{type:"light"})}))}),[d]);return{theme:h,themeName:d,changeTheme:p,toggleTheme:b}}();return a.a.createElement(L.Provider,{value:n},a.a.createElement(N.a,{theme:n.theme},t))},F=n(93),J=n(86),I=n(87),M=n(6),R=Object(M.a)((function(e){return{root:{transition:e.transitions.create(),background:"dark"===e.palette.type?e.palette.augmentColor({main:e.palette.background.default}).light:e.palette.primary.dark}}}))(F.a),T=Object(M.a)({root:{display:"flex",justifyContent:"space-between"}})(J.a),V=function(e){var t=e.children;return a.a.createElement(R,{position:"static"},a.a.createElement(I.a,null,a.a.createElement(T,null,t)))},A=n(88),B=Object(A.a)((function(e){return{root:{background:e.palette.background.default,transition:e.transitions.create(),width:"100vw",height:"100vh",overflowX:"none",overflowY:"auto",color:e.palette.text.primary}}})),D=function(e){var t=e.children,n=B();return a.a.createElement("section",{className:n.root},t)},K=n(91),U=n(92),W=n(89),$=n(90),_=Object(M.a)((function(e){return{root:{color:e.palette.primary.contrastText}}}))(U.a),z=function(){var e=Object(r.useContext)(L),t=e.themeName,n=e.toggleTheme;return a.a.createElement("div",null,a.a.createElement(_,{onClick:n},"dark"===t?a.a.createElement(W.a,null):a.a.createElement($.a,null)))},G=n(18),X=n(60),Y=X.keys().reduce((function(e,t){var n=X(t),r=n.default,a=n.route;return[e,{id:t.match(/\/([^.]+)\.js$/)[1],Component:r,route:a}].flat()}),[]);var q=function(){return a.a.createElement(d,{contexts:[[m.a,{basename:"/layout-gen/simple"}],P,G.b]},a.a.createElement(f,null),a.a.createElement(D,null,a.a.createElement(V,null,a.a.createElement(K.a,{variant:"h4"},a.a.createElement(G.c,null)),a.a.createElement(z,null)),a.a.createElement(l.c,null,Y.filter((function(e){return!!e.route})).map((function(e){var t=e.id,n=e.Component,r=e.route;return a.a.createElement(l.a,{exact:!0,path:r,component:n,key:t})})),Y.filter((function(e){return!e.route})).map((function(e){var t=e.id,n=e.Component;return a.a.createElement(l.a,{path:"/",component:n,key:t})})))))};n(64),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.e151e98e.chunk.js.map