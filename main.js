"use strict";
const countryContainer = document.querySelector(".country__info-container");
const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-input");

const findCountry = function (data) {
  const html = `
  <div class="country__info-container">
  <div class="flag-conutry-wrapper">
        <img
          class="country__flag"
          src="${data.flag}"
          alt=""
        />
        <div class="country__name">${data.name}</div>
      </div>
      <div class="country__info">
        <div class="contry__capital"> <span class="bold">Capital</span> : ${
          data.capital
        }</div>
        <div class="contry__region"><span class="bold">Region</span>: ${
          data.region
        }</div>
        <div class="contry__population"><span class="bold">Population</span>: ${(
          +data.population / 1000000
        ).toFixed(1)} million</div>
        <div class="contry__currency"><span class="bold">Currency</span>: ${
          data.currencies[0].code
        }</div>
        <div class="contry__language"><span class="bold">Languages</span>: ${
          data.languages[0].name
        }</div>
      </div>
      </div>
  `;
  countryContainer.insertAdjacentHTML("beforeend", html);
};

const renderError = function () {
  const errorMsg = ` <div class="error">Please enter a valid country name</div>`;
  countryContainer.insertAdjacentHTML("beforeend", errorMsg);
};
searchBtn.addEventListener("click", function () {
  const inputCountry = searchBar.value;
  console.log(inputCountry);

  fetch(`https://restcountries.com/v2/name/${inputCountry}`)
    .then((response) => {
      if (!response.ok) throw new Error(`country not found ${response.status}`);
      return response.json();
    })
    .then((data) => {
      findCountry(data?.[0]);
    })
    .catch((err) => {
      renderError();
    });

  searchBar.addEventListener("click", () => {
    searchBar.value = "";
  });
  searchBtn.addEventListener("click", function () {
    countryContainer.innerHTML = "";
    return;
  });
});
