"use strict";
//listener object favourite list
//paint reset button
//listener event reset button

//CLICK BUTTON SEARCH
//get API properties
//paint properties
//listener event of searched list

//CLICK SEARCHED OBJECT
//add ot take off on favourite list
//update favourite list
//change searched serie styles

//CLICK IN FAVOURITE X
//remove element of array
//update favourite list
//reverse element searched styles

//CLICK RESET BUTTON
//remove all elements of favourite list array
//update favourite list HTML
//update searching list styles//

const dataList = document.querySelector(".js-data-list");
const favouriteList = document.querySelector(".js-favourite-list");
//array de objetos que tienen name y image como atributos
let favourites = [];

//RESET FAVOURITES ARRAY
function resetFavourites(event) {
  for (let i = 0; i < favourites.length; i++) {
    const elemId = favourites[i].id;
    const elemLi = document.getElementById(`${elemId}`);
    if (elemLi) {
      elemLi.classList.remove("favourite-styles"); //hacer función?
    }
  }

  favourites = [];
  reloadFavouriteList();
  localStorage.setItem("key-favourites", JSON.stringify(favourites));
}
//REMOVE FAVORITE ITEM
function removeFavouriteItem(event) {
  //eliminar del array el objeto
  const liElement = event.currentTarget.parentElement;
  const elemName = liElement.querySelector("h2").innerHTML;
  const currentFavouriteIndex = favourites.findIndex((favourite) => {
    return favourite.name === elemName;
  });

  console.log(currentFavouriteIndex);
  if (currentFavouriteIndex !== -1) {
    const elemId = favourites[currentFavouriteIndex].id;
    const elemLi = document.getElementById(`${elemId}`);
    if (elemLi) {
      elemLi.classList.remove("favourite-styles"); //hacer función?
    }
    favourites.splice(currentFavouriteIndex, 1);
  }

  //eliminar del listado el elemento del click
  favouriteList.removeChild(liElement);
  localStorage.setItem("key-favourites", JSON.stringify(favourites));
}

//REALOAD FAVOURITE LIST
function reloadFavouriteList() {
  favouriteList.innerHTML = "";
  console.log(favouriteList);
  if (favourites.length > 0) {
    const liButtonElem = document.createElement("li");
    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.innerHTML = "Reset";
    resetButton.classList.add("reset-button");
    liButtonElem.appendChild(resetButton);
    favouriteList.appendChild(liButtonElem);
    resetButton.addEventListener("click", resetFavourites);
  }
  for (let i = 0; i < favourites.length; i++) {
    const liElement = document.createElement("li");
    const imgElement = document.createElement("img");
    imgElement.src = favourites[i].image;
    liElement.appendChild(imgElement);
    const h2Element = document.createElement("h2");
    h2Element.innerHTML = favourites[i].name;
    liElement.appendChild(h2Element);
    const buttonElement = document.createElement("button");
    buttonSearch.classList.add("x-button");
    buttonElement.type = "button";
    buttonElement.innerHTML = "x";
    buttonElement.addEventListener("click", removeFavouriteItem);
    liElement.appendChild(buttonElement);
    favouriteList.appendChild(liElement);
  }
  console.log(favouriteList);
}

//PAINT FAVOURITE LIST
function selectFavourite(event) {
  event.currentTarget.classList.toggle("favourite-styles");
  const elemName = event.currentTarget.querySelector("h2").innerHTML;
  const elemImg = event.currentTarget.querySelector("img").src;
  const elemId = event.currentTarget.getAttribute("id");
  const currentFavouriteIndex = favourites.findIndex((favourite) => {
    return favourite.name === elemName;
  });
  console.log(currentFavouriteIndex);
  if (currentFavouriteIndex === -1) {
    const favouriteObject = {
      name: elemName,
      image: elemImg,
      id: elemId,
    };
    favourites.push(favouriteObject);
    console.log(favourites);
  } else {
    favourites.splice(currentFavouriteIndex, 1);
  }

  reloadFavouriteList(favourites);
  localStorage.setItem("key-favourites", JSON.stringify(favourites));
}

// GENERATE DATALIST AFTER SEARCH

function getListData(event) {
  const inputText = document.querySelector(".js-input-text").value;

  fetch(`http://api.tvmaze.com/search/shows?q=${inputText}`)
    .then((response) => response.json())
    .then((data) => {
      dataList.innerHTML = "Resultado de la búsqueda";
      for (let i = 0; i < data.length; i++) {
        const liElement = document.createElement("li");
        liElement.setAttribute("id", data[i].show.id);
        const imgElement = document.createElement("img");

        if (data[i].show.image) {
          imgElement.src = data[i].show.image.medium;
        } else {
          imgElement.src =
            "https://via.placeholder.com/210x295/ffffff/666666/?text=NO-IMAGE.";
        }
        liElement.appendChild(imgElement);
        const h2Element = document.createElement("h2");
        h2Element.innerHTML = data[i].show.name;
        liElement.appendChild(h2Element);
        dataList.appendChild(liElement);
        liElement.addEventListener("click", selectFavourite);
      }
    });
}
const buttonSearch = document.querySelector(".js-button-search");
buttonSearch.addEventListener("click", getListData);

//LOCALSTORAGE/
const savedFavourites = JSON.parse(localStorage.getItem("key-favourites"));
if (savedFavourites) {
  favourites = savedFavourites;
  reloadFavouriteList();
}

//get data cache
//JSON.stringify para convertir array a elemento string y poderlo guardar en  localStorage.
