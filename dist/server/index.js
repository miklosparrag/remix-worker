import{jsx as t,jsxs as i,Fragment as M}from"react/jsx-runtime";import{RemixServer as Ae,Await as U,NavLink as N,useAsyncValue as _e,useLocation as we,Link as f,useFetcher as oe,useNavigate as ae,Outlet as se,useRouteLoaderData as Ie,Meta as De,Links as Ee,ScrollRestoration as xe,Scripts as Ne,useLoaderData as v,Form as Y,useOutletContext as ie,useNavigation as le,useActionData as ce}from"@remix-run/react";import{isbot as Oe}from"isbot";import{renderToReadableStream as Te}from"react-dom/server";import{useOptimisticCart as de,useAnalytics as Re,Money as A,Image as w,CartForm as y,getShopAnalytics as Le,useNonce as je,Analytics as G,getSitemap as Me,Pagination as ue,getPaginationVariables as T,useOptimisticVariant as Ue,getAdjacentAndFirstAvailableVariants as Fe,useSelectedOptionInUrlParam as qe,getProductOptions as ke,getSelectedProductOptions as He,getSitemapIndex as Be,parseGid as ze,flattenConnection as z}from"@shopify/hydrogen";import{createContext as Ve,useContext as Ye,useEffect as Q,useState as Ge,Suspense as F,useMemo as Qe,useRef as L,useId as Ke}from"react";import{redirect as D,data as S}from"@remix-run/cloudflare";const J=5e3;async function Ze(e,r,n,o,a){const s=new AbortController,l=setTimeout(()=>s.abort(),J),c=await Te(t(Ae,{context:o,url:e.url,abortDelay:J}),{signal:s.signal,onError(d){s.signal.aborted||console.error(d),r=500}});return c.allReady.then(()=>clearTimeout(l)),Oe(e.headers.get("user-agent")||"")&&await c.allReady,n.set("Content-Type","text/html"),new Response(c,{headers:n,status:r})}const We=Object.freeze(Object.defineProperty({__proto__:null,default:Ze},Symbol.toStringTag,{value:"Module"})),he=`#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`,Xe=`#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${he}
`,Je=`#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${he}
`;function q({children:e,heading:r,type:n}){const{type:o,close:a}=E(),s=n===o;return Q(()=>{const l=new AbortController;return s&&document.addEventListener("keydown",function(d){d.key==="Escape"&&a()},{signal:l.signal}),()=>l.abort()},[a,s]),i("div",{"aria-modal":!0,className:`overlay ${s?"expanded":""}`,role:"dialog",children:[t("button",{className:"close-outside",onClick:a}),i("aside",{children:[i("header",{children:[t("h3",{children:r}),t("button",{className:"close reset",onClick:a,"aria-label":"Close",children:"×"})]}),t("main",{children:e})]})]})}const me=Ve(null);q.Provider=function({children:r}){const[n,o]=Ge("closed");return t(me.Provider,{value:{type:n,open:o,close:()=>o("closed")},children:r})};function E(){const e=Ye(me);if(!e)throw new Error("useAside must be used within an AsideProvider");return e}function et({footer:e,header:r,publicStoreDomain:n}){return t(F,{children:t(U,{resolve:e,children:o=>{var a;return t("footer",{className:"footer",children:(o==null?void 0:o.menu)&&((a=r.shop.primaryDomain)==null?void 0:a.url)&&t(tt,{menu:o.menu,primaryDomainUrl:r.shop.primaryDomain.url,publicStoreDomain:n})})}})})}function tt({menu:e,primaryDomainUrl:r,publicStoreDomain:n}){return t("nav",{className:"footer-menu",role:"navigation",children:(e||rt).items.map(o=>{if(!o.url)return null;const a=o.url.includes("myshopify.com")||o.url.includes(n)||o.url.includes(r)?new URL(o.url).pathname:o.url;return!a.startsWith("/")?t("a",{href:a,rel:"noopener noreferrer",target:"_blank",children:o.title},o.id):t(N,{end:!0,prefetch:"intent",style:nt,to:a,children:o.title},o.id)})})}const rt={items:[{id:"gid://shopify/MenuItem/461633060920",resourceId:"gid://shopify/ShopPolicy/23358046264",tags:[],title:"Privacy Policy",type:"SHOP_POLICY",url:"/policies/privacy-policy",items:[]},{id:"gid://shopify/MenuItem/461633093688",resourceId:"gid://shopify/ShopPolicy/23358013496",tags:[],title:"Refund Policy",type:"SHOP_POLICY",url:"/policies/refund-policy",items:[]},{id:"gid://shopify/MenuItem/461633126456",resourceId:"gid://shopify/ShopPolicy/23358111800",tags:[],title:"Shipping Policy",type:"SHOP_POLICY",url:"/policies/shipping-policy",items:[]},{id:"gid://shopify/MenuItem/461633159224",resourceId:"gid://shopify/ShopPolicy/23358079032",tags:[],title:"Terms of Service",type:"SHOP_POLICY",url:"/policies/terms-of-service",items:[]}]};function nt({isActive:e,isPending:r}){return{fontWeight:e?"bold":void 0,color:r?"grey":"white"}}function ot({header:e,isLoggedIn:r,cart:n,publicStoreDomain:o}){const{shop:a,menu:s}=e;return i("header",{className:"header",children:[t(N,{prefetch:"intent",to:"/",style:V,end:!0,children:t("strong",{children:a.name})}),t(pe,{menu:s,viewport:"desktop",primaryDomainUrl:e.shop.primaryDomain.url,publicStoreDomain:o}),t(at,{isLoggedIn:r,cart:n})]})}function pe({menu:e,primaryDomainUrl:r,viewport:n,publicStoreDomain:o}){const a=`header-menu-${n}`,{close:s}=E();return i("nav",{className:a,role:"navigation",children:[n==="mobile"&&t(N,{end:!0,onClick:s,prefetch:"intent",style:V,to:"/",children:"Home"}),(e||dt).items.map(l=>{if(!l.url)return null;const c=l.url.includes("myshopify.com")||l.url.includes(o)||l.url.includes(r)?new URL(l.url).pathname:l.url;return t(N,{className:"header-menu-item",end:!0,onClick:s,prefetch:"intent",style:V,to:c,children:l.title},l.id)})]})}function at({isLoggedIn:e,cart:r}){return i("nav",{className:"header-ctas",role:"navigation",children:[t(st,{}),t(N,{prefetch:"intent",to:"/account",style:V,children:t(F,{fallback:"Sign in",children:t(U,{resolve:e,errorElement:"Sign in",children:n=>n?"Account":"Sign in"})})}),t(it,{}),t(lt,{cart:r})]})}function st(){const{open:e}=E();return t("button",{className:"header-menu-mobile-toggle reset",onClick:()=>e("mobile"),children:t("h3",{children:"☰"})})}function it(){const{open:e}=E();return t("button",{className:"reset",onClick:()=>e("search"),children:"Search"})}function fe({count:e}){const{open:r}=E(),{publish:n,shop:o,cart:a,prevCart:s}=Re();return i("a",{href:"/cart",onClick:l=>{l.preventDefault(),r("cart"),n("cart_viewed",{cart:a,prevCart:s,shop:o,url:window.location.href||""})},children:["Cart ",e===null?t("span",{children:" "}):e]})}function lt({cart:e}){return t(F,{fallback:t(fe,{count:null}),children:t(U,{resolve:e,children:t(ct,{})})})}function ct(){const e=_e(),r=de(e);return t(fe,{count:(r==null?void 0:r.totalQuantity)??0})}const dt={items:[{id:"gid://shopify/MenuItem/461609500728",resourceId:null,tags:[],title:"Collections",type:"HTTP",url:"/collections",items:[]},{id:"gid://shopify/MenuItem/461609533496",resourceId:null,tags:[],title:"Blog",type:"HTTP",url:"/blogs/journal",items:[]},{id:"gid://shopify/MenuItem/461609566264",resourceId:null,tags:[],title:"Policies",type:"HTTP",url:"/policies",items:[]},{id:"gid://shopify/MenuItem/461609599032",resourceId:"gid://shopify/Page/92591030328",tags:[],title:"About",type:"PAGE",url:"/pages/about",items:[]}]};function V({isActive:e,isPending:r}){return{fontWeight:e?"bold":void 0,color:r?"grey":"black"}}function ge(e,r){const{pathname:n}=we();return Qe(()=>ut({handle:e,pathname:n,searchParams:new URLSearchParams,selectedOptions:r}),[e,r,n])}function ut({handle:e,pathname:r,searchParams:n,selectedOptions:o}){const a=/(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(r),l=a&&a.length>0?`${a[0]}products/${e}`:`/products/${e}`;o==null||o.forEach(d=>{n.set(d.name,d.value)});const c=n.toString();return l+(c?"?"+n.toString():"")}function ye({price:e,compareAtPrice:r}){return t("div",{className:"product-price",children:r?i("div",{className:"product-price-on-sale",children:[e?t(A,{data:e}):null,t("s",{children:t(A,{data:r})})]}):e?t(A,{data:e}):t("span",{children:" "})})}function ht({layout:e,line:r}){var h;const{id:n,merchandise:o}=r,{product:a,title:s,image:l,selectedOptions:c}=o,d=ge(a.handle,c),{close:u}=E();return i("li",{className:"cart-line",children:[l&&t(w,{alt:s,aspectRatio:"1/1",data:l,height:100,loading:"lazy",width:100}),i("div",{children:[t(f,{prefetch:"intent",to:d,onClick:()=>{e==="aside"&&u()},children:t("p",{children:t("strong",{children:a.title})})}),t(ye,{price:(h=r==null?void 0:r.cost)==null?void 0:h.totalAmount}),t("ul",{children:c.map(p=>t("li",{children:i("small",{children:[p.name,": ",p.value]})},p.name))}),t(mt,{line:r})]})]},n)}function mt({line:e}){if(!e||typeof(e==null?void 0:e.quantity)>"u")return null;const{id:r,quantity:n,isOptimistic:o}=e,a=Number(Math.max(0,n-1).toFixed(0)),s=Number((n+1).toFixed(0));return i("div",{className:"cart-line-quantity",children:[i("small",{children:["Quantity: ",n,"   "]}),t(ee,{lines:[{id:r,quantity:a}],children:t("button",{"aria-label":"Decrease quantity",disabled:n<=1||!!o,name:"decrease-quantity",value:a,children:t("span",{children:"− "})})})," ",t(ee,{lines:[{id:r,quantity:s}],children:t("button",{"aria-label":"Increase quantity",name:"increase-quantity",value:s,disabled:!!o,children:t("span",{children:"+"})})})," ",t(pt,{lineIds:[r],disabled:!!o})]})}function pt({lineIds:e,disabled:r}){return t(y,{fetcherKey:Ce(e),route:"/cart",action:y.ACTIONS.LinesRemove,inputs:{lineIds:e},children:t("button",{disabled:r,type:"submit",children:"Remove"})})}function ee({children:e,lines:r}){const n=r.map(o=>o.id);return t(y,{fetcherKey:Ce(n),route:"/cart",action:y.ACTIONS.LinesUpdate,inputs:{lines:r},children:e})}function Ce(e){return[y.ACTIONS.LinesUpdate,...e].join("-")}function ft({cart:e,layout:r}){var o,a,s;return i("div",{"aria-labelledby":"cart-summary",className:r==="page"?"cart-summary-page":"cart-summary-aside",children:[t("h4",{children:"Totals"}),i("dl",{className:"cart-subtotal",children:[t("dt",{children:"Subtotal"}),t("dd",{children:(a=(o=e.cost)==null?void 0:o.subtotalAmount)!=null&&a.amount?t(A,{data:(s=e.cost)==null?void 0:s.subtotalAmount}):"-"})]}),t(yt,{discountCodes:e.discountCodes}),t(Ct,{giftCardCodes:e.appliedGiftCards}),t(gt,{checkoutUrl:e.checkoutUrl})]})}function gt({checkoutUrl:e}){return e?i("div",{children:[t("a",{href:e,target:"_self",children:t("p",{children:"Continue to Checkout →"})}),t("br",{})]}):null}function yt({discountCodes:e}){var n;const r=((n=e==null?void 0:e.filter(o=>o.applicable))==null?void 0:n.map(({code:o})=>o))||[];return i("div",{children:[t("dl",{hidden:!r.length,children:i("div",{children:[t("dt",{children:"Discount(s)"}),t(te,{children:i("div",{className:"cart-discount",children:[t("code",{children:r==null?void 0:r.join(", ")})," ",t("button",{children:"Remove"})]})})]})}),t(te,{discountCodes:r,children:i("div",{children:[t("input",{type:"text",name:"discountCode",placeholder:"Discount code"})," ",t("button",{type:"submit",children:"Apply"})]})})]})}function te({discountCodes:e,children:r}){return t(y,{route:"/cart",action:y.ACTIONS.DiscountCodesUpdate,inputs:{discountCodes:e||[]},children:r})}function Ct({giftCardCodes:e}){const r=L([]),n=L(null),o=(e==null?void 0:e.map(({lastCharacters:l})=>`***${l}`))||[];function a(l){const c=l.replace(/\s/g,"");r.current.includes(c)||r.current.push(c),n.current.value=""}function s(){r.current=[]}return i("div",{children:[t("dl",{hidden:!o.length,children:i("div",{children:[t("dt",{children:"Applied Gift Card(s)"}),t(re,{children:i("div",{className:"cart-discount",children:[t("code",{children:o==null?void 0:o.join(", ")})," ",t("button",{onSubmit:()=>s,children:"Remove"})]})})]})}),t(re,{giftCardCodes:r.current,saveAppliedCode:a,children:i("div",{children:[t("input",{type:"text",name:"giftCardCode",placeholder:"Gift card code",ref:n})," ",t("button",{type:"submit",children:"Apply"})]})})]})}function re({giftCardCodes:e,saveAppliedCode:r,children:n}){return t(y,{route:"/cart",action:y.ACTIONS.GiftCardCodesUpdate,inputs:{giftCardCodes:e||[]},children:o=>{var s;const a=(s=o.formData)==null?void 0:s.get("giftCardCode");return a&&r&&r(a),n}})}function be({layout:e,cart:r}){var c,d,u,h,p;const n=de(r),o=!!((d=(c=n==null?void 0:n.lines)==null?void 0:c.nodes)!=null&&d.length),s=`cart-main ${n&&!!((h=(u=n==null?void 0:n.discountCodes)==null?void 0:u.filter(g=>g.applicable))!=null&&h.length)?"with-discount":""}`,l=n!=null&&n.totalQuantity?n.totalQuantity>0:!1;return i("div",{className:s,children:[t(bt,{hidden:o,layout:e}),i("div",{className:"cart-details",children:[t("div",{"aria-labelledby":"cart-lines",children:t("ul",{children:(((p=n==null?void 0:n.lines)==null?void 0:p.nodes)??[]).map(g=>t(ht,{line:g,layout:e},g.id))})}),l&&t(ft,{cart:n,layout:e})]})]})}function bt({hidden:e=!1}){const{close:r}=E();return i("div",{hidden:e,children:[t("br",{}),t("p",{children:"Looks like you haven’t added anything yet, let’s get you started!"}),t("br",{}),t(f,{to:"/collections",onClick:r,prefetch:"viewport",children:"Continue shopping →"})]})}const Z="/search";function vt({children:e,className:r="predictive-search-form",...n}){const o=oe({key:"search"}),a=L(null),s=ae(),l=E();function c(h){var p;h.preventDefault(),h.stopPropagation(),(p=a==null?void 0:a.current)!=null&&p.value&&a.current.blur()}function d(){var p;const h=(p=a==null?void 0:a.current)==null?void 0:p.value;s(Z+(h?`?q=${h}`:"")),l.close()}function u(h){o.submit({q:h.target.value||"",limit:5,predictive:!0},{method:"GET",action:Z})}return Q(()=>{var h;(h=a==null?void 0:a.current)==null||h.setAttribute("type","search")},[]),typeof e!="function"?null:t(o.Form,{...n,className:r,onSubmit:c,children:e({inputRef:a,fetcher:o,fetchResults:u,goToSearch:d})})}function ve(){return{total:0,items:{articles:[],collections:[],products:[],pages:[],queries:[]}}}function R({baseUrl:e,trackingParams:r,params:n,term:o}){let a=new URLSearchParams({...n,q:encodeURIComponent(o)}).toString();return r&&(a=`${a}&${r}`),`${e}?${a}`}function _({children:e}){const r=E(),{term:n,inputRef:o,fetcher:a,total:s,items:l}=It();function c(){o.current&&(o.current.blur(),o.current.value="")}function d(){c(),r.close()}return e({items:l,closeSearch:d,inputRef:o,state:a.state,term:n,total:s})}_.Articles=$t;_.Collections=Pt;_.Pages=St;_.Products=At;_.Queries=_t;_.Empty=wt;function $t({term:e,articles:r,closeSearch:n}){return r.length?i("div",{className:"predictive-search-result",children:[t("h5",{children:"Articles"}),t("ul",{children:r.map(o=>{var s;const a=R({baseUrl:`/blogs/${o.blog.handle}/${o.handle}`,trackingParams:o.trackingParameters,term:e.current??""});return t("li",{className:"predictive-search-result-item",children:i(f,{onClick:n,to:a,children:[((s=o.image)==null?void 0:s.url)&&t(w,{alt:o.image.altText??"",src:o.image.url,width:50,height:50}),t("div",{children:t("span",{children:o.title})})]})},o.id)})})]},"articles"):null}function Pt({term:e,collections:r,closeSearch:n}){return r.length?i("div",{className:"predictive-search-result",children:[t("h5",{children:"Collections"}),t("ul",{children:r.map(o=>{var s;const a=R({baseUrl:`/collections/${o.handle}`,trackingParams:o.trackingParameters,term:e.current});return t("li",{className:"predictive-search-result-item",children:i(f,{onClick:n,to:a,children:[((s=o.image)==null?void 0:s.url)&&t(w,{alt:o.image.altText??"",src:o.image.url,width:50,height:50}),t("div",{children:t("span",{children:o.title})})]})},o.id)})})]},"collections"):null}function St({term:e,pages:r,closeSearch:n}){return r.length?i("div",{className:"predictive-search-result",children:[t("h5",{children:"Pages"}),t("ul",{children:r.map(o=>{const a=R({baseUrl:`/pages/${o.handle}`,trackingParams:o.trackingParameters,term:e.current});return t("li",{className:"predictive-search-result-item",children:t(f,{onClick:n,to:a,children:t("div",{children:t("span",{children:o.title})})})},o.id)})})]},"pages"):null}function At({term:e,products:r,closeSearch:n}){return r.length?i("div",{className:"predictive-search-result",children:[t("h5",{children:"Products"}),t("ul",{children:r.map(o=>{var c,d;const a=R({baseUrl:`/products/${o.handle}`,trackingParams:o.trackingParameters,term:e.current}),s=(c=o==null?void 0:o.selectedOrFirstAvailableVariant)==null?void 0:c.price,l=(d=o==null?void 0:o.selectedOrFirstAvailableVariant)==null?void 0:d.image;return t("li",{className:"predictive-search-result-item",children:i(f,{to:a,onClick:n,children:[l&&t(w,{alt:l.altText??"",src:l.url,width:50,height:50}),i("div",{children:[t("p",{children:o.title}),t("small",{children:s&&t(A,{data:s})})]})]})},o.id)})})]},"products"):null}function _t({queries:e,queriesDatalistId:r}){return e.length?t("datalist",{id:r,children:e.map(n=>n?t("option",{value:n.text},n.text):null)}):null}function wt({term:e}){return e.current?i("p",{children:["No results found for ",t("q",{children:e.current})]}):null}function It(){var s,l;const e=oe({key:"search"}),r=L(""),n=L(null);(e==null?void 0:e.state)==="loading"&&(r.current=String(((s=e.formData)==null?void 0:s.get("q"))||"")),Q(()=>{n.current||(n.current=document.querySelector('input[type="search"]'))},[]);const{items:o,total:a}=((l=e==null?void 0:e.data)==null?void 0:l.result)??ve();return{items:o,total:a,inputRef:n,term:r,fetcher:e}}function Dt({cart:e,children:r=null,footer:n,header:o,isLoggedIn:a,publicStoreDomain:s}){return i(q.Provider,{children:[t(Et,{cart:e}),t(xt,{}),t(Nt,{header:o,publicStoreDomain:s}),o&&t(ot,{header:o,cart:e,isLoggedIn:a,publicStoreDomain:s}),t("main",{children:r}),t(et,{footer:n,header:o,publicStoreDomain:s})]})}function Et({cart:e}){return t(q,{type:"cart",heading:"CART",children:t(F,{fallback:t("p",{children:"Loading cart ..."}),children:t(U,{resolve:e,children:r=>t(be,{cart:r,layout:"aside"})})})})}function xt(){const e=Ke();return t(q,{type:"search",heading:"SEARCH",children:i("div",{className:"predictive-search",children:[t("br",{}),t(vt,{children:({fetchResults:r,goToSearch:n,inputRef:o})=>i(M,{children:[t("input",{name:"q",onChange:r,onFocus:r,placeholder:"Search",ref:o,type:"search",list:e})," ",t("button",{onClick:n,children:"Search"})]})}),t(_,{children:({items:r,total:n,term:o,state:a,closeSearch:s})=>{const{articles:l,collections:c,pages:d,products:u,queries:h}=r;return a==="loading"&&o.current?t("div",{children:"Loading..."}):n?i(M,{children:[t(_.Queries,{queries:h,queriesDatalistId:e}),t(_.Products,{products:u,closeSearch:s,term:o}),t(_.Collections,{collections:c,closeSearch:s,term:o}),t(_.Pages,{pages:d,closeSearch:s,term:o}),t(_.Articles,{articles:l,closeSearch:s,term:o}),o.current&&n?t(f,{onClick:s,to:`${Z}?q=${o.current}`,children:i("p",{children:["View all results for ",t("q",{children:o.current}),"  →"]})}):null]}):t(_.Empty,{term:o})}})]})})}function Nt({header:e,publicStoreDomain:r}){var n;return e.menu&&((n=e.shop.primaryDomain)==null?void 0:n.url)&&t(q,{type:"mobile",heading:"MENU",children:t(pe,{menu:e.menu,viewport:"mobile",primaryDomainUrl:e.shop.primaryDomain.url,publicStoreDomain:r})})}const Ot=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}],Tt=({formMethod:e,currentUrl:r,nextUrl:n})=>!!(e&&e!=="GET"||r.toString()===n.toString());async function Rt(e){const r=jt(e),n=await Lt(e),{storefront:o,env:a}=e.context;return{...r,...n,publicStoreDomain:a.PUBLIC_STORE_DOMAIN,shop:Le({storefront:o,publicStorefrontId:a.PUBLIC_STOREFRONT_ID}),consent:{checkoutDomain:a.PUBLIC_CHECKOUT_DOMAIN,storefrontAccessToken:a.PUBLIC_STOREFRONT_API_TOKEN,withPrivacyBanner:!1,country:e.context.storefront.i18n.country,language:e.context.storefront.i18n.language}}}async function Lt({context:e}){const{storefront:r}=e,[n]=await Promise.all([r.query(Xe,{cache:r.CacheLong(),variables:{headerMenuHandle:"main-menu"}})]);return{header:n}}function jt({context:e}){const{storefront:r,customerAccount:n,cart:o}=e,a=r.query(Je,{cache:r.CacheLong(),variables:{footerMenuHandle:"footer"}}).catch(s=>(console.error(s),null));return{cart:o.get(),isLoggedIn:n.isLoggedIn(),footer:a}}function Mt({children:e}){const r=je(),n=Ie("root");return i("html",{lang:"en",children:[i("head",{children:[t("meta",{charSet:"utf-8"}),t("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t(De,{}),t(Ee,{})]}),i("body",{children:[n?t(G.Provider,{cart:n.cart,shop:n.shop,consent:n.consent,children:t(Dt,{...n,children:e})}):e,t(xe,{nonce:r}),t(Ne,{nonce:r})]})]})}function Ut(){return t(se,{})}const Ft=Object.freeze(Object.defineProperty({__proto__:null,Layout:Mt,default:Ut,links:Ot,loader:Rt,shouldRevalidate:Tt},Symbol.toStringTag,{value:"Module"}));function k(e,...r){const n=new URL(e.url);let o=!1;if(r.forEach(({handle:a,data:s})=>{a!==s.handle&&(n.pathname=n.pathname.replace(a,s.handle),o=!0)}),o)throw D(n.toString())}const qt=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.article.title)??""} article`}];async function kt(e){const r=Bt(e),n=await Ht(e);return{...r,...n}}async function Ht({context:e,request:r,params:n}){const{blogHandle:o,articleHandle:a}=n;if(!a||!o)throw new Response("Not found",{status:404});const[{blog:s}]=await Promise.all([e.storefront.query(Vt,{variables:{blogHandle:o,articleHandle:a}})]);if(!(s!=null&&s.articleByHandle))throw new Response(null,{status:404});return k(r,{handle:a,data:s.articleByHandle},{handle:o,data:s}),{article:s.articleByHandle}}function Bt({context:e}){return{}}function zt(){const{article:e}=v(),{title:r,image:n,contentHtml:o,author:a}=e,s=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e.publishedAt));return i("div",{className:"article",children:[i("h1",{children:[r,i("div",{children:[t("time",{dateTime:e.publishedAt,children:s})," ·"," ",t("address",{children:a==null?void 0:a.name})]})]}),n&&t(w,{data:n,sizes:"90vw",loading:"eager"}),t("div",{dangerouslySetInnerHTML:{__html:o},className:"article"})]})}const Vt=`#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`,Yt=Object.freeze(Object.defineProperty({__proto__:null,default:zt,loader:kt,meta:qt},Symbol.toStringTag,{value:"Module"}));async function Gt({request:e,params:r,context:{storefront:n}}){const o=await Me({storefront:n,request:e,params:r,locales:["EN-US","EN-CA","FR-CA"],getLink:({type:a,baseUrl:s,handle:l,locale:c})=>c?`${s}/${c}/${a}/${l}`:`${s}/${a}/${l}`});return o.headers.set("Cache-Control",`max-age=${60*60*24}`),o}const Qt=Object.freeze(Object.defineProperty({__proto__:null,loader:Gt},Symbol.toStringTag,{value:"Module"}));function j({connection:e,children:r,resourcesClassName:n}){return t(ue,{connection:e,children:({nodes:o,isLoading:a,PreviousLink:s,NextLink:l})=>{const c=o.map((d,u)=>r({node:d,index:u}));return i("div",{children:[t(s,{children:a?"Loading...":t("span",{children:"↑ Load previous"})}),n?t("div",{className:n,children:c}):c,t(l,{children:a?"Loading...":t("span",{children:"Load more ↓"})})]})}})}const Kt=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.blog.title)??""} blog`}];async function Zt(e){const r=Xt(e),n=await Wt(e);return{...r,...n}}async function Wt({context:e,request:r,params:n}){const o=T(r,{pageBy:4});if(!n.blogHandle)throw new Response("blog not found",{status:404});const[{blog:a}]=await Promise.all([e.storefront.query(tr,{variables:{blogHandle:n.blogHandle,...o}})]);if(!(a!=null&&a.articles))throw new Response("Not found",{status:404});return k(r,{handle:n.blogHandle,data:a}),{blog:a}}function Xt({context:e}){return{}}function Jt(){const{blog:e}=v(),{articles:r}=e;return i("div",{className:"blog",children:[t("h1",{children:e.title}),t("div",{className:"blog-grid",children:t(j,{connection:r,children:({node:n,index:o})=>t(er,{article:n,loading:o<2?"eager":"lazy"},n.id)})})]})}function er({article:e,loading:r}){const n=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e.publishedAt));return t("div",{className:"blog-article",children:i(f,{to:`/blogs/${e.blog.handle}/${e.handle}`,children:[e.image&&t("div",{className:"blog-article-image",children:t(w,{alt:e.image.altText||e.title,aspectRatio:"3/2",data:e.image,loading:r,sizes:"(min-width: 768px) 50vw, 100vw"})}),t("h3",{children:e.title}),t("small",{children:n})]})},e.id)}const tr=`#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`,rr=Object.freeze(Object.defineProperty({__proto__:null,default:Jt,loader:Zt,meta:Kt},Symbol.toStringTag,{value:"Module"}));function W({product:e,loading:r}){const n=ge(e.handle),o=e.featuredImage;return i(f,{className:"product-item",prefetch:"intent",to:n,children:[o&&t(w,{alt:o.altText||e.title,aspectRatio:"1/1",data:o,loading:r,sizes:"(min-width: 45em) 400px, 100vw"}),t("h4",{children:e.title}),t("small",{children:t(A,{data:e.priceRange.minVariantPrice})})]},e.id)}const nr=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.collection.title)??""} Collection`}];async function or(e){const r=sr(e),n=await ar(e);return{...r,...n}}async function ar({context:e,params:r,request:n}){const{handle:o}=r,{storefront:a}=e,s=T(n,{pageBy:8});if(!o)throw D("/collections");const[{collection:l}]=await Promise.all([a.query(cr,{variables:{handle:o,...s}})]);if(!l)throw new Response(`Collection ${o} not found`,{status:404});return k(n,{handle:o,data:l}),{collection:l}}function sr({context:e}){return{}}function ir(){const{collection:e}=v();return i("div",{className:"collection",children:[t("h1",{children:e.title}),t("p",{className:"collection-description",children:e.description}),t(j,{connection:e.products,resourcesClassName:"products-grid",children:({node:r,index:n})=>t(W,{product:r,loading:n<8?"eager":void 0},r.id)}),t(G.CollectionView,{data:{collection:{id:e.id,handle:e.handle}}})]})}const lr=`#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
`,cr=`#graphql
  ${lr}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`,dr=Object.freeze(Object.defineProperty({__proto__:null,default:ir,loader:or,meta:nr},Symbol.toStringTag,{value:"Module"}));async function ur({context:e}){return e.customerAccount.authorize()}const hr=Object.freeze(Object.defineProperty({__proto__:null,loader:ur},Symbol.toStringTag,{value:"Module"}));async function mr(e){const r=fr(e),n=await pr(e);return{...r,...n}}async function pr({context:e,request:r}){const n=T(r,{pageBy:4}),[{collections:o}]=await Promise.all([e.storefront.query(Cr,{variables:n})]);return{collections:o}}function fr({context:e}){return{}}function gr(){const{collections:e}=v();return i("div",{className:"collections",children:[t("h1",{children:"Collections"}),t(j,{connection:e,resourcesClassName:"collections-grid",children:({node:r,index:n})=>t(yr,{collection:r,index:n},r.id)})]})}function yr({collection:e,index:r}){return i(f,{className:"collection-item",to:`/collections/${e.handle}`,prefetch:"intent",children:[(e==null?void 0:e.image)&&t(w,{alt:e.image.altText||e.title,aspectRatio:"1/1",data:e.image,loading:r<3?"eager":void 0,sizes:"(min-width: 45em) 400px, 100vw"}),t("h5",{children:e.title})]},e.id)}const Cr=`#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`,br=Object.freeze(Object.defineProperty({__proto__:null,default:gr,loader:mr},Symbol.toStringTag,{value:"Module"})),vr=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.policy.title)??""}`}];async function $r({params:e,context:r}){var s,l;if(!e.handle)throw new Response("No handle was passed in",{status:404});const n=e.handle.replace(/-([a-z])/g,(c,d)=>d.toUpperCase()),a=(l=(await r.storefront.query(Sr,{variables:{privacyPolicy:!1,shippingPolicy:!1,termsOfService:!1,refundPolicy:!1,[n]:!0,language:(s=r.storefront.i18n)==null?void 0:s.language}})).shop)==null?void 0:l[n];if(!a)throw new Response("Could not find the policy",{status:404});return{policy:a}}function Pr(){const{policy:e}=v();return i("div",{className:"policy",children:[t("br",{}),t("br",{}),t("div",{children:t(f,{to:"/policies",children:"← Back to Policies"})}),t("br",{}),t("h1",{children:e.title}),t("div",{dangerouslySetInnerHTML:{__html:e.body}})]})}const Sr=`#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`,Ar=Object.freeze(Object.defineProperty({__proto__:null,default:Pr,loader:$r,meta:vr},Symbol.toStringTag,{value:"Module"}));function _r({image:e}){return e?t("div",{className:"product-image",children:t(w,{alt:e.altText||"Product Image",aspectRatio:"1/1",data:e,sizes:"(min-width: 45em) 50vw, 100vw"},e.id)}):t("div",{className:"product-image"})}function wr({analytics:e,children:r,disabled:n,lines:o,onClick:a}){return t(y,{route:"/cart",inputs:{lines:o},action:y.ACTIONS.LinesAdd,children:s=>i(M,{children:[t("input",{name:"analytics",type:"hidden",value:JSON.stringify(e)}),t("button",{type:"submit",onClick:a,disabled:n??s.state!=="idle",children:r})]})})}function Ir({productOptions:e,selectedVariant:r}){const n=ae(),{open:o}=E();return i("div",{className:"product-form",children:[e.map(a=>a.optionValues.length===1?null:i("div",{className:"product-options",children:[t("h5",{children:a.name}),t("div",{className:"product-options-grid",children:a.optionValues.map(s=>{const{name:l,handle:c,variantUriQuery:d,selected:u,available:h,exists:p,isDifferentProduct:g,swatch:$}=s;return g?t(f,{className:"product-options-item",prefetch:"intent",preventScrollReset:!0,replace:!0,to:`/products/${c}?${d}`,style:{border:u?"1px solid black":"1px solid transparent",opacity:h?1:.3},children:t(ne,{swatch:$,name:l})},a.name+l):t("button",{type:"button",className:`product-options-item${p&&!u?" link":""}`,style:{border:u?"1px solid black":"1px solid transparent",opacity:h?1:.3},disabled:!p,onClick:()=>{u||n(`?${d}`,{replace:!0,preventScrollReset:!0})},children:t(ne,{swatch:$,name:l})},a.name+l)})}),t("br",{})]},a.name)),t(wr,{disabled:!r||!r.availableForSale,onClick:()=>{o("cart")},lines:r?[{merchandiseId:r.id,quantity:1,selectedVariant:r}]:[],children:r!=null&&r.availableForSale?"Add to cart":"Sold out"})]})}function ne({swatch:e,name:r}){var a,s;const n=(s=(a=e==null?void 0:e.image)==null?void 0:a.previewImage)==null?void 0:s.url,o=e==null?void 0:e.color;return!n&&!o?r:t("div",{"aria-label":r,className:"product-option-label-swatch",style:{backgroundColor:o||"transparent"},children:!!n&&t("img",{src:n,alt:r})})}const Dr=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.product.title)??""}`},{rel:"canonical",href:`/products/${e==null?void 0:e.product.handle}`}];async function Er(e){const r=Nr(e),n=await xr(e);return{...r,...n}}async function xr({context:e,params:r,request:n}){const{handle:o}=r,{storefront:a}=e;if(!o)throw new Error("Expected product handle to be defined");const[{product:s}]=await Promise.all([a.query(Lr,{variables:{handle:o,selectedOptions:He(n)}})]);if(!(s!=null&&s.id))throw new Response(null,{status:404});return k(n,{handle:o,data:s}),{product:s}}function Nr({context:e,params:r}){return{}}function Or(){const{product:e}=v(),r=Ue(e.selectedOrFirstAvailableVariant,Fe(e));qe(r.selectedOptions);const n=ke({...e,selectedOrFirstAvailableVariant:r}),{title:o,descriptionHtml:a}=e;return i("div",{className:"product",children:[t(_r,{image:r==null?void 0:r.image}),i("div",{className:"product-main",children:[t("h1",{children:o}),t(ye,{price:r==null?void 0:r.price,compareAtPrice:r==null?void 0:r.compareAtPrice}),t("br",{}),t(Ir,{productOptions:n,selectedVariant:r}),t("br",{}),t("br",{}),t("p",{children:t("strong",{children:"Description"})}),t("br",{}),t("div",{dangerouslySetInnerHTML:{__html:a}}),t("br",{})]}),t(G.ProductView,{data:{products:[{id:e.id,title:e.title,price:(r==null?void 0:r.price.amount)||"0",vendor:e.vendor,variantId:(r==null?void 0:r.id)||"",variantTitle:(r==null?void 0:r.title)||"",quantity:1}]}})]})}const Tr=`#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`,Rr=`#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${Tr}
`,Lr=`#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${Rr}
`,jr=Object.freeze(Object.defineProperty({__proto__:null,default:Or,loader:Er,meta:Dr},Symbol.toStringTag,{value:"Module"}));async function Mr(){return D("/")}async function Ur({context:e}){return e.customerAccount.logout()}const Fr=Object.freeze(Object.defineProperty({__proto__:null,action:Ur,loader:Mr},Symbol.toStringTag,{value:"Module"})),qr=()=>[{title:"Hydrogen | Products"}];async function kr(e){const r=Br(e),n=await Hr(e);return{...r,...n}}async function Hr({context:e,request:r}){const{storefront:n}=e,o=T(r,{pageBy:8}),[{products:a}]=await Promise.all([n.query(Yr,{variables:{...o}})]);return{products:a}}function Br({context:e}){return{}}function zr(){const{products:e}=v();return i("div",{className:"collection",children:[t("h1",{children:"Products"}),t(j,{connection:e,resourcesClassName:"products-grid",children:({node:r,index:n})=>t(W,{product:r,loading:n<8?"eager":void 0},r.id)})]})}const Vr=`#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
`,Yr=`#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${Vr}
`,Gr=Object.freeze(Object.defineProperty({__proto__:null,default:zr,loader:kr,meta:qr},Symbol.toStringTag,{value:"Module"}));async function Qr({context:e}){const r=await e.storefront.query(Zr),n=Object.values(r.shop||{});if(!n.length)throw new Response("No policies found",{status:404});return{policies:n}}function Kr(){const{policies:e}=v();return i("div",{className:"policies",children:[t("h1",{children:"Policies"}),t("div",{children:e.map(r=>r?t("fieldset",{children:t(f,{to:`/policies/${r.handle}`,children:r.title})},r.id):null)})]})}const Zr=`#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`,Wr=Object.freeze(Object.defineProperty({__proto__:null,default:Kr,loader:Qr},Symbol.toStringTag,{value:"Module"}));async function Xr({request:e,context:r}){return r.customerAccount.login()}const Jr=Object.freeze(Object.defineProperty({__proto__:null,loader:Xr},Symbol.toStringTag,{value:"Module"}));async function en({request:e,context:r,params:n}){const{cart:o}=r,{code:a}=n,s=new URL(e.url),l=new URLSearchParams(s.search);let c=l.get("redirect")||l.get("return_to")||"/";c.includes("//")&&(c="/"),l.delete("redirect"),l.delete("return_to");const d=`${c}?${l}`;if(!a)return D(d);const u=await o.updateDiscountCodes([a]),h=o.setCartId(u.cart.id);return D(d,{status:303,headers:h})}const tn=Object.freeze(Object.defineProperty({__proto__:null,loader:en},Symbol.toStringTag,{value:"Module"}));async function rn({request:e,context:{storefront:r}}){const n=await Be({storefront:r,request:e});return n.headers.set("Cache-Control",`max-age=${60*60*24}`),n}const nn=Object.freeze(Object.defineProperty({__proto__:null,loader:rn},Symbol.toStringTag,{value:"Module"})),on=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.page.title)??""}`}];async function an(e){const r=ln(e),n=await sn(e);return{...r,...n}}async function sn({context:e,request:r,params:n}){if(!n.handle)throw new Error("Missing page handle");const[{page:o}]=await Promise.all([e.storefront.query(dn,{variables:{handle:n.handle}})]);if(!o)throw new Response("Not Found",{status:404});return k(r,{handle:n.handle,data:o}),{page:o}}function ln({context:e}){return{}}function cn(){const{page:e}=v();return i("div",{className:"page",children:[t("header",{children:t("h1",{children:e.title})}),t("main",{dangerouslySetInnerHTML:{__html:e.body}})]})}const dn=`#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`,un=Object.freeze(Object.defineProperty({__proto__:null,default:cn,loader:an,meta:on},Symbol.toStringTag,{value:"Module"}));async function hn({request:e,context:r}){const n=new URL(e.url),{shop:o}=await r.storefront.query(pn),a=ze(o.id).id,s=mn({url:n.origin,shopId:a});return new Response(s,{status:200,headers:{"Content-Type":"text/plain","Cache-Control":`max-age=${60*60*24}`}})}function mn({url:e,shopId:r}){const n=e?`${e}/sitemap.xml`:void 0;return`
User-agent: *
${K({sitemapUrl:n,shopId:r})}

# Google adsbot ignores robots.txt unless specifically named!
User-agent: adsbot-google
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /orders
${r?`Disallow: /${r}/checkouts`:""}
${r?`Disallow: /${r}/orders`:""}
Disallow: /*?*oseid=*
Disallow: /*preview_theme_id*
Disallow: /*preview_script_id*

User-agent: Nutch
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10
${K({sitemapUrl:n,shopId:r})}

User-agent: AhrefsSiteAudit
Crawl-delay: 10
${K({sitemapUrl:n,shopId:r})}

User-agent: MJ12bot
Crawl-Delay: 10

User-agent: Pinterest
Crawl-delay: 1
`.trim()}function K({shopId:e,sitemapUrl:r}){return`Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
${e?`Disallow: /${e}/checkouts`:""}
${e?`Disallow: /${e}/orders`:""}
Disallow: /carts
Disallow: /account
Disallow: /collections/*sort_by*
Disallow: /*/collections/*sort_by*
Disallow: /collections/*+*
Disallow: /collections/*%2B*
Disallow: /collections/*%2b*
Disallow: /*/collections/*+*
Disallow: /*/collections/*%2B*
Disallow: /*/collections/*%2b*
Disallow: */collections/*filter*&*filter*
Disallow: /blogs/*+*
Disallow: /blogs/*%2B*
Disallow: /blogs/*%2b*
Disallow: /*/blogs/*+*
Disallow: /*/blogs/*%2B*
Disallow: /*/blogs/*%2b*
Disallow: /*?*oseid=*
Disallow: /*preview_theme_id*
Disallow: /*preview_script_id*
Disallow: /policies/
Disallow: /*/*?*ls=*&ls=*
Disallow: /*/*?*ls%3D*%3Fls%3D*
Disallow: /*/*?*ls%3d*%3fls%3d*
Disallow: /search
Allow: /search/
Disallow: /search/?*
Disallow: /apple-app-site-association
Disallow: /.well-known/shopify/monorail
${r?`Sitemap: ${r}`:""}`}const pn=`#graphql
  query StoreRobots($country: CountryCode, $language: LanguageCode)
   @inContext(country: $country, language: $language) {
    shop {
      id
    }
  }
`,fn=Object.freeze(Object.defineProperty({__proto__:null,loader:hn},Symbol.toStringTag,{value:"Module"})),gn=()=>[{title:"Hydrogen | Blogs"}];async function yn(e){const r=bn(e),n=await Cn(e);return{...r,...n}}async function Cn({context:e,request:r}){const n=T(r,{pageBy:10}),[{blogs:o}]=await Promise.all([e.storefront.query($n,{variables:{...n}})]);return{blogs:o}}function bn({context:e}){return{}}function vn(){const{blogs:e}=v();return i("div",{className:"blogs",children:[t("h1",{children:"Blogs"}),t("div",{className:"blogs-grid",children:t(j,{connection:e,children:({node:r})=>t(f,{className:"blog",prefetch:"intent",to:`/blogs/${r.handle}`,children:t("h2",{children:r.title})},r.handle)})})]})}const $n=`#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
      }
    }
  }
`,Pn=Object.freeze(Object.defineProperty({__proto__:null,default:vn,loader:yn,meta:gn},Symbol.toStringTag,{value:"Module"})),Sn=`#graphql
  fragment Customer on Customer {
    id
    firstName
    lastName
    defaultAddress {
      ...Address
    }
    addresses(first: 6) {
      nodes {
        ...Address
      }
    }
  }
  fragment Address on CustomerAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    territoryCode
    zoneCode
    city
    zip
    phoneNumber
  }
`,An=`#graphql
  query CustomerDetails {
    customer {
      ...Customer
    }
  }
  ${Sn}
`;function _n(){return!0}async function wn({context:e}){const{data:r,errors:n}=await e.customerAccount.query(An);if(n!=null&&n.length||!(r!=null&&r.customer))throw new Error("Customer not found");return S({customer:r.customer},{headers:{"Cache-Control":"no-cache, no-store, must-revalidate"}})}function In(){const{customer:e}=v(),r=e?e.firstName?`Welcome, ${e.firstName}`:"Welcome to your account.":"Account Details";return i("div",{className:"account",children:[t("h1",{children:r}),t("br",{}),t(Dn,{}),t("br",{}),t("br",{}),t(se,{context:{customer:e}})]})}function Dn(){function e({isActive:r,isPending:n}){return{fontWeight:r?"bold":void 0,color:n?"grey":"black"}}return i("nav",{role:"navigation",children:[t(N,{to:"/account/orders",style:e,children:"Orders  "})," | ",t(N,{to:"/account/profile",style:e,children:"  Profile  "})," | ",t(N,{to:"/account/addresses",style:e,children:"  Addresses  "})," | ",t(En,{})]})}function En(){return i(Y,{className:"account-logout",method:"POST",action:"/account/logout",children:[" ",t("button",{type:"submit",children:"Sign out"})]})}const xn=Object.freeze(Object.defineProperty({__proto__:null,default:In,loader:wn,shouldRevalidate:_n},Symbol.toStringTag,{value:"Module"})),Nn=`#graphql
  fragment OrderItem on Order {
    totalPrice {
      amount
      currencyCode
    }
    financialStatus
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    id
    number
    processedAt
  }
`,On=`#graphql
  fragment CustomerOrders on Customer {
    orders(
      sortKey: PROCESSED_AT,
      reverse: true,
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...OrderItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
  ${Nn}
`,Tn=`#graphql
  ${On}
  query CustomerOrders(
    $endCursor: String
    $first: Int
    $last: Int
    $startCursor: String
  ) {
    customer {
      ...CustomerOrders
    }
  }
`,Rn=()=>[{title:"Orders"}];async function Ln({request:e,context:r}){const n=T(e,{pageBy:20}),{data:o,errors:a}=await r.customerAccount.query(Tn,{variables:{...n}});if(a!=null&&a.length||!(o!=null&&o.customer))throw Error("Customer orders not found");return{customer:o.customer}}function jn(){const{customer:e}=v(),{orders:r}=e;return t("div",{className:"orders",children:r.nodes.length?t(Mn,{orders:r}):t($e,{})})}function Mn({orders:e}){return t("div",{className:"acccount-orders",children:e!=null&&e.nodes.length?t(j,{connection:e,children:({node:r})=>t(Un,{order:r},r.id)}):t($e,{})})}function $e(){return i("div",{children:[t("p",{children:"You haven't placed any orders yet."}),t("br",{}),t("p",{children:t(f,{to:"/collections",children:"Start Shopping →"})})]})}function Un({order:e}){var n;const r=(n=z(e.fulfillments)[0])==null?void 0:n.status;return i(M,{children:[i("fieldset",{children:[t(f,{to:`/account/orders/${btoa(e.id)}`,children:i("strong",{children:["#",e.number]})}),t("p",{children:new Date(e.processedAt).toDateString()}),t("p",{children:e.financialStatus}),r&&t("p",{children:r}),t(A,{data:e.totalPrice}),t(f,{to:`/account/orders/${btoa(e.id)}`,children:"View Order →"})]}),t("br",{})]})}const Fn=Object.freeze(Object.defineProperty({__proto__:null,default:jn,loader:Ln,meta:Rn},Symbol.toStringTag,{value:"Module"})),qn=`#graphql
  fragment OrderMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment DiscountApplication on DiscountApplication {
    value {
      __typename
      ... on MoneyV2 {
        ...OrderMoney
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }
  fragment OrderLineItemFull on LineItem {
    id
    title
    quantity
    price {
      ...OrderMoney
    }
    discountAllocations {
      allocatedAmount {
        ...OrderMoney
      }
      discountApplication {
        ...DiscountApplication
      }
    }
    totalDiscount {
      ...OrderMoney
    }
    image {
      altText
      height
      url
      id
      width
    }
    variantTitle
  }
  fragment Order on Order {
    id
    name
    statusPageUrl
    processedAt
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    totalTax {
      ...OrderMoney
    }
    totalPrice {
      ...OrderMoney
    }
    subtotal {
      ...OrderMoney
    }
    shippingAddress {
      name
      formatted(withName: true)
      formattedArea
    }
    discountApplications(first: 100) {
      nodes {
        ...DiscountApplication
      }
    }
    lineItems(first: 100) {
      nodes {
        ...OrderLineItemFull
      }
    }
  }
  query Order($orderId: ID!) {
    order(id: $orderId) {
      ... on Order {
        ...Order
      }
    }
  }
`,kn=({data:e})=>{var r;return[{title:`Order ${(r=e==null?void 0:e.order)==null?void 0:r.name}`}]};async function Hn({params:e,context:r}){var g,$;if(!e.id)return D("/account/orders");const n=atob(e.id),{data:o,errors:a}=await r.customerAccount.query(qn,{variables:{orderId:n}});if(a!=null&&a.length||!(o!=null&&o.order))throw new Error("Order not found");const{order:s}=o,l=z(s.lineItems),c=z(s.discountApplications),d=((g=z(s.fulfillments)[0])==null?void 0:g.status)??"N/A",u=($=c[0])==null?void 0:$.value,h=(u==null?void 0:u.__typename)==="MoneyV2"&&u,p=(u==null?void 0:u.__typename)==="PricingPercentageValue"&&(u==null?void 0:u.percentage);return{order:s,lineItems:l,discountValue:h,discountPercentage:p,fulfillmentStatus:d}}function Bn(){const{order:e,lineItems:r,discountValue:n,discountPercentage:o,fulfillmentStatus:a}=v();return i("div",{className:"account-order",children:[i("h2",{children:["Order ",e.name]}),i("p",{children:["Placed on ",new Date(e.processedAt).toDateString()]}),t("br",{}),i("div",{children:[i("table",{children:[t("thead",{children:i("tr",{children:[t("th",{scope:"col",children:"Product"}),t("th",{scope:"col",children:"Price"}),t("th",{scope:"col",children:"Quantity"}),t("th",{scope:"col",children:"Total"})]})}),t("tbody",{children:r.map((s,l)=>t(zn,{lineItem:s},l))}),i("tfoot",{children:[(n&&n.amount||o)&&i("tr",{children:[t("th",{scope:"row",colSpan:3,children:t("p",{children:"Discounts"})}),t("th",{scope:"row",children:t("p",{children:"Discounts"})}),t("td",{children:o?i("span",{children:["-",o,"% OFF"]}):n&&t(A,{data:n})})]}),i("tr",{children:[t("th",{scope:"row",colSpan:3,children:t("p",{children:"Subtotal"})}),t("th",{scope:"row",children:t("p",{children:"Subtotal"})}),t("td",{children:t(A,{data:e.subtotal})})]}),i("tr",{children:[t("th",{scope:"row",colSpan:3,children:"Tax"}),t("th",{scope:"row",children:t("p",{children:"Tax"})}),t("td",{children:t(A,{data:e.totalTax})})]}),i("tr",{children:[t("th",{scope:"row",colSpan:3,children:"Total"}),t("th",{scope:"row",children:t("p",{children:"Total"})}),t("td",{children:t(A,{data:e.totalPrice})})]})]})]}),i("div",{children:[t("h3",{children:"Shipping Address"}),e!=null&&e.shippingAddress?i("address",{children:[t("p",{children:e.shippingAddress.name}),e.shippingAddress.formatted?t("p",{children:e.shippingAddress.formatted}):"",e.shippingAddress.formattedArea?t("p",{children:e.shippingAddress.formattedArea}):""]}):t("p",{children:"No shipping address defined"}),t("h3",{children:"Status"}),t("div",{children:t("p",{children:a})})]})]}),t("br",{}),t("p",{children:t("a",{target:"_blank",href:e.statusPageUrl,rel:"noreferrer",children:"View Order Status →"})})]})}function zn({lineItem:e}){return i("tr",{children:[t("td",{children:i("div",{children:[(e==null?void 0:e.image)&&t("div",{children:t(w,{data:e.image,width:96,height:96})}),i("div",{children:[t("p",{children:e.title}),t("small",{children:e.variantTitle})]})]})}),t("td",{children:t(A,{data:e.price})}),t("td",{children:e.quantity}),t("td",{children:t(A,{data:e.totalDiscount})})]},e.id)}const Vn=Object.freeze(Object.defineProperty({__proto__:null,default:Bn,loader:Hn,meta:kn},Symbol.toStringTag,{value:"Module"})),Yn=`#graphql
  mutation customerAddressUpdate(
    $address: CustomerAddressInput!
    $addressId: ID!
    $defaultAddress: Boolean
 ) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`,Gn=`#graphql
  mutation customerAddressDelete(
    $addressId: ID!,
  ) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        code
        field
        message
      }
    }
  }
`,Qn=`#graphql
  mutation customerAddressCreate(
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
  ) {
    customerAddressCreate(
      address: $address
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`,Kn=()=>[{title:"Addresses"}];async function Zn({context:e}){return await e.customerAccount.handleAuthStatus(),{}}async function Wn({request:e,context:r}){var o,a,s,l,c,d,u,h,p,g,$,O,I;const{customerAccount:n}=r;try{const C=await e.formData(),P=C.has("addressId")?String(C.get("addressId")):null;if(!P)throw new Error("You must provide an address id.");if(!await n.isLoggedIn())return S({error:{[P]:"Unauthorized"}},{status:401});const H=C.has("defaultAddress")?String(C.get("defaultAddress"))==="on":!1,B={},Se=["address1","address2","city","company","territoryCode","firstName","lastName","phoneNumber","zoneCode","zip"];for(const m of Se){const b=C.get(m);typeof b=="string"&&(B[m]=b)}switch(e.method){case"POST":try{const{data:m,errors:b}=await n.mutate(Qn,{variables:{address:B,defaultAddress:H}});if(b!=null&&b.length)throw new Error(b[0].message);if((a=(o=m==null?void 0:m.customerAddressCreate)==null?void 0:o.userErrors)!=null&&a.length)throw new Error((s=m==null?void 0:m.customerAddressCreate)==null?void 0:s.userErrors[0].message);if(!((l=m==null?void 0:m.customerAddressCreate)!=null&&l.customerAddress))throw new Error("Customer address create failed.");return{error:null,createdAddress:(c=m==null?void 0:m.customerAddressCreate)==null?void 0:c.customerAddress,defaultAddress:H}}catch(m){return m instanceof Error?S({error:{[P]:m.message}},{status:400}):S({error:{[P]:m}},{status:400})}case"PUT":try{const{data:m,errors:b}=await n.mutate(Yn,{variables:{address:B,addressId:decodeURIComponent(P),defaultAddress:H}});if(b!=null&&b.length)throw new Error(b[0].message);if((u=(d=m==null?void 0:m.customerAddressUpdate)==null?void 0:d.userErrors)!=null&&u.length)throw new Error((h=m==null?void 0:m.customerAddressUpdate)==null?void 0:h.userErrors[0].message);if(!((p=m==null?void 0:m.customerAddressUpdate)!=null&&p.customerAddress))throw new Error("Customer address update failed.");return{error:null,updatedAddress:B,defaultAddress:H}}catch(m){return m instanceof Error?S({error:{[P]:m.message}},{status:400}):S({error:{[P]:m}},{status:400})}case"DELETE":try{const{data:m,errors:b}=await n.mutate(Gn,{variables:{addressId:decodeURIComponent(P)}});if(b!=null&&b.length)throw new Error(b[0].message);if(($=(g=m==null?void 0:m.customerAddressDelete)==null?void 0:g.userErrors)!=null&&$.length)throw new Error((O=m==null?void 0:m.customerAddressDelete)==null?void 0:O.userErrors[0].message);if(!((I=m==null?void 0:m.customerAddressDelete)!=null&&I.deletedAddressId))throw new Error("Customer address delete failed.");return{error:null,deletedAddress:P}}catch(m){return m instanceof Error?S({error:{[P]:m.message}},{status:400}):S({error:{[P]:m}},{status:400})}default:return S({error:{[P]:"Method not allowed"}},{status:405})}}catch(C){return C instanceof Error?S({error:C.message},{status:400}):S({error:C},{status:400})}}function Xn(){const{customer:e}=ie(),{defaultAddress:r,addresses:n}=e;return i("div",{className:"account-addresses",children:[t("h2",{children:"Addresses"}),t("br",{}),n.nodes.length?i("div",{children:[i("div",{children:[t("legend",{children:"Create address"}),t(Jn,{})]}),t("br",{}),t("hr",{}),t("br",{}),t(eo,{addresses:n,defaultAddress:r})]}):t("p",{children:"You have no addresses saved."})]})}function Jn(){return t(X,{addressId:"NEW_ADDRESS_ID",address:{address1:"",address2:"",city:"",company:"",territoryCode:"",firstName:"",id:"new",lastName:"",phoneNumber:"",zoneCode:"",zip:""},defaultAddress:null,children:({stateForMethod:r})=>t("div",{children:t("button",{disabled:r("POST")!=="idle",formMethod:"POST",type:"submit",children:r("POST")!=="idle"?"Creating":"Create"})})})}function eo({addresses:e,defaultAddress:r}){return i("div",{children:[t("legend",{children:"Existing addresses"}),e.nodes.map(n=>t(X,{addressId:n.id,address:n,defaultAddress:r,children:({stateForMethod:o})=>i("div",{children:[t("button",{disabled:o("PUT")!=="idle",formMethod:"PUT",type:"submit",children:o("PUT")!=="idle"?"Saving":"Save"}),t("button",{disabled:o("DELETE")!=="idle",formMethod:"DELETE",type:"submit",children:o("DELETE")!=="idle"?"Deleting":"Delete"})]})},n.id))]})}function X({addressId:e,address:r,defaultAddress:n,children:o}){var u;const{state:a,formMethod:s}=le(),l=ce(),c=(u=l==null?void 0:l.error)==null?void 0:u[e],d=(n==null?void 0:n.id)===e;return t(Y,{id:e,children:i("fieldset",{children:[t("input",{type:"hidden",name:"addressId",defaultValue:e}),t("label",{htmlFor:"firstName",children:"First name*"}),t("input",{"aria-label":"First name",autoComplete:"given-name",defaultValue:(r==null?void 0:r.firstName)??"",id:"firstName",name:"firstName",placeholder:"First name",required:!0,type:"text"}),t("label",{htmlFor:"lastName",children:"Last name*"}),t("input",{"aria-label":"Last name",autoComplete:"family-name",defaultValue:(r==null?void 0:r.lastName)??"",id:"lastName",name:"lastName",placeholder:"Last name",required:!0,type:"text"}),t("label",{htmlFor:"company",children:"Company"}),t("input",{"aria-label":"Company",autoComplete:"organization",defaultValue:(r==null?void 0:r.company)??"",id:"company",name:"company",placeholder:"Company",type:"text"}),t("label",{htmlFor:"address1",children:"Address line*"}),t("input",{"aria-label":"Address line 1",autoComplete:"address-line1",defaultValue:(r==null?void 0:r.address1)??"",id:"address1",name:"address1",placeholder:"Address line 1*",required:!0,type:"text"}),t("label",{htmlFor:"address2",children:"Address line 2"}),t("input",{"aria-label":"Address line 2",autoComplete:"address-line2",defaultValue:(r==null?void 0:r.address2)??"",id:"address2",name:"address2",placeholder:"Address line 2",type:"text"}),t("label",{htmlFor:"city",children:"City*"}),t("input",{"aria-label":"City",autoComplete:"address-level2",defaultValue:(r==null?void 0:r.city)??"",id:"city",name:"city",placeholder:"City",required:!0,type:"text"}),t("label",{htmlFor:"zoneCode",children:"State / Province*"}),t("input",{"aria-label":"State/Province",autoComplete:"address-level1",defaultValue:(r==null?void 0:r.zoneCode)??"",id:"zoneCode",name:"zoneCode",placeholder:"State / Province",required:!0,type:"text"}),t("label",{htmlFor:"zip",children:"Zip / Postal Code*"}),t("input",{"aria-label":"Zip",autoComplete:"postal-code",defaultValue:(r==null?void 0:r.zip)??"",id:"zip",name:"zip",placeholder:"Zip / Postal Code",required:!0,type:"text"}),t("label",{htmlFor:"territoryCode",children:"Country Code*"}),t("input",{"aria-label":"territoryCode",autoComplete:"country",defaultValue:(r==null?void 0:r.territoryCode)??"",id:"territoryCode",name:"territoryCode",placeholder:"Country",required:!0,type:"text",maxLength:2}),t("label",{htmlFor:"phoneNumber",children:"Phone"}),t("input",{"aria-label":"Phone Number",autoComplete:"tel",defaultValue:(r==null?void 0:r.phoneNumber)??"",id:"phoneNumber",name:"phoneNumber",placeholder:"+16135551111",pattern:"^\\+?[1-9]\\d{3,14}$",type:"tel"}),i("div",{children:[t("input",{defaultChecked:d,id:"defaultAddress",name:"defaultAddress",type:"checkbox"}),t("label",{htmlFor:"defaultAddress",children:"Set as default address"})]}),c?t("p",{children:t("mark",{children:t("small",{children:c})})}):t("br",{}),o({stateForMethod:h=>s===h?a:"idle"})]})})}const to=Object.freeze(Object.defineProperty({__proto__:null,AddressForm:X,action:Wn,default:Xn,loader:Zn,meta:Kn},Symbol.toStringTag,{value:"Module"})),ro=`#graphql
  # https://shopify.dev/docs/api/customer/latest/mutations/customerUpdate
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
  ){
    customerUpdate(input: $customer) {
      customer {
        firstName
        lastName
        emailAddress {
          emailAddress
        }
        phoneNumber {
          phoneNumber
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`,no=()=>[{title:"Profile"}];async function oo({context:e}){return await e.customerAccount.handleAuthStatus(),{}}async function ao({request:e,context:r}){var a,s;const{customerAccount:n}=r;if(e.method!=="PUT")return S({error:"Method not allowed"},{status:405});const o=await e.formData();try{const l={},c=["firstName","lastName"];for(const[h,p]of o.entries())c.includes(h)&&typeof p=="string"&&p.length&&(l[h]=p);const{data:d,errors:u}=await n.mutate(ro,{variables:{customer:l}});if(u!=null&&u.length)throw new Error(u[0].message);if(!((a=d==null?void 0:d.customerUpdate)!=null&&a.customer))throw new Error("Customer profile update failed.");return{error:null,customer:(s=d==null?void 0:d.customerUpdate)==null?void 0:s.customer}}catch(l){return S({error:l.message,customer:null},{status:400})}}function so(){const e=ie(),{state:r}=le(),n=ce(),o=(n==null?void 0:n.customer)??(e==null?void 0:e.customer);return i("div",{className:"account-profile",children:[t("h2",{children:"My profile"}),t("br",{}),i(Y,{method:"PUT",children:[t("legend",{children:"Personal information"}),i("fieldset",{children:[t("label",{htmlFor:"firstName",children:"First name"}),t("input",{id:"firstName",name:"firstName",type:"text",autoComplete:"given-name",placeholder:"First name","aria-label":"First name",defaultValue:o.firstName??"",minLength:2}),t("label",{htmlFor:"lastName",children:"Last name"}),t("input",{id:"lastName",name:"lastName",type:"text",autoComplete:"family-name",placeholder:"Last name","aria-label":"Last name",defaultValue:o.lastName??"",minLength:2})]}),n!=null&&n.error?t("p",{children:t("mark",{children:t("small",{children:n.error})})}):t("br",{}),t("button",{type:"submit",disabled:r!=="idle",children:r!=="idle"?"Updating":"Update"})]})]})}const io=Object.freeze(Object.defineProperty({__proto__:null,action:ao,default:so,loader:oo,meta:no},Symbol.toStringTag,{value:"Module"}));async function lo(){return D("/account/orders")}const co=Object.freeze(Object.defineProperty({__proto__:null,loader:lo},Symbol.toStringTag,{value:"Module"}));async function uo({context:e}){return await e.customerAccount.handleAuthStatus(),D("/account")}const ho=Object.freeze(Object.defineProperty({__proto__:null,loader:uo},Symbol.toStringTag,{value:"Module"})),mo=()=>[{title:"Hydrogen | Home"}];async function po(e){const r=go(e),n=await fo(e);return{...r,...n}}async function fo({context:e}){const[{collections:r}]=await Promise.all([e.storefront.query(vo)]);return{featuredCollection:r.nodes[0]}}function go({context:e}){return{recommendedProducts:e.storefront.query($o).catch(n=>(console.error(n),null))}}function yo(){const e=v();return i("div",{className:"home",children:[t(Co,{collection:e.featuredCollection}),t(bo,{products:e.recommendedProducts})]})}function Co({collection:e}){if(!e)return null;const r=e==null?void 0:e.image;return i(f,{className:"featured-collection",to:`/collections/${e.handle}`,children:[r&&t("div",{className:"featured-collection-image",children:t(w,{data:r,sizes:"100vw"})}),t("h1",{children:e.title})]})}function bo({products:e}){return i("div",{className:"recommended-products",children:[t("h2",{children:"Recommended Products"}),t(F,{fallback:t("div",{children:"Loading..."}),children:t(U,{resolve:e,children:r=>t("div",{className:"recommended-products-grid",children:r?r.products.nodes.map(n=>t(W,{product:n},n.id)):null})})}),t("br",{})]})}const vo=`#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`,$o=`#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`,Po=Object.freeze(Object.defineProperty({__proto__:null,default:yo,loader:po,meta:mo},Symbol.toStringTag,{value:"Module"}));function So({children:e,...r}){const n=L(null);return Ao(n),typeof e!="function"?null:t(Y,{method:"get",...r,children:e({inputRef:n})})}function Ao(e){Q(()=>{function r(n){var o,a;n.key==="k"&&n.metaKey&&(n.preventDefault(),(o=e.current)==null||o.focus()),n.key==="Escape"&&((a=e.current)==null||a.blur())}return document.addEventListener("keydown",r),()=>{document.removeEventListener("keydown",r)}},[e])}function x({term:e,result:r,children:n}){return r!=null&&r.total?n({...r.items,term:e}):null}x.Articles=_o;x.Pages=wo;x.Products=Io;x.Empty=Do;function _o({term:e,articles:r}){var n;return r!=null&&r.nodes.length?i("div",{className:"search-result",children:[t("h2",{children:"Articles"}),t("div",{children:(n=r==null?void 0:r.nodes)==null?void 0:n.map(o=>{const a=R({baseUrl:`/blogs/${o.handle}`,trackingParams:o.trackingParameters,term:e});return t("div",{className:"search-results-item",children:t(f,{prefetch:"intent",to:a,children:o.title})},o.id)})}),t("br",{})]}):null}function wo({term:e,pages:r}){var n;return r!=null&&r.nodes.length?i("div",{className:"search-result",children:[t("h2",{children:"Pages"}),t("div",{children:(n=r==null?void 0:r.nodes)==null?void 0:n.map(o=>{const a=R({baseUrl:`/pages/${o.handle}`,trackingParams:o.trackingParameters,term:e});return t("div",{className:"search-results-item",children:t(f,{prefetch:"intent",to:a,children:o.title})},o.id)})}),t("br",{})]}):null}function Io({term:e,products:r}){return r!=null&&r.nodes.length?i("div",{className:"search-result",children:[t("h2",{children:"Products"}),t(ue,{connection:r,children:({nodes:n,isLoading:o,NextLink:a,PreviousLink:s})=>{const l=n.map(c=>{var p,g;const d=R({baseUrl:`/products/${c.handle}`,trackingParams:c.trackingParameters,term:e}),u=(p=c==null?void 0:c.selectedOrFirstAvailableVariant)==null?void 0:p.price,h=(g=c==null?void 0:c.selectedOrFirstAvailableVariant)==null?void 0:g.image;return t("div",{className:"search-results-item",children:i(f,{prefetch:"intent",to:d,children:[h&&t(w,{data:h,alt:c.title,width:50}),i("div",{children:[t("p",{children:c.title}),t("small",{children:u&&t(A,{data:u})})]})]})},c.id)});return i("div",{children:[t("div",{children:t(s,{children:o?"Loading...":t("span",{children:"↑ Load previous"})})}),i("div",{children:[l,t("br",{})]}),t("div",{children:t(a,{children:o?"Loading...":t("span",{children:"Load more ↓"})})})]})}}),t("br",{})]}):null}function Do(){return t("p",{children:"No results, try a different search."})}const Eo=()=>[{title:"Hydrogen | Search"}];async function xo({request:e,context:r}){const a=new URL(e.url).searchParams.has("predictive")?Bo({request:e,context:r}):jo({request:e,context:r});return a.catch(s=>(console.error(s),{term:"",result:null,error:s.message})),await a}function No(){const{type:e,term:r,result:n,error:o}=v();return e==="predictive"?null:i("div",{className:"search",children:[t("h1",{children:"Search"}),t(So,{children:({inputRef:a})=>i(M,{children:[t("input",{defaultValue:r,name:"q",placeholder:"Search…",ref:a,type:"search"})," ",t("button",{type:"submit",children:"Search"})]})}),o&&t("p",{style:{color:"red"},children:o}),!r||!(n!=null&&n.total)?t(x.Empty,{}):t(x,{result:n,term:r,children:({articles:a,pages:s,products:l,term:c})=>i("div",{children:[t(x.Products,{products:l,term:c}),t(x.Pages,{pages:s,term:c}),t(x.Articles,{articles:a,term:c})]})}),t(G.SearchView,{data:{searchTerm:r,searchResults:n}})]})}const Oo=`#graphql
  fragment SearchProduct on Product {
    __typename
    handle
    id
    publishedAt
    title
    trackingParameters
    vendor
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
        url
        altText
        width
        height
      }
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      selectedOptions {
        name
        value
      }
      product {
        handle
        title
      }
    }
  }
`,To=`#graphql
  fragment SearchPage on Page {
     __typename
     handle
    id
    title
    trackingParameters
  }
`,Ro=`#graphql
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
  }
`,Lo=`#graphql
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`,Pe=`#graphql
  query RegularSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $term: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    articles: search(
      query: $term,
      types: [ARTICLE],
      first: $first,
    ) {
      nodes {
        ...on Article {
          ...SearchArticle
        }
      }
    }
    pages: search(
      query: $term,
      types: [PAGE],
      first: $first,
    ) {
      nodes {
        ...on Page {
          ...SearchPage
        }
      }
    }
    products: search(
      after: $endCursor,
      before: $startCursor,
      first: $first,
      last: $last,
      query: $term,
      sortKey: RELEVANCE,
      types: [PRODUCT],
      unavailableProducts: HIDE,
    ) {
      nodes {
        ...on Product {
          ...SearchProduct
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  ${Oo}
  ${To}
  ${Ro}
  ${Lo}
`;async function jo({request:e,context:r}){const{storefront:n}=r,o=new URL(e.url),a=T(e,{pageBy:8}),s=String(o.searchParams.get("q")||""),{errors:l,...c}=await n.query(Pe,{variables:{...a,term:s}});if(!c)throw new Error("No search data returned from Shopify API");const d=Object.values(c).reduce((h,{nodes:p})=>h+p.length,0),u=l?l.map(({message:h})=>h).join(", "):void 0;return{type:"regular",term:s,error:u,result:{total:d,items:c}}}const Mo=`#graphql
  fragment PredictiveArticle on Article {
    __typename
    id
    title
    handle
    blog {
      handle
    }
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
`,Uo=`#graphql
  fragment PredictiveCollection on Collection {
    __typename
    id
    title
    handle
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
`,Fo=`#graphql
  fragment PredictivePage on Page {
    __typename
    id
    title
    handle
    trackingParameters
  }
`,qo=`#graphql
  fragment PredictiveProduct on Product {
    __typename
    id
    title
    handle
    trackingParameters
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
        url
        altText
        width
        height
      }
      price {
        amount
        currencyCode
      }
    }
  }
`,ko=`#graphql
  fragment PredictiveQuery on SearchQuerySuggestion {
    __typename
    text
    styledText
    trackingParameters
  }
`,Ho=`#graphql
  query PredictiveSearch(
    $country: CountryCode
    $language: LanguageCode
    $limit: Int!
    $limitScope: PredictiveSearchLimitScope!
    $term: String!
    $types: [PredictiveSearchType!]
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      limit: $limit,
      limitScope: $limitScope,
      query: $term,
      types: $types,
    ) {
      articles {
        ...PredictiveArticle
      }
      collections {
        ...PredictiveCollection
      }
      pages {
        ...PredictivePage
      }
      products {
        ...PredictiveProduct
      }
      queries {
        ...PredictiveQuery
      }
    }
  }
  ${Mo}
  ${Uo}
  ${Fo}
  ${qo}
  ${ko}
`;async function Bo({request:e,context:r}){const{storefront:n}=r,o=new URL(e.url),a=String(o.searchParams.get("q")||"").trim(),s=Number(o.searchParams.get("limit")||10),l="predictive";if(!a)return{type:l,term:a,result:ve()};const{predictiveSearch:c,errors:d}=await n.query(Ho,{variables:{limit:s,limitScope:"EACH",term:a}});if(d)throw new Error(`Shopify API errors: ${d.map(({message:h})=>h).join(", ")}`);if(!c)throw new Error("No predictive search data returned from Shopify API");const u=Object.values(c).reduce((h,p)=>h+p.length,0);return{type:l,term:a,result:{items:c,total:u}}}const zo=Object.freeze(Object.defineProperty({__proto__:null,SEARCH_QUERY:Pe,default:No,loader:xo,meta:Eo},Symbol.toStringTag,{value:"Module"})),Vo=()=>[{title:"Hydrogen | Cart"}],Yo=({actionHeaders:e})=>e;async function Go({request:e,context:r}){var O;const{cart:n}=r,o=await e.formData(),{action:a,inputs:s}=y.getFormInput(o);if(!a)throw new Error("No action provided");let l=200,c;switch(a){case y.ACTIONS.LinesAdd:c=await n.addLines(s.lines);break;case y.ACTIONS.LinesUpdate:c=await n.updateLines(s.lines);break;case y.ACTIONS.LinesRemove:c=await n.removeLines(s.lineIds);break;case y.ACTIONS.DiscountCodesUpdate:{const I=s.discountCode,C=I?[I]:[];C.push(...s.discountCodes),c=await n.updateDiscountCodes(C);break}case y.ACTIONS.GiftCardCodesUpdate:{const I=s.giftCardCode,C=I?[I]:[];C.push(...s.giftCardCodes),c=await n.updateGiftCardCodes(C);break}case y.ACTIONS.BuyerIdentityUpdate:{c=await n.updateBuyerIdentity({...s.buyerIdentity});break}default:throw new Error(`${a} cart action is not defined`)}const d=(O=c==null?void 0:c.cart)==null?void 0:O.id,u=d?n.setCartId(c.cart.id):new Headers,{cart:h,errors:p,warnings:g}=c,$=o.get("redirectTo")??null;return typeof $=="string"&&(l=303,u.set("Location",$)),S({cart:h,errors:p,warnings:g,analytics:{cartId:d}},{status:l,headers:u})}async function Qo({context:e}){const{cart:r}=e;return await r.get()}function Ko(){const e=v();return i("div",{className:"cart",children:[t("h1",{children:"Cart"}),t(be,{layout:"page",cart:e})]})}const Zo=Object.freeze(Object.defineProperty({__proto__:null,action:Go,default:Ko,headers:Yo,loader:Qo,meta:Vo},Symbol.toStringTag,{value:"Module"}));async function Wo({request:e,context:r,params:n}){var $;const{cart:o}=r,{lines:a}=n;if(!a)return D("/cart");const s=a.split(",").map(O=>{const I=O.split(":"),C=I[0],P=parseInt(I[1],10);return{merchandiseId:`gid://shopify/ProductVariant/${C}`,quantity:P}}),l=new URL(e.url),d=new URLSearchParams(l.search).get("discount"),u=d?[d]:[],h=await o.create({lines:s,discountCodes:u}),p=h.cart;if(($=h.errors)!=null&&$.length||!p)throw new Response("Link may be expired. Try checking the URL.",{status:410});const g=o.setCartId(p.id);if(p.checkoutUrl)return D(p.checkoutUrl,{headers:g});throw new Error("No checkout URL found")}function Xo(){return null}const Jo=Object.freeze(Object.defineProperty({__proto__:null,default:Xo,loader:Wo},Symbol.toStringTag,{value:"Module"}));async function ea({request:e}){throw new Response(`${new URL(e.url).pathname} not found`,{status:404})}function ta(){return null}const ra=Object.freeze(Object.defineProperty({__proto__:null,default:ta,loader:ea},Symbol.toStringTag,{value:"Module"})),ua={entry:{module:"/assets/entry.client-Dk2TYfWv.js",imports:["/assets/components-D84i5oUF.js"],css:[]},routes:{root:{id:"root",parentId:void 0,path:"",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/root-Dtot1YxJ.js",imports:["/assets/components-D84i5oUF.js","/assets/index-N3dbdFjd.js","/assets/ProductPrice-B9hAo48g.js","/assets/CartMain-DY9cV6OC.js","/assets/search-DOeYwaXi.js","/assets/Image-Cnwh3A3M.js","/assets/Money-D_MZSwTY.js","/assets/variants-DGmCEXhF.js"],css:["/assets/root-mnao9K-3.css"]},"routes/blogs.$blogHandle.$articleHandle":{id:"routes/blogs.$blogHandle.$articleHandle",parentId:"root",path:"blogs/:blogHandle/:articleHandle",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/blogs._blogHandle._articleHandle-CICAsDXg.js",imports:["/assets/components-D84i5oUF.js","/assets/Image-Cnwh3A3M.js"],css:[]},"routes/sitemap.$type.$page[.xml]":{id:"routes/sitemap.$type.$page[.xml]",parentId:"root",path:"sitemap/:type/:page.xml",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/sitemap._type._page_.xml_-l0sNRNKZ.js",imports:[],css:[]},"routes/blogs.$blogHandle._index":{id:"routes/blogs.$blogHandle._index",parentId:"root",path:"blogs/:blogHandle",index:!0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/blogs._blogHandle._index-BIq_tB0S.js",imports:["/assets/components-D84i5oUF.js","/assets/PaginatedResourceSection-uP9A9MoD.js","/assets/Image-Cnwh3A3M.js","/assets/index-N3dbdFjd.js"],css:[]},"routes/collections.$handle":{id:"routes/collections.$handle",parentId:"root",path:"collections/:handle",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/collections._handle-BRXG-NZ9.js",imports:["/assets/components-D84i5oUF.js","/assets/index-N3dbdFjd.js","/assets/PaginatedResourceSection-uP9A9MoD.js","/assets/ProductItem-Ddo4djVc.js","/assets/variants-DGmCEXhF.js","/assets/Image-Cnwh3A3M.js","/assets/Money-D_MZSwTY.js"],css:[]},"routes/account_.authorize":{id:"routes/account_.authorize",parentId:"root",path:"account/authorize",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account_.authorize-l0sNRNKZ.js",imports:[],css:[]},"routes/collections._index":{id:"routes/collections._index",parentId:"root",path:"collections",index:!0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/collections._index-vKTkenjE.js",imports:["/assets/components-D84i5oUF.js","/assets/PaginatedResourceSection-uP9A9MoD.js","/assets/Image-Cnwh3A3M.js","/assets/index-N3dbdFjd.js"],css:[]},"routes/policies.$handle":{id:"routes/policies.$handle",parentId:"root",path:"policies/:handle",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/policies._handle-BwVfYyw1.js",imports:["/assets/components-D84i5oUF.js"],css:[]},"routes/products.$handle":{id:"routes/products.$handle",parentId:"root",path:"products/:handle",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/products._handle-UbYylijt.js",imports:["/assets/components-D84i5oUF.js","/assets/index-N3dbdFjd.js","/assets/ProductPrice-B9hAo48g.js","/assets/Image-Cnwh3A3M.js","/assets/Money-D_MZSwTY.js"],css:[]},"routes/account_.logout":{id:"routes/account_.logout",parentId:"root",path:"account/logout",index:void 0,caseSensitive:void 0,hasAction:!0,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account_.logout-l0sNRNKZ.js",imports:[],css:[]},"routes/collections.all":{id:"routes/collections.all",parentId:"root",path:"collections/all",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/collections.all-soMU6HSJ.js",imports:["/assets/components-D84i5oUF.js","/assets/PaginatedResourceSection-uP9A9MoD.js","/assets/ProductItem-Ddo4djVc.js","/assets/index-N3dbdFjd.js","/assets/variants-DGmCEXhF.js","/assets/Image-Cnwh3A3M.js","/assets/Money-D_MZSwTY.js"],css:[]},"routes/policies._index":{id:"routes/policies._index",parentId:"root",path:"policies",index:!0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/policies._index-BXYstFkI.js",imports:["/assets/components-D84i5oUF.js"],css:[]},"routes/account_.login":{id:"routes/account_.login",parentId:"root",path:"account/login",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account_.login-l0sNRNKZ.js",imports:[],css:[]},"routes/discount.$code":{id:"routes/discount.$code",parentId:"root",path:"discount/:code",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/discount._code-l0sNRNKZ.js",imports:[],css:[]},"routes/[sitemap.xml]":{id:"routes/[sitemap.xml]",parentId:"root",path:"sitemap.xml",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/_sitemap.xml_-l0sNRNKZ.js",imports:[],css:[]},"routes/pages.$handle":{id:"routes/pages.$handle",parentId:"root",path:"pages/:handle",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/pages._handle-CBGiWr-Q.js",imports:["/assets/components-D84i5oUF.js"],css:[]},"routes/[robots.txt]":{id:"routes/[robots.txt]",parentId:"root",path:"robots.txt",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/_robots.txt_-l0sNRNKZ.js",imports:[],css:[]},"routes/blogs._index":{id:"routes/blogs._index",parentId:"root",path:"blogs",index:!0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/blogs._index-srP7BZP0.js",imports:["/assets/components-D84i5oUF.js","/assets/PaginatedResourceSection-uP9A9MoD.js","/assets/index-N3dbdFjd.js"],css:[]},"routes/account":{id:"routes/account",parentId:"root",path:"account",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account-ocJ4RXaC.js",imports:["/assets/components-D84i5oUF.js"],css:[]},"routes/account.orders._index":{id:"routes/account.orders._index",parentId:"routes/account",path:"orders",index:!0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account.orders._index-CSM0yHrf.js",imports:["/assets/components-D84i5oUF.js","/assets/PaginatedResourceSection-uP9A9MoD.js","/assets/index-N3dbdFjd.js","/assets/Money-D_MZSwTY.js"],css:[]},"routes/account.orders.$id":{id:"routes/account.orders.$id",parentId:"routes/account",path:"orders/:id",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account.orders._id-D7Bv1Ex-.js",imports:["/assets/components-D84i5oUF.js","/assets/Money-D_MZSwTY.js","/assets/Image-Cnwh3A3M.js"],css:[]},"routes/account.addresses":{id:"routes/account.addresses",parentId:"routes/account",path:"addresses",index:void 0,caseSensitive:void 0,hasAction:!0,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account.addresses-DYW_1GdZ.js",imports:["/assets/components-D84i5oUF.js"],css:[]},"routes/account.profile":{id:"routes/account.profile",parentId:"routes/account",path:"profile",index:void 0,caseSensitive:void 0,hasAction:!0,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account.profile-C_akue5W.js",imports:["/assets/components-D84i5oUF.js"],css:[]},"routes/account._index":{id:"routes/account._index",parentId:"routes/account",path:void 0,index:!0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account._index-l0sNRNKZ.js",imports:[],css:[]},"routes/account.$":{id:"routes/account.$",parentId:"routes/account",path:"*",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/account._-l0sNRNKZ.js",imports:[],css:[]},"routes/_index":{id:"routes/_index",parentId:"root",path:void 0,index:!0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/_index-B0J_PLJN.js",imports:["/assets/components-D84i5oUF.js","/assets/ProductItem-Ddo4djVc.js","/assets/Image-Cnwh3A3M.js","/assets/variants-DGmCEXhF.js","/assets/Money-D_MZSwTY.js"],css:[]},"routes/search":{id:"routes/search",parentId:"root",path:"search",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/search-CivTkNez.js",imports:["/assets/components-D84i5oUF.js","/assets/index-N3dbdFjd.js","/assets/search-DOeYwaXi.js","/assets/Image-Cnwh3A3M.js","/assets/Money-D_MZSwTY.js"],css:[]},"routes/cart":{id:"routes/cart",parentId:"root",path:"cart",index:void 0,caseSensitive:void 0,hasAction:!0,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/cart-S7jgJ8AB.js",imports:["/assets/components-D84i5oUF.js","/assets/CartMain-DY9cV6OC.js","/assets/index-N3dbdFjd.js","/assets/ProductPrice-B9hAo48g.js","/assets/Money-D_MZSwTY.js","/assets/variants-DGmCEXhF.js","/assets/Image-Cnwh3A3M.js"],css:[]},"routes/cart.$lines":{id:"routes/cart.$lines",parentId:"routes/cart",path:":lines",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/cart._lines-C6d-v1ok.js",imports:[],css:[]},"routes/$":{id:"routes/$",parentId:"root",path:"*",index:void 0,caseSensitive:void 0,hasAction:!1,hasLoader:!0,hasClientAction:!1,hasClientLoader:!1,hasErrorBoundary:!1,module:"/assets/_-DtCUJE-g.js",imports:[],css:[]}},url:"/assets/manifest-e5a3446c.js",version:"e5a3446c"},ha="production",ma="dist/client",pa="/",fa={v3_fetcherPersist:!0,v3_relativeSplatPath:!0,v3_throwAbortReason:!0,v3_routeConfig:!0,v3_singleFetch:!0,v3_lazyRouteDiscovery:!0,unstable_optimizeDeps:!1},ga=!1,ya="/",Ca={module:We},ba={root:{id:"root",parentId:void 0,path:"",index:void 0,caseSensitive:void 0,module:Ft},"routes/blogs.$blogHandle.$articleHandle":{id:"routes/blogs.$blogHandle.$articleHandle",parentId:"root",path:"blogs/:blogHandle/:articleHandle",index:void 0,caseSensitive:void 0,module:Yt},"routes/sitemap.$type.$page[.xml]":{id:"routes/sitemap.$type.$page[.xml]",parentId:"root",path:"sitemap/:type/:page.xml",index:void 0,caseSensitive:void 0,module:Qt},"routes/blogs.$blogHandle._index":{id:"routes/blogs.$blogHandle._index",parentId:"root",path:"blogs/:blogHandle",index:!0,caseSensitive:void 0,module:rr},"routes/collections.$handle":{id:"routes/collections.$handle",parentId:"root",path:"collections/:handle",index:void 0,caseSensitive:void 0,module:dr},"routes/account_.authorize":{id:"routes/account_.authorize",parentId:"root",path:"account/authorize",index:void 0,caseSensitive:void 0,module:hr},"routes/collections._index":{id:"routes/collections._index",parentId:"root",path:"collections",index:!0,caseSensitive:void 0,module:br},"routes/policies.$handle":{id:"routes/policies.$handle",parentId:"root",path:"policies/:handle",index:void 0,caseSensitive:void 0,module:Ar},"routes/products.$handle":{id:"routes/products.$handle",parentId:"root",path:"products/:handle",index:void 0,caseSensitive:void 0,module:jr},"routes/account_.logout":{id:"routes/account_.logout",parentId:"root",path:"account/logout",index:void 0,caseSensitive:void 0,module:Fr},"routes/collections.all":{id:"routes/collections.all",parentId:"root",path:"collections/all",index:void 0,caseSensitive:void 0,module:Gr},"routes/policies._index":{id:"routes/policies._index",parentId:"root",path:"policies",index:!0,caseSensitive:void 0,module:Wr},"routes/account_.login":{id:"routes/account_.login",parentId:"root",path:"account/login",index:void 0,caseSensitive:void 0,module:Jr},"routes/discount.$code":{id:"routes/discount.$code",parentId:"root",path:"discount/:code",index:void 0,caseSensitive:void 0,module:tn},"routes/[sitemap.xml]":{id:"routes/[sitemap.xml]",parentId:"root",path:"sitemap.xml",index:void 0,caseSensitive:void 0,module:nn},"routes/pages.$handle":{id:"routes/pages.$handle",parentId:"root",path:"pages/:handle",index:void 0,caseSensitive:void 0,module:un},"routes/[robots.txt]":{id:"routes/[robots.txt]",parentId:"root",path:"robots.txt",index:void 0,caseSensitive:void 0,module:fn},"routes/blogs._index":{id:"routes/blogs._index",parentId:"root",path:"blogs",index:!0,caseSensitive:void 0,module:Pn},"routes/account":{id:"routes/account",parentId:"root",path:"account",index:void 0,caseSensitive:void 0,module:xn},"routes/account.orders._index":{id:"routes/account.orders._index",parentId:"routes/account",path:"orders",index:!0,caseSensitive:void 0,module:Fn},"routes/account.orders.$id":{id:"routes/account.orders.$id",parentId:"routes/account",path:"orders/:id",index:void 0,caseSensitive:void 0,module:Vn},"routes/account.addresses":{id:"routes/account.addresses",parentId:"routes/account",path:"addresses",index:void 0,caseSensitive:void 0,module:to},"routes/account.profile":{id:"routes/account.profile",parentId:"routes/account",path:"profile",index:void 0,caseSensitive:void 0,module:io},"routes/account._index":{id:"routes/account._index",parentId:"routes/account",path:void 0,index:!0,caseSensitive:void 0,module:co},"routes/account.$":{id:"routes/account.$",parentId:"routes/account",path:"*",index:void 0,caseSensitive:void 0,module:ho},"routes/_index":{id:"routes/_index",parentId:"root",path:void 0,index:!0,caseSensitive:void 0,module:Po},"routes/search":{id:"routes/search",parentId:"root",path:"search",index:void 0,caseSensitive:void 0,module:zo},"routes/cart":{id:"routes/cart",parentId:"root",path:"cart",index:void 0,caseSensitive:void 0,module:Zo},"routes/cart.$lines":{id:"routes/cart.$lines",parentId:"routes/cart",path:":lines",index:void 0,caseSensitive:void 0,module:Jo},"routes/$":{id:"routes/$",parentId:"root",path:"*",index:void 0,caseSensitive:void 0,module:ra}};export{ua as assets,ma as assetsBuildDirectory,pa as basename,Ca as entry,fa as future,ga as isSpaMode,ha as mode,ya as publicPath,ba as routes};
