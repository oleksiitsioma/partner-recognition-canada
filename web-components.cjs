'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$2=Symbol(),n$3=new Map;class s$3{constructor(t,n){if(this._$cssResult$=!0,n!==e$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n$3.get(this.cssText);return t$1&&void 0===e&&(n$3.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o$3=t=>new s$3("string"==typeof t?t:t+"",e$2),r$2=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,e$2)},i$1=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$1=window.trustedTypes,r$1=e$1?e$1.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$2={toAttribute(t,i){switch(i){case Boolean:t=t?r$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$2=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:o$2,reflect:!1,hasChanged:n$2};class a$1 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1);}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$ES(t,i,s=l$3){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$2.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$2.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$EC());}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return !0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$E_=void 0),this._$EU();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.0.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i=globalThis.trustedTypes,s$1=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+e,n$1=`<${o$1}>`,l$2=document,h=(t="")=>l$2.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea)$/i,$=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),p=$(1),b=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),x=new WeakMap,w=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$2.createTreeWalker(l$2,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,$=-1,p=0;for(;p<s.length&&(d.lastIndex=p,u=d.exec(s),null!==u);)p=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,$=-1):void 0===u[1]?$=-2:($=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$1:$>=0?(l.push(o),s.slice(0,$)+"$lit$"+s.slice($)+e+y):s+e+(-2===$?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");return [void 0!==s$1?s$1.createHTML(u):u,l]};class P{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=P.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e),s=t.length-1;if(s>0){l.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$1)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e,t+1));)c.push({type:7,index:r}),t+=e.length-1;}r++;}}static createElement(t,i){const s=l$2.createElement("template");return s.innerHTML=t,s}}function V(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=V(t,d._$AS(t,i.values),d,e)),i}class E{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$2).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=V(this,t,i),r(t)?t===T||null==t||""===t?(this._$AH!==T&&this._$AR(),this._$AH=T):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):u(t)?this.M(t):this.$(t);}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t));}$(t){this._$AH!==T&&r(this._$AH)?this._$AA.nextSibling.data=t:this.S(l$2.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=P.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new E(o,this),i=t.p(this.options);t.m(s),this.S(i),this._$AH=t;}}_$AC(t){let i=x.get(t.strings);return void 0===i&&x.set(t.strings,i=new P(t)),i}M(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.A(h()),this.A(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=T,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=T;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=V(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=V(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===T?t=T:t!==T&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.k(t);}k(t){t===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}k(t){this.element[this.name]=t===T?void 0:t;}}const k=i?i.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}k(t){t&&t!==T?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=V(this,t,i,0))&&void 0!==s?s:T)===b)return;const e=this._$AH,o=t===T&&e!==T||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==T&&(e===T||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(P,N),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.0.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=w(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.0.2");

const keyCodes = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  TAB: 9,
  ENTER: 13,
  HOME: 36,
  END: 35,
  SPACE: 32,
  ESC: 27,
};

class FmcTooltipClose extends s {
  static get styles() {
    return [
      r$2`
        /* stylelint-disable */
        :host {
          cursor: pointer;
        }

        div {
          cursor: pointer;
          color: inherit;
          font: inherit;
        }
      `,
    ];
  }

  constructor() {
    super();

    this.addEventListener('click', this.close.bind(this));
    this.addEventListener('keyup', this.handleKeyboard.bind(this));
  }

  firstUpdated() {
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  render() {
    return p` <slot></slot> `;
  }

  close() {
    this.dispatchEvent(
      new CustomEvent('fmc-tooltip-close-btn', {
        bubbles: true,
        composed: true,
        detail: this,
      })
    );
  }

  handleKeyboard(event) {
    event.preventDefault();

    if (event.keyCode === keyCodes.SPACE || event.keyCode === keyCodes.ENTER) {
      this.close();
    }
  }
}

customElements.define('fmc-tooltip-close', FmcTooltipClose);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=l=>null!=l?l:T;

const fade = r$2`
  /* stylelint-disable */
  :host([effect='fade']) #content {
    opacity: 0;
    transition: all var(--fmc-tooltip-transition-speed, 0.3s);
  }
  :host([effect='fade'][opened]) #content {
    opacity: 1;
  }
`;

const scale = r$2`
  :host([effect='scale']) #content {
    opacity: 0;
    transition: all var(--fmc-tooltip-transition-speed, 0.3s);
  }
  :host([effect='scale'][opened]) #content {
    opacity: 1;
  }
  :host([effect='scale'][position='top']) #content,
  :host([effect='scale'][position='bottom']) #content {
    transform: translateX(-50%) scale(0.7);
  }
  :host([effect='scale'][position='top'][opened]) #content,
  :host([effect='scale'][position='bottom'][opened]) #content {
    transform: translateX(-50%) scale(1);
  }
  :host([effect='scale'][position='left']) #content,
  :host([effect='scale'][position='right']) #content {
    transform: translateY(-50%) scale(0.7);
  }
  :host([effect='scale'][position='left'][opened]) #content,
  :host([effect='scale'][position='right'][opened]) #content {
    transform: translateY(-50%) scale(1);
  }
`;

const slide = r$2`
  :host([effect='slide']) #content {
    opacity: 0;
    transition: all var(--fmc-tooltip-transition-speed, 0.3s) cubic-bezier(0.25, 0.5, 0.5, 0.9);
  }
  :host([effect='slide'][opened]) #content {
    opacity: 1;
  }
  :host([effect='slide'][position='top']) #content {
    transform: translateX(-50%) translateY(20%);
  }
  :host([effect='slide'][position='top'][opened]) #content {
    transform: translateX(-50%) translateY(0);
  }
  :host([effect='slide'][position='bottom']) #content {
    transform: translateX(-50%) translateY(-20%);
  }
  :host([effect='slide'][position='bottom'][opened]) #content {
    transform: translateX(-50%) translateY(0);
  }
  :host([effect='slide'][position='right']) #content {
    transform: translateY(-50%) translateX(-20%);
  }
  :host([effect='slide'][position='right'][opened]) #content {
    transform: translateY(-50%) translateX(0);
  }
  :host([effect='slide'][position='left']) #content {
    transform: translateY(-50%) translateX(20%);
  }
  :host([effect='slide'][position='left'][opened]) #content {
    transform: translateY(-50%) translateX(0);
  }
`;

const fall = r$2`
  :host([effect='fall']) {
    perspective: 1300px;
  }
  :host([effect='fall']) #content {
    transform-style: preserve-3d;
    opacity: 0;
  }
  :host([effect='fall'][opened]) #content {
    transition: all var(--fmc-tooltip-transition-speed, 0.3s) ease-in;
    opacity: 1;
  }
  :host([effect='fall'][position='top']) #content {
    transform: translateX(-50%) translateZ(600px) rotateX(20deg);
  }
  :host([effect='fall'][position='top'][opened]) #content {
    transform: translateX(-50%) translateZ(0px) rotateX(0deg);
  }
  :host([effect='fall'][position='bottom']) #content {
    transform: translateX(-50%) translateZ(600px) rotateX(20deg);
  }
  :host([effect='fall'][position='bottom'][opened]) #content {
    transform: translateX(-50%) translateZ(0px) rotateX(0deg);
  }
  :host([effect='fall'][position='right']) #content {
    transform: translateY(-50%) translateZ(600px) rotateX(20deg);
  }
  :host([effect='fall'][position='right'][opened]) #content {
    transform: translateY(-50%) translateZ(0px) rotateX(0deg);
  }
  :host([effect='fall'][position='left']) #content {
    transform: translateY(-50%) translateZ(600px) rotateX(20deg);
  }
  :host([effect='fall'][position='left'][opened]) #content {
    transform: translateY(-50%) translateZ(0px) rotateX(0deg);
  }
`;

const flipHorizontal = r$2`
  :host([effect='flip-horizontal']) {
    perspective: 1300px;
  }
  :host([effect='flip-horizontal']) #content {
    transform-style: preserve-3d;
    transition: all var(--fmc-tooltip-transition-speed, 0.3s);
    opacity: 0;
  }
  :host([effect='flip-horizontal'][opened]) #content {
    opacity: 1;
  }
  :host([effect='flip-horizontal'][position='top']) #content {
    transform: translateX(-50%) rotateY(-70deg);
  }
  :host([effect='flip-horizontal'][position='top'][opened]) #content {
    transform: translateX(-50%) rotateY(0deg);
  }
  :host([effect='flip-horizontal'][position='bottom']) #content {
    transform: translateX(-50%) rotateY(-70deg);
  }
  :host([effect='flip-horizontal'][position='bottom'][opened]) #content {
    transform: translateX(-50%) rotateY(0deg);
  }
  :host([effect='flip-horizontal'][position='right']) #content {
    transform: translateY(-50%) rotateY(-70deg);
  }
  :host([effect='flip-horizontal'][position='right'][opened]) #content {
    transform: translateY(-50%) rotateY(0deg);
  }
  :host([effect='flip-horizontal'][position='left']) #content {
    transform: translateY(-50%) rotateY(-70deg);
  }
  :host([effect='flip-horizontal'][position='left'][opened]) #content {
    transform: translateY(-50%) rotateY(0deg);
  }
`;

const flipVertical = r$2`
  :host([effect='flip-vertical']) {
    perspective: 1300px;
  }
  :host([effect='flip-vertical']) #content {
    transform-style: preserve-3d;
    transition: all var(--fmc-tooltip-transition-speed, 0.3s);
    opacity: 0;
  }
  :host([effect='flip-vertical'][opened]) #content {
    opacity: 1;
  }
  :host([effect='flip-vertical'][position='top']) #content {
    transform: translateX(-50%) rotateX(-70deg);
  }
  :host([effect='flip-vertical'][position='top'][opened]) #content {
    transform: translateX(-50%) rotateX(0deg);
  }
  :host([effect='flip-vertical'][position='bottom']) #content {
    transform: translateX(-50%) rotateX(-70deg);
  }
  :host([effect='flip-vertical'][position='bottom'][opened]) #content {
    transform: translateX(-50%) rotateX(0deg);
  }
  :host([effect='flip-vertical'][position='right']) #content {
    transform: translateY(-50%) rotateX(-70deg);
  }
  :host([effect='flip-vertical'][position='right'][opened]) #content {
    transform: translateY(-50%) rotateX(0deg);
  }
  :host([effect='flip-vertical'][position='left']) #content {
    transform: translateY(-50%) rotateX(-70deg);
  }
  :host([effect='flip-vertical'][position='left'][opened]) #content {
    transform: translateY(-50%) rotateX(0deg);
  }
`;

const sign = r$2`
  :host([effect='sign']) {
    perspective: 1300px;
  }
  :host([effect='sign']) #content {
    transform-style: preserve-3d;
    transition: all var(--fmc-tooltip-transition-speed, 0.3s);
    opacity: 0;
  }
  :host([effect='sign'][opened]) #content {
    opacity: 1;
  }
  :host([effect='sign'][position='top']) #content {
    transform-origin: 0 100%;
    transform: translateX(-50%) rotateX(90deg);
  }
  :host([effect='sign'][position='top'][opened]) #content {
    transform: translateX(-50%) rotateX(0deg);
  }
  :host([effect='sign'][position='bottom']) #content {
    transform-origin: 100% 0;
    transform: translateX(-50%) rotateX(90deg);
  }
  :host([effect='sign'][position='bottom'][opened]) #content {
    transform: translateX(-50%) rotateX(0deg);
  }
  :host([effect='sign'][position='right']) #content {
    transform-origin: 0 100%;
    transform: translateY(-50%) rotateY(90deg);
  }
  :host([effect='sign'][position='right'][opened]) #content {
    transform: translateY(-50%) rotateY(0deg);
  }
  :host([effect='sign'][position='left']) #content {
    transform-origin: 100% 0;
    transform: translateY(-50%) rotateY(90deg);
  }
  :host([effect='sign'][position='left'][opened]) #content {
    transform: translateY(-50%) rotateY(0deg);
  }
`;

const superScaled = r$2`
  :host([effect='super-scaled']) #content {
    opacity: 0;
    transition: all var(--fmc-tooltip-transition-speed, 0.3s);
  }
  :host([effect='super-scaled'][opened]) #content {
    opacity: 1;
  }
  :host([effect='super-scaled'][position='top']) #content,
  :host([effect='super-scaled'][position='bottom']) #content {
    transform: translateX(-50%) scale(2);
  }
  :host([effect='super-scaled'][position='top'][opened]) #content,
  :host([effect='super-scaled'][position='bottom'][opened]) #content {
    transform: translateX(-50%) scale(1);
  }
  :host([effect='super-scaled'][position='left']) #content,
  :host([effect='super-scaled'][position='right']) #content {
    transform: translateY(-50%) scale(2);
  }
  :host([effect='super-scaled'][position='left'][opened]) #content,
  :host([effect='super-scaled'][position='right'][opened]) #content {
    transform: translateY(-50%) scale(1);
  }
`;

const tooltip = r$2`
  /* stylelint-disable */
  #tooltip {
    display: flex;
    position: absolute;
    z-index: 3;
  }

  :host([position='top']) #tooltip {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position='right']) #tooltip {
    right: 100%;
    top: 50%;
    transform-origin: top;
    transform: translateY(-50%);
  }

  :host([position='bottom']) #tooltip {
    bottom: 100%;
    left: 50%;
    transform-origin: left;
    transform: translateX(-50%);
  }

  :host([position='left']) #tooltip {
    left: 100%;
    top: 50%;
    transform-origin: top;
    transform: translateY(-50%);
  }

  /* svg */
  #tooltip svg {
    position: relative;
  }

  :host([position='right']) svg {
    transform: rotate(90deg);
    right: -8px;
  }

  :host([position='bottom']) svg {
    transform: rotate(180deg);
    right: -8px;
  }

  :host([position='left']) svg {
    transform: rotate(270deg);
    right: 8px;
  }

  :host([brand='lincoln']) #tooltip polyline {
    fill: var(--fds-color--primary) !important;
    stroke: var(--fds-color--primary) !important;
  }
`;

const customTooltip = r$2`
  #custom-tooltip {
    display: flex;
    position: absolute;
  }

  :host([position='top']) #custom-tooltip {
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position='right']) #custom-tooltip {
    right: 100%;
    top: 50%;
    transform-origin: top;
    transform: translateY(-50%);
  }

  :host([position='bottom']) #custom-tooltip {
    bottom: 100%;
    left: 50%;
    transform-origin: left;
    transform: translateX(-50%);
  }

  :host([position='left']) #custom-tooltip {
    left: 100%;
    top: 50%;
    transform-origin: top;
    transform: translateY(-50%);
  }

  ::slotted([slot='custom-tooltip']) {
    display: flex;
  }
`;

/* eslint-disable import/extensions */

class FmcTooltip extends s {
  static get styles() {
    return [
      r$2`
        /* stylelint-disable */
        :host {
          display: inline-block;
          position: relative;
          z-index: unset;
        }

        ::slotted([slot='trigger']) {
          position: relative;
          z-index: 2;
        }

        ::slotted([slot='content']) {
          color: var(--fds-color--gray3);
          display: block;
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 1rem;
          cursor: default;
          border-radius: 0.3rem;
          box-sizing: border-box;
          background-color: var(--fds-color--white);
          border: 1px solid var(--fds-color--gray3);
          box-shadow: var(--fmc-elevation__box-shadow--layer3);
          transform: translate(var(--fmc-tooltip-content-offset-x, 0), var(--fmc-tooltip-content-offset-y, 0));
        }

        :host([mobile]) ::slotted([slot='content']) {
          height: 100%;
        }

        :host([position='top']) ::slotted([slot='content']) {
          position: relative;
          top: 1px;
        }

        :host([position='bottom']) ::slotted([slot='content']) {
          position: relative;
          top: -1px;
        }

        :host([brand='lincoln']) ::slotted([slot='content']) {
          color: var(--fds-color--white);
          font-size: 1.3rem;
          padding: 1rem 1.3rem;
          border: 1px solid var(--fds-color--primary);
          background-color: var(--fds-color--primary);
        }

        #trigger {
          display: inline-block;
          cursor: pointer;
        }

        #content {
          visibility: hidden;
          pointer-events: none;
          width: var(--fmc-tooltip-width, 100%);
          height: var(--fmc-tooltip-height, auto);
          position: absolute;
          z-index: -1;
        }

        :host([opened]) #content {
          visibility: visible;
          z-index: 9;
          pointer-events: auto;
        }

        :host([position='top']) #content {
          bottom: calc(100% + var(--fmc-tooltip-gap, 2rem));
          left: 50%;
          transform: translateX(-50%);
        }

        :host([position='right']) #content {
          left: calc(100% + var(--fmc-tooltip-gap, 2rem));
          top: 50%;
          transform: translateY(-50%);
        }

        :host([position='bottom']) #content {
          top: calc(100% + var(--fmc-tooltip-gap, 2rem));
          left: 50%;
          transform: translateX(-50%);
        }

        :host([position='left']) #content {
          right: calc(100% + var(--fmc-tooltip-gap, 2rem));
          top: 50%;
          transform: translateY(-50%);
        }

        :host([mobile]) #content {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translate(0, 0);
          width: 100%;
          min-height: 100vh;
        }

        #overlay {
          display: none;
        }

        :host([opened]) #overlay {
          display: block;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100vh;
        }

        #measurement {
          visibility: hidden;
          position: fixed;
          z-index: -1;
          overflow: hidden;
        }
      `,
      tooltip,
      customTooltip,
      fade,
      scale,
      slide,
      fall,
      flipHorizontal,
      flipVertical,
      sign,
      superScaled,
    ];
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        reflect: true,
      },
      effect: {
        string: String,
        reflect: true,
      },
      position: {
        type: String,
        reflect: true,
      },
      hideTooltip: {
        type: Boolean,
        reflect: true,
        attribute: 'hide-tooltip',
      },
      customTooltip: {
        type: Boolean,
        attribute: 'custom-tooltip',
      },
      fireOn: {
        type: String,
        attribute: 'fire-on',
      },
      clickOutside: {
        type: Boolean,
        attribute: 'click-outside',
      },
      mobile: {
        type: Boolean,
        reflect: true,
      },
      breakpoint: {
        type: String,
      },
      smart: {
        type: Boolean,
      },
      label: {
        type: String,
      },
      brand: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();

    // managed properties
    this.opened = false;
    this.effect = 'fade';
    this.position = 'top';
    this.hideTooltip = false;
    this.customTooltip = false;
    this.fireOn = 'hover';
    this.clickOutside = false;
    this.mobile = null;
    this.breakpoint = '600px';
    this.smart = true;

    // standard properties
    this.focusableSelector =
      'body, a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

    // bindings
    this.addEventListener('fmc-tooltip-close-btn', this.close.bind(this));
  }

  firstUpdated() {
    // elements
    this.measurementElement = this.shadowRoot.getElementById('measurement');

    this.contentElement = this.shadowRoot.querySelector('slot[name="content"]').assignedNodes({ flatten: true })[0];

    // events
    window.addEventListener('resize', () => {
      this.isMobile();
      this.smartContent();
    });
  }

  updated(prevProps) {
    if (!prevProps.get('opened') && this.opened === true) {
      this.makeEvent('open');
      this.trapFocus();

      if (this.fireOn === 'click') {
        this.focusCloseBtn();
      }
    }

    if (prevProps.get('opened') && this.opened === false) {
      this.makeEvent('close');
      this.unTrapFocus();
    }

    this.isMobile();
    this.smartContent();
    this.autoWidth();

    this.focusableElements = this.shadowRoot
      .querySelector('slot[name="content"]')
      .assignedNodes({ flatten: true })[0]
      .querySelectorAll(this.focusableSelector);

    this.focusableElements.forEach((element) => {
      element.addEventListener('keydown', (event) => this.handleFocusableDown(event));
    });
  }

  render() {
    return p`
      <div
        id="trigger"
        part="trigger"
        tabindex="0"
        aria-describedby="content"
        @click=${this.fireOn === 'click' ? (event) => this.toggle(event) : null}
        @keyup=${this.fireOn === 'click' ? (event) => this.handleTriggerUp(event) : null}
        @mouseenter=${this.fireOn !== 'click' ? () => this.open() : null}
        @mouseleave=${this.fireOn !== 'click' ? () => this.close() : null}
        @focus=${this.fireOn !== 'click' ? () => this.open() : null}
        @blur=${this.fireOn !== 'click' ? () => this.close() : null}
      >
        <slot name="trigger"></slot>
        <div
          id="content"
          part="content"
          role="${this.fireOn === 'click' ? 'dialog' : 'tooltip'}"
          aria-modal="${this.fireOn === 'click' ? 'true' : 'false'}"
          aria-label="${l(this.label ? this.label : undefined)}"
        >
          <slot name="content"></slot>
          ${this.makeTooltip()}
        </div>
      </div>
      <div id="measurement" aria-hidden="true"></div>
      ${this.makeOverlay()}
    `;
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  toggle(event) {
    const isSlotTrigger = event.target.getAttribute('slot') === 'trigger';
    const isPartTrigger = event.target.getAttribute('part') === 'trigger';
    const isSelf = event.target === this;

    if (isSlotTrigger || isPartTrigger || isSelf) {
      if (this.opened) {
        this.opened = false;
      } else {
        this.opened = true;
      }
    }
  }

  handleFocusableDown(event) {
    const firstFocusable = this.focusableElements[0];
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1];

    if (event.keyCode === keyCodes.TAB) {
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  handleTriggerUp(event) {
    if (event.keyCode === keyCodes.ESC) {
      this.close();
    }

    if (event.keyCode === keyCodes.ENTER || event.keyCode === keyCodes.SPACE) {
      this.toggle(event);
    }
  }

  isMobile() {
    const mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint})`);
    this.mobile = mediaQuery.matches;
  }

  makeEvent(type) {
    this.dispatchEvent(
      new CustomEvent(`fmc-tooltip-${type}`, {
        bubbles: true,
        composed: true,
        detail: this,
      })
    );
  }

  makeTooltip() {
    if (this.customTooltip) {
      return p`
        <div id="custom-tooltip" part="custom-tooltip">
          <slot name="custom-tooltip"></slot>
        </div>
      `;
    }

    if (!this.hideTooltip) {
      return p`
        <div id="tooltip" part="tooltip">
          <svg width="32" height="18" viewBox="0 0 1366.99 767.67">
            <polyline
              points="0.74 0.67 685.25 766.17 1366.24 0.67"
              style="fill:#ffffff; stroke:rgba(36,49,56,1); stroke-width:50px"
            />
          </svg>
        </div>
      `;
    }

    return null;
  }

  makeOverlay() {
    if (this.clickOutside) {
      return p` <div id="overlay" @click=${() => this.close()}></div> `;
    }

    return null;
  }

  smartContent() {
    if (!this.mobile && this.smart) {
      // order here is important. to properly detect an offscreen tooltip,
      // we must remove the direction properties before getting contentRect
      this.contentElement.style.removeProperty('left');
      this.contentElement.style.removeProperty('right');
      this.contentElement.style.removeProperty('top');
      this.contentElement.style.removeProperty('bottom');

      const contentRect = this.contentElement.getBoundingClientRect();

      const padding = 20;
      const isOffScreenLeft = contentRect.left < 0;
      const isOffScreenRight = window.innerWidth - contentRect.right < 0;
      const isOffScreenTop = contentRect.top < 0;
      const isOffScreenBottom = contentRect.bottom > window.innerHeight;

      // adjust positioning
      if (this.position === 'top' && isOffScreenTop) {
        this.setPosition(contentRect);
      }

      if (this.position === 'right' && isOffScreenRight) {
        this.setPosition(contentRect);
      }

      if (this.position === 'bottom' && isOffScreenBottom) {
        this.setPosition(contentRect);
      }

      if (this.position === 'left' && isOffScreenLeft) {
        this.setPosition(contentRect);
      }

      // adjust content
      if (isOffScreenLeft) {
        this.contentElement.style.left = `${Math.abs(contentRect.left - padding)}px`;
      } else {
        this.contentElement.style.removeProperty('left');
      }

      if (isOffScreenRight) {
        this.contentElement.style.right = `${Math.abs(window.innerWidth - contentRect.right - padding)}px`;
      } else {
        this.contentElement.style.removeProperty('right');
      }

      if (isOffScreenTop) {
        this.contentElement.style.top = `${Math.abs(contentRect.top - padding)}px`;
      } else {
        this.contentElement.style.removeProperty('top');
      }

      if (isOffScreenBottom) {
        this.contentElement.style.bottom = `${Math.abs(contentRect.bottom - window.innerHeight - padding)}px`;
      } else {
        this.contentElement.style.removeProperty('bottom');
      }
    }
  }

  setPosition(contentRect) {
    if (contentRect.top > 0) {
      this.position = 'top';
    } else if (contentRect.right < window.innerWidth) {
      this.position = 'right';
    } else if (contentRect.bottom < window.innerHeight) {
      this.position = 'bottom';
    }
  }

  focusCloseBtn() {
    const closeBtn = this.shadowRoot
      .querySelector('slot[name="content"]')
      .assignedNodes({ flatten: true })[0]
      .querySelector('fmc-tooltip-close');

    setTimeout(() => {
      closeBtn.focus();
    }, 100);
  }

  trapFocus() {
    const focusableDocElements = document.querySelectorAll(this.focusableSelector);
    const triggerElements = document.querySelectorAll('fmc-tooltip');

    focusableDocElements.forEach((element) => {
      if (element.closest('fmc-tooltip') === null && !element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
        element.setAttribute('data-fmc-tooltip-trapped', true);
      }
    });

    triggerElements.forEach((trigger) => {
      trigger.shadowRoot.getElementById('trigger').setAttribute('tabindex', '-1');
    });
  }

  unTrapFocus() {
    const trappedElements = document.querySelectorAll('[data-fmc-tooltip-trapped]');
    const triggerElements = document.querySelectorAll('fmc-tooltip');

    trappedElements.forEach((element) => {
      element.removeAttribute('tabindex');
      element.removeAttribute('data-fmc-tooltip-trapped');
    });

    triggerElements.forEach((trigger) => {
      trigger.shadowRoot.getElementById('trigger').setAttribute('tabindex', '0');
    });
  }

  autoWidth() {
    const shadowContent = this.shadowRoot.getElementById('content');
    this.measurementElement.innerHTML = this.contentElement.innerHTML;

    if (this.fireOn !== 'click') {
      shadowContent.style.width = `${this.measurementElement.offsetWidth}px`;
    } else {
      shadowContent.style.removeProperty('width');
    }
  }
}

customElements.define('fmc-tooltip', FmcTooltip);

exports.customTooltip = customTooltip;
exports.fade = fade;
exports.fall = fall;
exports.flipHorizontal = flipHorizontal;
exports.flipVertical = flipVertical;
exports.scale = scale;
exports.sign = sign;
exports.slide = slide;
exports.superScaled = superScaled;
exports.tooltip = tooltip;
//# sourceMappingURL=web-components.cjs.map
