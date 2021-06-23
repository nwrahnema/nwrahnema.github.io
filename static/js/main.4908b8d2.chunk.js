(this["webpackJsonpnwrahnema.github.io"]=this["webpackJsonpnwrahnema.github.io"]||[]).push([[0],{20:function(e,n,t){},27:function(e,n,t){"use strict";t.r(n);var i=t(1),r=t.n(i),a=t(11),o=t.n(a),c=(t(20),t(14)),s=t(15),l=t(5),u=t.n(l),d=t(12);var p=t(3),m=function(e,n){return{id:e,options:function(){return Object(s.a)({id:e},n.apply(void 0,arguments))}}},f=function(e){var n=e.options,t=e.selected,r=e.spinSpeed,a=void 0===r?10:r,o=e.onOptionClick,c=e.optionClassName,s=Object(i.useCallback)((function(e,t){return 1e3*(n.length*((t-e)/-360))/a}),[n.length,a]),l=Object(i.useMemo)((function(){return m("spin",(function(){return{keyframes:{transform:["rotateX(".concat(0,"deg)"),"rotateX(".concat(-360,"deg)")]},animationOptions:{duration:s(0,-360),iterations:1/0}}}))}),[s]),f=Object(i.useMemo)((function(){return m("startSpin",(function(e){return{keyframes:{transform:["rotateX(".concat(e,"deg)"),"rotateX(".concat(-360,"deg)")]},animationOptions:{duration:s(e,-360),easing:"ease-in",iterations:1}}}))}),[s]),h=Object(i.useMemo)((function(){return m("stopSpin",(function(e,n){return{keyframes:{transform:["rotateX(".concat(e,"deg)"),"rotateX(".concat(n,"deg)")]},animationOptions:{duration:s(e,n),easing:"ease-out",fill:"forwards",iterations:1}}}))}),[s]),b=Object(i.useCallback)((function(e){var t=n.indexOf(e);if(t<0)throw new Error("Option '".concat(e,"' is not present in 'options' array."));return t/n.length*-360}),[n]),j=Object(d.a)({onFinish:function(e){var n=e.animate,t=e.animation,i=g();t.id===f.id&&(null===i||void 0===i?void 0:i.id)===f.id&&"finished"===(null===i||void 0===i?void 0:i.playState)&&n(l.options())}}),O=j.ref,v=j.animate,g=j.getAnimation,_=Object(i.useRef)(0);return Object(i.useEffect)((function(){var e=function(e){if(null!==e.current){var n=window.getComputedStyle(e.current,null),t=n.getPropertyValue("-webkit-transform")||n.getPropertyValue("-moz-transform")||n.getPropertyValue("-ms-transform")||n.getPropertyValue("-o-transform")||n.getPropertyValue("transform")||void 0;if(void 0===t||"none"===t)return 0;var i=t.split("(")[1].split(")")[0].split(","),r=0,a=0;switch(t.split("(")[0]){case"matrix":r=parseFloat(i[3]),a=0;break;case"matrix3d":r=parseFloat(i[5]),a=parseFloat(i[9]);break;default:throw new Error("Transform value ".concat(t," was not recognized."))}var o=Math.atan2(a,r);return o<0&&(o+=2*Math.PI),Math.round(o*(180/Math.PI))%360}}(O);if(void 0!==e)if(e*=-1,void 0!==t){var n=b(t)-360;n!==e&&n!==_.current&&(v(h.options(e,n)),_.current=n)}else{var i=g();(!i||i.id!==f.id&&i.id!==l.id)&&(v(f.options(e)),_.current=void 0)}}),[v,g,t,O,b,l.id,f,h]),Object(p.jsxs)("div",{className:u.a.container,style:{"--spin-speed":a,"--num-options":n.length},children:[Object(p.jsx)("div",{className:u.a.optionsList,ref:O,role:"listbox",children:n.map((function(e,n){return Object(p.jsx)("div",{style:{"--spin-index":n},className:"".concat(u.a.option," ").concat(c),onMouseDown:function(n){null===o||void 0===o||o(n,e)},role:"option","aria-selected":e===t?"true":"false",children:e},n)}))}),Object(p.jsx)("div",{className:u.a.placeholderList,children:n.map((function(e,n){return Object(p.jsx)("div",{"aria-hidden":"true",className:u.a.placeholder,children:e},n)}))})]})},h=t(4),b=t.n(h),j=t(7),O=t(13),v=t(10),g=["in progress","a test","silly","made in React","overengineered","a wheel"],_={website:"my website",github:"my GitHub",name:"my name",email:"my email",linkedin:"my LinkedIn"};var x=function(){var e=Object(i.useState)(void 0),n=Object(c.a)(e,2),t=n[0],r=n[1],a=Object(i.useRef)(),o=Object(i.useCallback)((function(e){a.current&&clearTimeout(a.current),r(e),a.current=setTimeout((function(){return r(void 0)}),3e3)}),[]),s=Object(i.useCallback)((function(){var e=g.filter((function(e){return e!==t}));return e[Math.floor(Math.random()*e.length)]}),[t]);return Object(i.useEffect)((function(){var e=setInterval((function(){void 0===t&&o(s())}),3e3);return function(){return clearInterval(e)}}),[t,o,s]),Object(p.jsxs)("div",{className:b.a.page,children:[Object(p.jsxs)("header",{className:b.a.header,children:[Object(p.jsx)("a",{className:b.a.title,href:"/",onMouseEnter:function(){return o(_.name)},children:"Nima Rahnema"}),Object(p.jsxs)("div",{className:b.a.socials,children:[Object(p.jsx)("a",{href:"mailto:nwrahnema@gmail.com",title:"Email",onMouseEnter:function(){return o(_.email)},children:Object(p.jsx)(j.a,{icon:O.a})}),Object(p.jsx)("a",{href:"https://github.com/nwrahnema",target:"_blank",rel:"noopener noreferrer",title:"GitHub",onMouseEnter:function(){return o(_.github)},children:Object(p.jsx)(j.a,{icon:v.a})}),Object(p.jsx)("a",{href:"https://linkedin.com/in/nima-rahnema",target:"_blank",rel:"noopener noreferrer",title:"LinkedIn",onMouseEnter:function(){return o(_.linkedin)},children:Object(p.jsx)(j.a,{icon:v.b})})]})]}),Object(p.jsx)("main",{className:b.a.main,children:Object(p.jsxs)("h1",{className:b.a.headline,children:[Object(p.jsx)("span",{children:"This is"}),Object(p.jsx)(f,{options:Object.values(_).concat(g),onOptionClick:function(){return o(s())},selected:t,optionClassName:b.a.spinnerOption})]})})]})};o.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(x,{})}),document.getElementById("root"))},4:function(e,n,t){e.exports={page:"App_page__1AVsN",header:"App_header__2L3DO",title:"App_title__2oBiX",socials:"App_socials__27QIQ",main:"App_main__uN9ca",headline:"App_headline__J_zpD",spinnerOption:"App_spinnerOption__2ZJ7U"}},5:function(e,n,t){e.exports={container:"SpinningSelector_container__1cYRY",optionsList:"SpinningSelector_optionsList__1_MAL",option:"SpinningSelector_option__3eD1O",placeholderList:"SpinningSelector_placeholderList__2tSrp",placeholder:"SpinningSelector_placeholder__ACwZG"}}},[[27,1,2]]]);
//# sourceMappingURL=main.4908b8d2.chunk.js.map