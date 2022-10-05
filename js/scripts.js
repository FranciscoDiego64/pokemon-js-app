let pokemonRepository = (function (){

  let pokemonList = []; 
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll () {
    return pokemonList;
  }
  
  function add (pokemon) { 
    if (typeof pokemon === 'object' && 
        'name' in pokemon && 
        //'height' in pokemon 
        'detailsUrl' in pokemon
       ){
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
  
  function loadList() { 
    return fetch(apiURL).then(function (response) { 
      return response.json(); 
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
      
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  
  function showModal(title, height, image){
    let modalContainer = document.querySelector('#modal-container');
  
 
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
    
    
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal); //on click it triggers hideModal funct.
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
    let contentElement = document.createElement('p');
    contentElement.innerText = height;
    let imageElement = document.createElement('img');
    imageElement.src = image;


    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
  }
  
  function hideModal(){
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }
  
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  })
  
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('título', 'texto');
  });

  function showDetails(pokemon) {
   loadDetails(pokemon).then(function() {
   showModal(pokemon.name, 'Height: ' + pokemon.height + '0cm', pokemon.imageUrl);
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
