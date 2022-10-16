let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("this is not an object");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let $list = $(".list");

      let $card = $('<div class="card" style="width:200px"></div>');
      let $image = $(
        '<img class="card-img-top" alt="Card image" style="width:50%" />'
      );
      $image.attr("src", pokemon.imageUrlFront);
      let $cardBody = $('<div class="card-body"></div>');
      let $cardTitle = $("<h6 class='card-title' >" + '#'+ pokemon.id + ' '+ pokemon.name + "</h6>");
      let $seeProfile = $( 
        '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      $list.append($card);
      $card.append($image);
      $card.append($cardBody);
      $cardBody.append($cardTitle);
      $cardBody.append($seeProfile);

      $seeProfile.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      showModal(item);
    });
  }
  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return $.ajax(url)
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }

        item.weight = details.weight;
        item.id = details.id;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>"); //'#'+ pokemon.id + ' '+ pokemon.name +
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    let pokedexNumberElement = $("<p>" + "pokedex number: " + item.id + "</p>");
    let heightElement = $("<p>" + "height: " + item.height + '0cm' + "</p>");
    let weightElement = $("<p>" + "weight: " + item.weight + '00' + 'gr'+ "</p>");
    let typesElement = $("<p>" + "types: " + item.types + "</p>");
    let abilitiesElement = $("<p>" + "abilities: " + item.abilities + "</p>");

    

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(pokedexNumberElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});