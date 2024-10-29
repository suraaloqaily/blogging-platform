(()=>{var e={};e.id=820,e.ids=[820,660,888],e.modules={1535:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return c}});let n=r(167),o=r(997),i=n._(r(6689)),s=n._(r(6484)),a={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function l(e){let{res:t,err:r}=e;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}let u={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class c extends i.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||a[e]||"An unexpected error has occurred";return(0,o.jsxs)("div",{style:u.error,children:[(0,o.jsx)(s.default,{children:(0,o.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,o.jsxs)("div",{style:u.desc,children:[(0,o.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,o.jsx)("h1",{className:"next-error-h1",style:u.h1,children:e}):null,(0,o.jsx)("div",{style:u.wrap,children:(0,o.jsxs)("h2",{style:u.h2,children:[this.props.title||e?r:(0,o.jsx)(o.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}c.displayName="ErrorPage",c.getInitialProps=l,c.origGetInitialProps=l,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8576:(e,t)=>{"use strict";function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},6484:(e,t,r)=>{"use strict";function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return y},defaultHead:function(){return p}});let o=r(167),i=r(8760),s=r(997),a=i._(r(6689)),l=o._(r(5037)),u=r(9646),c=r(713),d=r(8576);function p(e){void 0===e&&(e=!1);let t=[(0,s.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,s.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(1405);let h=["name","httpEquiv","charSet","itemProp"];function g(e,t){let{inAmpMode:r}=t;return e.reduce(f,[]).reverse().concat(p(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return o=>{let i=!0,s=!1;if(o.key&&"number"!=typeof o.key&&o.key.indexOf("$")>0){s=!0;let t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?i=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?i=!1:t.add(o.type);break;case"meta":for(let e=0,t=h.length;e<t;e++){let t=h[e];if(o.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?i=!1:r.add(t);else{let e=o.props[t],r=n[t]||new Set;("name"!==t||!s)&&r.has(e)?i=!1:(r.add(e),n[t]=r)}}}}return i}}()).reverse().map((e,t)=>{let o=e.key||t;if(process.env.__NEXT_OPTIMIZE_FONTS&&!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach(function(t){var n,o;n=t,o=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(n))in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({},e.props||{});return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,a.default.cloneElement(e,t)}return a.default.cloneElement(e,{key:o})})}let y=function(e){let{children:t}=e,r=(0,a.useContext)(u.AmpStateContext),n=(0,a.useContext)(c.HeadManagerContext);return(0,s.jsx)(l.default,{reduceComponentsToState:g,headManager:n,inAmpMode:(0,d.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5037:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let n=r(6689),o=()=>{},i=()=>{};function s(e){var t;let{headManager:r,reduceComponentsToState:s}=e;function a(){if(r&&r.mountedInstances){let t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(s(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),a(),o(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),o(()=>(r&&(r._pendingUpdate=a),()=>{r&&(r._pendingUpdate=a)})),i(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},1405:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},4410:(e,t,r)=>{"use strict";r.d(t,{H:()=>l,a:()=>u});var n=r(6689),o=r(1163),i=r(3053),s=r(997);let a=(0,n.createContext)(),l=({children:e})=>{let{0:t,1:r}=(0,n.useState)(null),{0:l,1:u}=(0,n.useState)(!0),c=(0,o.useRouter)(),d=async()=>{try{let e=(0,i.parseCookies)();if(!e.token){r(null),u(!1);return}let t=await fetch("http://localhost:5000/auth/session",{headers:{Authorization:`Bearer ${e.token}`},credentials:"include"});if(t.ok){let e=await t.json();r(e.user)}else(0,i.destroyCookie)(null,"token"),r(null)}catch(e){console.error("Check user error:",e),(0,i.destroyCookie)(null,"token"),r(null)}finally{u(!1)}};(0,n.useEffect)(()=>{d()},[]);let p=async e=>{try{let t=await fetch("http://localhost:5000/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)}),n=await t.json();if(t.ok&&n.token)return(0,i.setCookie)(null,"token",n.token,{maxAge:2592e3,path:"/",secure:!0,sameSite:"lax"}),r(n.user),c.push("/homepage"),{success:!0};return{success:!1,message:n.message}}catch(e){return console.error("Login error:",e),{success:!1,message:"Login failed"}}},f=async()=>{try{await fetch("http://localhost:5000/auth/logout",{method:"POST",credentials:"include"})}catch(e){console.error("Logout error:",e)}finally{(0,i.destroyCookie)(null,"token"),r(null),c.push("/login")}},h=async e=>{try{let t=(0,i.parseCookies)(),n=await fetch("http://localhost:5000/user/update",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.token}`},credentials:"include",body:JSON.stringify(e)}),o=await n.json();if(n.ok)return r(o.user),o.token&&(0,i.setCookie)(null,"token",o.token,{maxAge:2592e3,path:"/",secure:!0,sameSite:"strict"}),{success:!0,message:"Profile updated successfully"};return{success:!1,message:o.message||"Update failed"}}catch(e){return console.error("Profile update error:",e),{success:!1,message:"An error occurred while updating profile"}}};return(0,s.jsx)(a.Provider,{value:{user:t,login:p,logout:f,loading:l,updateUser:h},children:e})},u=()=>(0,n.useContext)(a)},4008:(e,t,r)=>{"use strict";r.d(t,{L:()=>c,U:()=>d});var n=r(6689),o=r(1163),i=r(4410),s=r(997);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach(function(t){var n,o;n=t,o=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(n))in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}let u=(0,n.createContext)(),c=({children:e})=>{let{0:t,1:r}=(0,n.useState)([]),a=(0,o.useRouter)(),{user:c}=(0,i.a)(),d=async()=>{try{let e=await fetch("http://localhost:5000/blogs",{credentials:"include"});if(e.ok){let t=await e.json();r(t)}else r([])}catch(e){console.error("Fetch blogs error:",e)}};(0,n.useEffect)(()=>{!(a.pathname.includes("/login")||a.pathname.includes("/register"))&&c&&d()},[c,a.pathname]);let p=async e=>{try{let n=await fetch("http://localhost:5000/blogs",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)});if(n.ok){let e=await n.json();return r([...t,e]),{success:!0}}}catch(e){return console.error("Create blog error:",e),{success:!1}}},f=async(e,n)=>{try{let o=await fetch(`http://localhost:5000/blogs/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(n)});if(o.ok){let n=await o.json();return r(t.map(t=>t.id===e?n:t)),{success:!0}}}catch(e){return console.error("Update blog error:",e),{success:!1}}},h=async e=>{try{if((await fetch(`http://localhost:5000/blogs/${e}`,{method:"DELETE",credentials:"include"})).ok)return r(t=>t.filter(t=>t.id!==e)),{success:!0}}catch(e){return console.error("Delete blog error:",e),{success:!1}}};return(0,s.jsx)(u.Provider,{value:{blogs:t,createBlog:p,updateBlog:f,deleteBlog:h,updateBlogLikes:(e,t,n)=>{r(r=>Array.isArray(r)?r.map(r=>r.id===e?l(l({},r),{},{likeCount:t,isLiked:n}):r):(console.error("prevBlogs is not an array:",r),[]))},updateBlogComments:(e,t)=>{r(r=>r.map(r=>r.id===e?l(l({},r),{},{comments:t}):r))}},children:e})},d=()=>(0,n.useContext)(u)},5118:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var n=r(4410),o=r(4008),i=r(1163),s=r(3053),a=r(6689);r(108);var l=r(997);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){var n,o;n=t,o=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(n))in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function d({Component:e,pageProps:t}){let r=(0,i.useRouter)(),u=["/login","/register"].includes(r.pathname);return(0,a.useEffect)(()=>{let e=!!(0,s.parseCookies)().token;if(console.log(e,"isAuthenticated"),console.log(u,"isAuthRoute"),console.log(r.pathname,"router.pathname"),e&&u){r.push("/homepage");return}if(!e&&!u&&"/"!==r.pathname){r.push("/login");return}},[r.pathname,u,r]),(0,l.jsx)(n.H,{children:u?(0,l.jsx)(e,c({},t)):(0,l.jsx)(o.L,{children:(0,l.jsx)(e,c({},t))})})}d.getInitialProps=async({Component:e,ctx:t})=>{let r={},n=!!(0,s.parseCookies)(t).token;return e.getInitialProps&&(r=await e.getInitialProps(t)),{pageProps:r,isAuthenticated:n}}},5571:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var n=r(6859),o=r(997);function i(){return(0,o.jsxs)(n.Html,{lang:"en",children:[(0,o.jsx)(n.Head,{}),(0,o.jsxs)("body",{className:"antialiased",children:[(0,o.jsx)(n.Main,{}),(0,o.jsx)(n.NextScript,{})]})]})}},1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},8826:(e,t,r)=>{"use strict";r.r(t),r.d(t,{config:()=>f,default:()=>u,getServerSideProps:()=>p,getStaticPaths:()=>d,getStaticProps:()=>c,reportWebVitals:()=>h,routeModule:()=>j,unstable_getServerProps:()=>m,unstable_getServerSideProps:()=>P,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>y,unstable_getStaticProps:()=>g});var n=r(5872),o=r(3593),i=r(1323),s=r(5571),a=r(5118),l=r(1535);let u=(0,i.l)(l,"default"),c=(0,i.l)(l,"getStaticProps"),d=(0,i.l)(l,"getStaticPaths"),p=(0,i.l)(l,"getServerSideProps"),f=(0,i.l)(l,"config"),h=(0,i.l)(l,"reportWebVitals"),g=(0,i.l)(l,"unstable_getStaticProps"),y=(0,i.l)(l,"unstable_getStaticPaths"),b=(0,i.l)(l,"unstable_getStaticParams"),m=(0,i.l)(l,"unstable_getServerProps"),P=(0,i.l)(l,"unstable_getServerSideProps"),j=new n.PagesRouteModule({definition:{kind:o.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:a.default,Document:s.default},userland:l})},108:()=>{},3593:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE"}(r||(r={}))},9646:(e,t,r)=>{"use strict";e.exports=r(5872).vendored.contexts.AmpContext},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},3053:e=>{"use strict";e.exports=require("nookies")},6689:e=>{"use strict";e.exports=require("react")},6405:e=>{"use strict";e.exports=require("react-dom")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},2048:e=>{"use strict";e.exports=require("fs")},5315:e=>{"use strict";e.exports=require("path")},6162:e=>{"use strict";e.exports=require("stream")},1568:e=>{"use strict";e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[202,163,859],()=>r(8826));module.exports=n})();