//IIFE
let pokemonRepository = (function (){

  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'], pokedexNumber: 1},
    {name: 'Sandshrew', height: 0.6, type: 'ground', pokedexNumber: 27},
    {name: 'Nidoqueen', height: 1.3, type: ['poison', 'ground'], pokedexNumber: 31},
    {name: 'Abra', height: 0.9 , type: 'psychic', pokedexNumber: 63},
    {name: 'Exeggutor', height: 2, type: ['grass', 'psychic'], pokedexNumber: 103},
    {name: 'Ditto', height: 0.3, type: 'normal', pokedexNumber: 132},
    {name: 'Dragonite', height: 2.2, type: ['dragon', 'flying'], pokedexNumber: 149},
]

  function getAll () {
    return pokemonList;
  }
  
  function add (pokemon) { //(pokemon) = entry, item, pokemonEntry, etc.
    if (typeof pokemon === 'object' && 'name', 'height' in pokemon) {
    pokemonList.push(pokemon);
    }else{
    alert("this is not an object or info is missing")
   }
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonListContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let pokeButton = document.createElement('button');
    pokeButton.innerText = pokemon.name;
    pokeButton.classList.add('pokebutton-class');
  
    listItem.appendChild(pokeButton);  
    pokemonListContainer.appendChild(listItem); 

    pokeButton.addEventListener('click', function (event) { //any name works
    showDetails(pokemon);
    });
  }
  
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  }
  
})()

//console.log(pokemonRepository.getAll());
pokemonRepository.add({name: "Vulpix", height: 0.6, type: 'fire', pokedexNumber: 37});
pokemonRepository.add({name: "Jigglypuff", height: 0.5, type: ['normal', 'fairy'], pokedexNumber: 39});
// console.log(pokemonList[0].name); will be error. Cannot access "pokemonList" because it's inside the IIFE

pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});