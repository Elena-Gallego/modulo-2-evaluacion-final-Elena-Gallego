"use strict";const dataList=document.querySelector(".js-data-list"),favouriteList=document.querySelector(".js-favourite-list");let favourites=[];function resetFavourites(e){for(let e=0;e<favourites.length;e++){const t=favourites[e].id,i=document.getElementById(""+t);i&&i.classList.remove("favourite-styles")}favourites=[],reloadFavouriteList(),localStorage.setItem("key-favourites",JSON.stringify(favourites))}function removeFavouriteItem(e){const t=e.currentTarget.parentElement.parentElement,i=t.querySelector("h2").innerHTML,o=favourites.findIndex(e=>e.name===i);if(console.log(o),-1!==o){const e=favourites[o].id,t=document.getElementById(""+e);t&&t.classList.remove("favourite-styles"),favourites.splice(o,1)}favouriteList.removeChild(t),localStorage.setItem("key-favourites",JSON.stringify(favourites))}function reloadFavouriteList(){if(favouriteList.innerHTML="",console.log(favouriteList),favourites.length>0){favouriteList.innerHTML="Favoritas";const e=document.createElement("li"),t=document.createElement("button");t.type="button",t.innerHTML="Reset All",t.classList.add("reset-button"),e.appendChild(t),favouriteList.appendChild(e),t.addEventListener("click",resetFavourites)}for(let e=0;e<favourites.length;e++){const t=document.createElement("li"),i=document.createElement("button");i.classList.add("x-button"),i.type="button",i.innerHTML="X",t.appendChild(i);const o=document.createElement("img");o.src=favourites[e].image,t.appendChild(o);const r=document.createElement("h2");r.innerHTML=favourites[e].name,t.appendChild(r),i.addEventListener("click",removeFavouriteItem),favouriteList.appendChild(t)}console.log(favouriteList)}function selectFavourite(e){e.currentTarget.classList.toggle("favourite-styles");const t=e.currentTarget.querySelector("h2").innerHTML,i=e.currentTarget.querySelector("img").src,o=e.currentTarget.getAttribute("id"),r=favourites.findIndex(e=>e.name===t);if(console.log(r),-1===r){const e={name:t,image:i,id:o};favourites.push(e)}else favourites.splice(r,1);reloadFavouriteList(favourites),localStorage.setItem("key-favourites",JSON.stringify(favourites))}function getListData(e){const t=document.querySelector(".js-input-text").value;fetch("https://api.tvmaze.com/search/shows?q="+t).then(e=>e.json()).then(e=>{dataList.innerHTML="Elige una serie:";for(let t=0;t<e.length;t++){const i=document.createElement("li");i.setAttribute("id",e[t].show.id);const o=document.createElement("img");e[t].show.image?o.src=e[t].show.image.medium:o.src="https://via.placeholder.com/210x295/ffffff/666666/?text=NO-IMAGE.",i.appendChild(o);const r=document.createElement("h2");r.innerHTML=e[t].show.name,i.appendChild(r),dataList.appendChild(i),i.addEventListener("click",selectFavourite)}})}const buttonSearch=document.querySelector(".js-button-search");buttonSearch.addEventListener("click",getListData);const savedFavourites=JSON.parse(localStorage.getItem("key-favourites"));savedFavourites&&savedFavourites.length>0&&(favourites=savedFavourites,reloadFavouriteList());