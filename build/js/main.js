"use strict";function ownKeys(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var prizesLeftArrow=document.querySelector(".controls-left"),prizesRightArrow=document.querySelector(".controls-right"),slider1=slider("task-slider",".task__slider-item",prizesLeftArrow,prizesRightArrow,!0);function slider(e,t,s,c,l,r){var a,u=document.getElementById(e),n=(u.classList.add("slider"),""),v=0,i=u.querySelectorAll(t);function m(){var e=window.innerWidth,e=e>(f.config.media&&f.config.media.lg)?"lg":e>(f.config.media&&f.config.media.md)?"md":e>(f.config.media&&f.config.media.sm)?"sm":"xs";n!==e&&(n=e,f.buildSlider())}function o(){return f.config.elemsPerPage[n]}function p(){m()}var f={activeIndex:0,activeIndIndex:0<v?v:0,toggleIndex:0,init:function(){m();var t=0,r=!1,n=u.querySelector(".slider-inner"),i=u.querySelectorAll(".slider-indicator");function e(e){t=e.clientX||e.touches[0].clientX,r=!0;document.querySelectorAll(".result__weeks-btn")}function o(e){e.preventDefault(),r&&(n=n||u.querySelector(".slider-inner"),(e=(e.clientX||e.touches[0].clientX)-t)<0&&v<i.length-1||0<e&&0<v)&&(n.style.transform="translateX("+e+"px)")}function d(e){r&&(30<(e=e.clientX||e.changedTouches[0].clientX)-t?w(v-1):30<t-e&&w(v+1),(n=n||u.querySelector(".slider-inner")).style.transform=""),r=!1}return c.addEventListener("click",function(){w(v+1)}),s.addEventListener("click",function(){w(v-1)}),window.removeEventListener("resize",p),window.addEventListener("resize",p),u.removeEventListener("mousedown",e),u.removeEventListener("touchstart",e),u.addEventListener("mousedown",e),u.addEventListener("touchstart",e),u.removeEventListener("mousemove",o),u.removeEventListener("touchmove",o),u.addEventListener("mousemove",o),window.removeEventListener("mouseup",d),window.removeEventListener("touchend",d),window.addEventListener("mouseup",d),window.addEventListener("touchend",d),l&&(a=setInterval(function(){return w((v+1)%i.length)},1e11)),f},config:{elemsPerPage:_objectSpread(_objectSpread({},{lg:1,md:1,sm:1,xs:1}),r&&r.elemsPerPage||{}),media:_objectSpread(_objectSpread({},{lg:1160,md:920,sm:700}),r&&r.media||{})},buildSlider:function(){f.removeSlider();var e=document.createElement("div"),t=(e.className="slider-wrapper",document.createElement("div"));t.className="slider-inner",e.appendChild(t),u.appendChild(e),f.config.elemsPerPage[n]>=i.length+1?u.classList.add("not-enough-elems"):g()},removeSlider:function(){var e=u.querySelector(".slider-wrapper");u.classList.remove("not-enough-elems"),e&&e.remove(),a&&clearInterval(a)},toggle:w};function d(){for(var e=u.querySelector(".slider-indicators"),r=(e&&e.remove(),document.createElement("div")),t=(r.classList.add("slider-indicators"),0);t<Math.ceil(i.length/o());t++)!function(e){var t=document.createElement("div");t.classList.add("slider-indicator"),e===v&&t.classList.add("active"),t.setAttribute("index",e),t.addEventListener("click",function(){w(e)}),r.appendChild(t)}(t);u.querySelector(".slider-wrapper").appendChild(r)}function g(e){var t=h(f.activeIndex+i.length-o()*(e=e||1)),r=h(f.activeIndex),e=h(f.activeIndex+o()*e),n=u.querySelector(".slider-inner");o()<i.length&&(d(),u.querySelector(".slider-indicator.active")),n.innerHTML="",n.appendChild(t),n.appendChild(r),n.appendChild(e)}function h(e){var t=document.createElement("div");t.classList.add("slider-page");for(var r=e;r<e+o();r++){var n=i[r%i.length].cloneNode(!0);t.appendChild(n)}return t}function w(e){var t=u.querySelector(".slider-indicator.active"),r=u.querySelectorAll(".slider-indicator");r[e]&&(s.classList.remove("arrow-disabled"),c.classList.remove("arrow-disabled"),0===e&&s.classList.add("arrow-disabled"),e===r.length-1&&c.classList.add("arrow-disabled"),t&&t.classList.remove("active"),r[e]&&r[e].classList.add("active"),v<e?(1<e-v&&g(e-v),f.next()):e<v&&(1<v-e&&g(v-e),f.prev()),v=e)}return f.prev=function(){var e=u.querySelector(".slider-wrapper");e.classList.add("prev"),setTimeout(function(){e.classList.remove("prev"),f.activeIndex=(f.activeIndex-o()+i.length)%i.length,g()},300)},f.next=function(){var e=u.querySelector(".slider-wrapper");e.classList.add("next"),setTimeout(function(){e.classList.remove("next"),f.activeIndex=(f.activeIndex+o()+i.length)%i.length,g()},300)},f.init()}