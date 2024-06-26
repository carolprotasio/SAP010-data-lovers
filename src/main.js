// Importa os dados dos países
import { filterBySubregion, filterByContinent, orderByAlphabetical, calculatePopulation } from './data.js'; 
import data from "./data/countries/countries.js";

// Seleciona os elementos do seletor, da lista de países e do seletor de continentes
const selectorElement = document.querySelector("#selector");
const countryListElement = document.querySelector(".bandeiras");
const continentSelectorElement = document.querySelector("#seletor_continent");
const populationResultElement = document.querySelector("#populationResult");


//==============PEGAR OS RESULTADOS DO FILTRO E COLOCAR EM DIV/P/IMG PARA MOSTRAR NO HTML==============
// criando elementos para o html
const renderCountryList = (countries) => {
  countryListElement.innerHTML = ""; // variável inicia vazia
  // faz o looping em todos os países
  countries.forEach((country) => {
    const countryElement = document.createElement("div");
    countryElement.className = "country";

    const imgElement = document.createElement("img");
    imgElement.src = country.flags.png;
    imgElement.alt = `Bandeira de ${country.name.common}`;

    const nameElement = document.createElement("p");
    nameElement.textContent = country.name.common;

    const capitalElement = document.createElement("p");
    capitalElement.textContent = "Capital: " + country.capital;

    const languagesElement = document.createElement("p");
    languagesElement.textContent = "Idioma: " + Object.values(country.languages).join(", "); 

    const populationElement = document.createElement("p");
    populationElement.textContent =
      "População: " + country.population.toLocaleString("pt-BR"); // coloca pontos e vírgulas nos números

    const areaElement = document.createElement("p");
    areaElement.textContent =
      "Área: " + country.area.toLocaleString("pt-BR") + " km²";

    // Adicionar os elementos criados ao elemento do país
    countryElement.appendChild(imgElement);
    countryElement.appendChild(nameElement);
    countryElement.appendChild(capitalElement);
    countryElement.appendChild(languagesElement);
    countryElement.appendChild(populationElement);
    countryElement.appendChild(areaElement);

    // Adicionar o elemento do país à lista
    countryListElement.appendChild(countryElement);
  });
};

//==============CRIAR EVENTLISTENERS AO ESCOLHER O CONTINENTE/SUBREGIÃO==============

// Event listener para mudanças no seletor de sub-regiões
continentSelectorElement.addEventListener("change", (event) => {
  // Verifica o valor do seletor de sub-regiões
  const value = event.target.value;
  if (value === "amer_central") {
    const amerCentral = filterBySubregion("Central America", data.countries)
    // Filtra os países pela sub-região selecionada e renderiza a lista
    renderCountryList (amerCentral);
  } else if (value === "amer_sul") {
    const amerSul = filterBySubregion("South America", data.countries)
    // Filtra os países pela sub-região selecionada e renderiza a lista
    renderCountryList (amerSul);
  } else if (value === "amer_norte") {
    const amerNorte = filterBySubregion("North America", data.countries)
    // Filtra os países pela sub-região selecionada e renderiza a lista
    renderCountryList (amerNorte)


  } else if (value === "asia") {
    const asia = filterByContinent("Asia", data.countries)
    renderCountryList (asia);
  } else if (value === "africa") {
    const africa = filterByContinent("Africa", data.countries)
    renderCountryList (africa);
  } else if (value === "oceania") {
    const oceania = filterByContinent("Oceania", data.countries);
    renderCountryList (oceania);
  } else if (value === "europa") {
    const europa = filterByContinent("Europe", data.countries);
    renderCountryList (europa);
  } else {
    renderCountryList([]);
  }
  // Adicione outras condições else if ou else para filtrar outros continentes/sub-regiões
});


///==============FILTRAR POR PAÍSES E POR ORDEM ALFABÉTICA==============

// Chama a função orderByAlphabetical com o array de países

selectorElement.addEventListener("change", (event) => {
  const value = event.target.value;
  if (value === "country") {
    // chamaremos "renderCountryList" e passaremos uma cópia da lista de países como argumento para essa função.
    renderCountryList(data.countries.slice());
  } else if (value === "alphabetical") {
    //Se o valor selecionado não for "country", verificamos se é igual a "alphabetical".
    const orderedCountries = orderByAlphabetical(data.countries.slice());
    //a função "orderByAlphabetical" será chamada com a lista de países completa como argumento. Essa função ordena os países em ordem alfabética. O resultado é armazenado na variável "orderedCountries".
    renderCountryList(orderedCountries);
    //a função "renderCountryList" é chamada com a lista de países ordenados (orderedCountries) como argumento. Isso significa que os países serão exibidos em ordem alfabética.
  }
});

/*======================= CALCULO TOTAL DA POPULAÇÃO ================*/

// Função para exibir a população total e a região no elemento populationResultElement
const displayPopulation = (region, population) => {
  populationResultElement.innerHTML = 
  `<strong>População total de ${region}: </br> <span>${population.toLocaleString("br-PT")}</span></strong>`;
};

continentSelectorElement.addEventListener("change", (event) => {
  const value = event.target.value;
  let filteredCountries = [];
  let region = "";

  if (value === "amer_central") {
    region = "América Central";
    filteredCountries = filterBySubregion("Central America", data.countries);
  } else if (value === "amer_sul") {
    region = "América do Sul";
    filteredCountries = filterBySubregion("South America", data.countries);
  } else if (value === "amer_norte") {
    region = "América do Norte";
    filteredCountries = filterBySubregion("North America", data.countries);
  } else if (value === "asia") {
    region = "Ásia";
    filteredCountries = filterByContinent("Asia", data.countries);
  } else if (value === "africa") {
    region = "África";
    filteredCountries = filterByContinent("Africa", data.countries);
  } else if (value === "oceania") {
    region = "Oceania";
    filteredCountries = filterByContinent("Oceania", data.countries);
  } else if (value === "europa") {
    region = "Europa";
    filteredCountries = filterByContinent("Europe", data.countries);
  }

  renderCountryList(filteredCountries);
  const totalPopulation = calculatePopulation(filteredCountries);
  displayPopulation(region, totalPopulation);
});
