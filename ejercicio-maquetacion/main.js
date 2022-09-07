const cardsContainer = document.querySelector('.container');
const cards = [];

async function getPokemonData() {
  try {
    POKES_TO_FETCH.forEach(async pokeNumber => {
      const [pokeRes, speciesRes] = await Promise.all([
        fetch(getPokeURL(pokeNumber)),
        fetch(getPokeSpeciesURL(pokeNumber))
      ])
      const [pokeData, speciesData] = await Promise.all([
        pokeRes.json(),
        speciesRes.json()
      ]);

      const evolRes = await fetch(speciesData.evolution_chain.url);
      const evolData = await evolRes.json();

      console.log(parsePokemonData(pokeData, speciesData, evolData));
    })
  } catch (error) {
    console.error(error.message);
  };
}

function parsePokemonData(pokeData, speciesData, evolData) {
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

function toggleFlippedClass() {
  this.element.classList.toggle('card--flipped');
} 

window.addEventListener('DOMContentLoaded', getPokemonData);