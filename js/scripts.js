//IIFE
let pokemonRepository = (function (){

  let pokemonList = []; //empty array, pokemons will be pushed inside here
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll () {
    return pokemonList;
  }
  
  function add (pokemon) { //(pokemon) = entry, item, pokemonEntry, etc.
    if (typeof pokemon === 'object' && 
        'name' in pokemon && 
        //'height' in pokemon 
        'detailsUrl' in pokemon
       ) {
    pokemonList.push(pokemon);
    }else{
    console.log("this is not an object");
   }
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
  
  function loadList() { //This is a promise function
    return fetch(apiURL).then(function (response) { //(response) is the promise
      return response.json(); //response will be converted to JSON
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // The following adds the details to the item:
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  
   function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
    console.log(pokemon);
    });
  }
  
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  }
  
})()

pokemonRepository.loadList().then(() => {//this'll pass the following 2 functions as value
pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
  });
});
  

