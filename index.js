import{a as v,S as $,i as a}from"./assets/vendor-CIF6YjI2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const q="56253935-84605c6ab25f84a7284cdd72a",R="https://pixabay.com/api/";async function g(i,t=1){const r=new URLSearchParams({key:q,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15});try{return(await v.get(`${R}?${r}`)).data}catch(s){throw console.error("Error fetching images:",s),s}}const h=document.querySelector(".gallery"),c=document.querySelector(".loader"),d=document.querySelector(".load-more-btn"),B=new $(".gallery-link",{captionsData:"alt",captionDelay:250});function y(i){const t=i.map(({webformatURL:r,largeImageURL:s,tags:e,likes:o,views:l,comments:S,downloads:P})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img 
            class="gallery-image" 
            src="${r}" 
            alt="${e}" 
            loading="lazy" 
          />
        </a>
        <ul class="info">
          <li class="info-item"><b>Likes</b> ${o}</li>
          <li class="info-item"><b>Views</b> ${l}</li>
          <li class="info-item"><b>Comments</b> ${S}</li>
          <li class="info-item"><b>Downloads</b> ${P}</li>
        </ul>
      </li>
    `).join("");h.insertAdjacentHTML("beforeend",t),B.refresh()}function E(){h.innerHTML=""}function p(){c&&c.classList.remove("is-hidden")}function b(){c&&c.classList.add("is-hidden")}function L(){d&&d.classList.remove("is-hidden")}function u(){d&&d.classList.add("is-hidden")}const f=document.querySelector(".form"),M=document.querySelector(".load-more-btn");let m="",n=1;const w=15;f.addEventListener("submit",async i=>{i.preventDefault();const t=i.currentTarget.elements["search-text"].value.trim();if(t===""){a.warning({message:"Please enter a search term!",position:"topRight"});return}m=t,n=1,E(),u(),p();try{const r=await g(m,n);if(r.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(r.hits),n*w>=r.totalHits?(u(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):L(),f.reset()}catch(r){console.log(r),a.error({title:"Error",message:"Something went wrong with the server connection. Please try again later!",position:"topRight"})}finally{b()}});M.addEventListener("click",async()=>{n+=1,u(),p();try{const i=await g(m,n);y(i.hits);const t=document.querySelector(".gallery-item");if(t){const r=t.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}n*w>=i.totalHits?(u(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):L()}catch(i){console.log(i),a.error({message:"Failed to load more images. Please try again.",position:"topRight"})}finally{b()}});
//# sourceMappingURL=index.js.map
