const cardsContainer = document.querySelector('.container');
const cards = [];

/**
 * Obtener los datos de cada pokemon 
 */
async function getPokemonData() {
  try {
    /**
     * Convierte el array con el id de los pokes en una sola promesa con el Promise.all
     * para tener todas las solicitudes enviadas simultáneamente
     */
    const pokesReq = Promise.all(POKES_TO_FETCH.map(pokeNumber => 
        fetch(getPokeURL(pokeNumber))
      ));
    const speciesReq = Promise.all(POKES_TO_FETCH.map(pokeNumber => 
        fetch(getPokeSpeciesURL(pokeNumber))
      ));
      
    //Espera a que se completen todas las promesas anteriores y obtiene su data en formato json
    const [pokesRes, speciesRes] = await Promise.all([pokesReq, speciesReq]);
    
    const [pokesData, speciesData] = await Promise.all([
      Promise.all(pokesRes.map(res => res.json())), 
      Promise.all(speciesRes.map(res => res.json()))
    ])

    //Pide la información de la cadena evolutiva del poke a partir de los datos que llegaron antes
    const evoChainsRes = await Promise.all(speciesData.map(data =>
      fetch(data.evolution_chain.url)));
    const evoChainsData = await Promise.all(evoChainsRes.map(res => res.json()));
    console.log(evoChainsData);

    //Organizamos los datos y creamos las cartas
    pokesData.forEach((data, index) => {
      const parsed = parsePokemonData(data, speciesData[index], evoChainsData[index]);

      const card = new Card(parsed, cardsContainer);
      card.addEvent('click', toggleFlippedClass);
      card.bindEvents();
      cards.push(card);
    });
  } catch (error) {
    console.error(error.message);
  };
}

/**
 * Ordena la información recibida de las diferentes rutas de la 
 * pokeapi para facilitar su uso más adelante
 * 
 * @param {*} pokeData Datos obtenidos de /pokemon/*
 * @param {*} speciesData Datos obtenidos de /pokemon-species/*
 * @param {*} evolData Datos obtenidos de la cadena evolutiva del poke
 */
function parsePokemonData(pokeData, speciesData, evolData) {
  //Deconstruye los datos
  const {
    height,
    weight,
    name,
    id
  } = pokeData;
  const {flavor_text_entries} = speciesData;
  const {chain} = evolData;

  const evolutionChain = [chain.species.name];
  let currentEvolStep = chain;
  //Recursivamente recorre la cadena evolutiva del poke hasta que obtiene todas las evoluciones
  while(currentEvolStep.evolves_to.length > 0) {
    const nextEvolStep = currentEvolStep.evolves_to[0]
    const {name} = nextEvolStep.species;
    evolutionChain.push(name);
    currentEvolStep = currentEvolStep.evolves_to[0];
  }

  const text = flavor_text_entries[0].flavor_text;
  return {
    height,
    weight,
    name,
    id,
    text,
    evolutionChain
  };
}

/**
 * Agrega o remueve la clase 'card--flipped' de las tarjetas
 */
function toggleFlippedClass() {
  this.element.classList.toggle('card--flipped');
} 

window.addEventListener('DOMContentLoaded', getPokemonData);