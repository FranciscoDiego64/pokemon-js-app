let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'], pokedexNumber: 001},
    {name: 'Sandshrew', height: 0.6, type: 'ground', pokedexNumber: 027},
    {name: 'Nidoqueen', height: 1.3, type: ['poison', 'ground'], pokedexNumber: 031},
    {name: 'Abra', height: 0.9 , type: 'psychic', pokedexNumber: 063},
    {name: 'Exeggutor', height: 2, type: ['grass', 'psychic'], pokemonNumber: 103},
    {name: 'Ditto', height: 0.3, type: 'normal', pokemonNumer: 132},
    {name: 'Dragonite', height: 2.2, type: ['dragon', 'flying'], pokedexNumber: 149},
]

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