var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){t[e]=o},e.parcelRequired7c6=n);var r=n("iQIUW");const i=document.querySelector(".form"),u=document.querySelector('[name="delay"]'),l=document.querySelector('[name="step"]'),a=document.querySelector('[name="amount"]');function d(e,o){return new Promise(((t,n)=>{const r=Math.random()>.3;setTimeout((()=>{r?t({position:e,delay:o}):n({position:e,delay:o})}),o)}))}i.addEventListener("submit",(function(e){if(e.preventDefault(),Number(u.value)<0||Number(l.value)<0||Number(a.value)<=0)return void r.Notify.failure("Введите положительные числа");let o=Number(u.value);for(let e=1;e<=Number(a.value);e++)console.log(o),d(e,o).then((({position:e,delay:o})=>{r.Notify.success(`✅ Fulfilled promise ${e} in ${o}ms`)})).catch((({position:e,delay:o})=>{r.Notify.failure(`❌ Rejected promise ${e} in ${o}ms`)})),o+=Number(l.value)}));
//# sourceMappingURL=03-promises.7a8c672a.js.map
