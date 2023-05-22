
//==============FILTRAR A SUBREGIÃO E O CONTINENTE RENDERIZANDO==============

// Filtra os países por subregião
export const filterBySubregion = (subregion, countries) => {
  // Filtra o array de países pela subregião selecionada
  const filteredCountries = countries.filter(
    (country) => country.subregion === subregion
  );
  return filteredCountries
  
};

//==============FILTRAR A SUBREGIÃO E O CONTINENTE RENDERIZANDO==============

// Filtra os países por continente
export const filterByContinent = (continent, countries) => {
  // Filtra o array de países pelo continente selecionado
  /* console.log(array) */
  const filteredCountries = countries.filter((country) =>
    country.continents.includes(continent)
  
  );
  return filteredCountries
};

//==============FILTRAR por ordem alfabetica==============

// Ordena os países em ordem alfabética
export function orderByAlphabetical(countries) {
  const filteredCountries = countries.slice().sort((a, b) => a.name.common.localeCompare(b.name.common));
  return filteredCountries;
  //A função "localeCompare" é chamada para realizar a comparação alfabética entre os nomes comuns. 
}
//==============FILTRAR por total de população==============

// Função para calcular a população total de uma lista de países
export const calculatePopulation = (countries) => {
  //A função usa um método especial chamado "reduce" para fazer essa soma. O método "reduce" funciona percorrendo cada país da lista e acumulando um valor chamado "totalPopulation".
  return countries.reduce((totalPopulation, country) => {
    //Dentro da função anônima, o valor atual da população total (totalPopulation) é somado à população do país atual (country.population). O resultado dessa soma se torna o novo valor da população total.
    return totalPopulation + country.population; 
  }, 0);
};
//O valor inicial para a população total é 0. Isso significa que a primeira vez que a função anônima é executada, a população total começa em 0. A cada iteração, a população total é atualizada com o valor acumulado das populações dos países.




