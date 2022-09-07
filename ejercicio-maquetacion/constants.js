const POKEAPI_BASEURL = "https://pokeapi.co/api/v2/";
const POKES_TO_FETCH = [1, 4];
const getPokeURL = (index) => `${POKEAPI_BASEURL}pokemon/${index}`;
const getPokeSpeciesURL = (index) => `${POKEAPI_BASEURL}pokemon-species/${index}`;
const getPokeEvolutionURL = (index) => `${POKEAPI_BASEURL}evolution-chain/${index}`;