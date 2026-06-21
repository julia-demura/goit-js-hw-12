import{a as d,S as p,i as c}from"./assets/vendor-CIF6YjI2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const g="56253935-84605c6ab25f84a7284cdd72a",h="https://pixabay.com/api/";async function y(s){const o=new URLSearchParams({key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});try{return(await d.get(`${h}?${o}`)).data}catch(t){throw console.error("Error fetching images:",t),t}}const u=document.querySelector(".gallery"),a=document.querySelector(".loader"),b=new p(".gallery-link",{captionsData:"alt",captionDelay:250});function L(s){const o=s.map(({webformatURL:t,largeImageURL:n,tags:e,likes:r,views:i,comments:f,downloads:m})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${n}">
          <img 
            class="gallery-image" 
            src="${t}" 
            alt="${e}" 
            loading="lazy" 
          />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${r}</p>
          <p class="info-item"><b>Views:</b> ${i}</p>
          <p class="info-item"><b>Comments:</b> ${f}</p>
          <p class="info-item"><b>Downloads:</b> ${m}</p>
        </div>
      </li>
    `).join("");u.insertAdjacentHTML("beforeend",o),b.refresh()}function w(){u.innerHTML=""}function P(){a&&a.classList.remove("is-hidden")}function S(){a&&a.classList.add("is-hidden")}const l=document.querySelector(".form");l.addEventListener("submit",s=>{s.preventDefault();const o=s.currentTarget.elements["search-text"].value.trim();if(o===""){c.warning({message:"Please enter a search term!",position:"topRight"});return}w(),P(),y(o).then(t=>{if(t.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(t.hits),l.reset()}).catch(t=>{console.log(t),c.error({title:"Error",message:"Something went wrong with the server connection. Please try again later!",position:"topRight"})}).finally(()=>{S()})});
//# sourceMappingURL=index.js.map
