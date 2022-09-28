let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'], pokedexNumber: 1},
    {name: 'Sandshrew', height: 0.6, type: 'ground', pokedexNumber: 27},
    {name: 'Nidoqueen', height: 1.3, type: ['poison', 'ground'], pokedexNumber: 31},
    {name: 'Abra', height: 0.9 , type: 'psychic', pokedexNumber: 63},
    {name: 'Exeggutor', height: 2, type: ['grass', 'psychic'], pokedexNumber: 103},
    {name: 'Ditto', height: 0.3, type: 'normal', pokedexNumber: 132},
    {name: 'Dragonite', height: 2.2, type: ['dragon', 'flying'], pokedexNumber: 149},
]
/*
for (let i=0; i<=pokemonList.length; i++) {
    if (pokemonList[i].height >1.0 && pokemonList[i].height <2.0) {
     document.write(pokemonList[i].name + " " + "(" + "height:"+ " " + pokemonList[i].height + "m" + ")" + " - wow that's big!");
      document.write("<br>");
   } else if (pokemonList[i].height >=2.0) {
      document.write(pokemonList[i].name + " " + "(" + "height:"+ " " + pokemonList[i].height + "m" + ")" + " - omg that's REALLY big!")
      document.write("<br>");
   } else {
      document.write(pokemonList[i].name + " " + "(" + "height:"+ " " + pokemonList[i].height + "m" + ")");
      document.write("<br>");
   }
  }
  */

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
    function add (pokemon) {
      pokemonList.push(pokemon);
    }
  
    return {
      getAll: getAll,
      add: add
    }
    
  })()
  
  console.log(pokemonRepository.getAll());
  pokemonRepository.add({name: "Vulpix", height: 0.6, type: 'fire', pokedexNumber: 37});
  pokemonRepository.add({name: "Jigglypuff", height: 0.5, type: ['normal', 'fairy'], pokedexNumber: 39});


// forEach refactoring
  pokemonList.forEach(function(pokemon){
    if (pokemon.height >1.0 && pokemon.height <2.0) {
       document.write(pokemon.name + " " + "(" + "height:"+ " " + pokemon.height + "m" + ")" + " - wow that's big!");
        document.write("<br>");
     } else if (pokemon.height >=2.0) {
        document.write(pokemon.name + " " + "(" + "height:"+ " " + pokemon.height + "m" + ")" + " - omg that's REALLY big!")
        document.write("<br>");
     } else {
        document.write(pokemon.name + " " + "(" + "height:"+ " " + pokemon.height + "m" + ")");
        document.write("<br>");
     }
    });