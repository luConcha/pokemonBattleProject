let characters = JSON.parse(poke_file).result;
let pokemonSelected;
let stackCompu = new Stack();
let stackYou = new Stack();
let chosenStackYou = new Stack();
let idCompuList = [];
let idYouList = [];

document.querySelector('#pokemonInfo').style.display = 'none';
document.querySelector('#battle').style.display = 'none';
document.querySelector('#searchPokemonSection').style.display = 'none';
document.querySelector('#gameStart').style.display = 'block';
document.querySelector('#startBattle').style.display = 'none';
document.querySelector('#battleResults').style.display = 'none';

//empezarJuego
document.querySelector('#btnGame').onclick = () => {
  randomPokemon();
  displayPlayer(
    stackCompu,
    idCompuList,
    'computerPokemon',
    'computerPokename',
    'compuSelection'
  );
  document.querySelector('#searchPokemonSection').style.display = 'flex';
  document.querySelector('#battle').style.display = 'flex';
  document.querySelector('#gameStart').style.display = 'none';
};

//random pokemones
function randomPokemon() {
  let randomID;
  let count = 0;
  do {
    randomID = Math.floor(Math.random() * 1084);
    stackCompu.push(randomID);
    idCompuList.push(randomID);
    count++;
  } while (count != 3);
}

function displayPlayer(stack, idList, divPlayer, divPlayerName, divSelection) {
  let pokemonID = stack.pop();
  let pokemon = characters[pokemonID];
  imagePokemon = `
    <img src="${pokemon.ThumbnailImage}" alt="PokemonPlayerImage" />`;
  details = `
     <span><strong>${pokemon.name}</strong> </span>
     <span><strong>${pokemonID}</strong></span>
     `;
  document.querySelector(`#${divPlayer}`).innerHTML = imagePokemon;
  document.querySelector(`#${divPlayerName}`).innerHTML = details;

  diplayPokemonSelection(stack, idList, divSelection);
}

function diplayPokemonSelection(stack, idList, divName) {
  let selection = '';
  let stackIds = stack.print();

  for (let i = 0; i < idList.length; i++) {
    if (idList[i] != stackIds[i]) {
      idList.splice(i, 1);
    } else {
      selection += `<div class='imgSelection'> <img src="${
        characters[stackIds[i]].ThumbnailImage
      }" alt="PokemonCompuImage" />
      <span>${stackIds[i]}</span>
      </div>`;
    }
  }

  document.querySelector(`#${divName}`).innerHTML = selection;
}

//buscarPokemon
document.querySelector('#btnBuscar').onclick = () => {
  let pokemon = document.querySelector('#pokemonName').value;
  let details = '';
  let imagePokemon = '';

  if (pokemon == '') {
    document.querySelector('#error').innerHTML =
      'Por favor capture el nombre del Pokemon.';
  } else {
    document.querySelector('#pokemonInfo').style.display = 'flex';
    let results = searchPokemon(pokemon);
    imagePokemon = `
    <img src="${results.ThumbnailImage}" alt="PokemonImage" />`;

    details = `
     <span><strong>Name:</strong> ${results.name} </span>
     <span><strong>Type:</strong> ${results.type} </span>
     <span><strong>Weakness:</strong> ${results.weakness} </span>
     <span><strong>Abilities:</strong> ${results.abilities} </span>
     `;

    document.querySelector('#pokemonImage').innerHTML = imagePokemon;
    document.querySelector('#pokemonDetails').innerHTML = details;
  }
};

function searchPokemon(name) {
  for (let i = 0; i < characters.length; i++) {
    if (name == characters[i].name) {
      pokemonSelected = i;
      return characters[i];
    }
  }
}

//Escoger pokemon
document.querySelector('#btnEscoger').onclick = () => {
  stackYou.push(pokemonSelected);
  idYouList.push(pokemonSelected);

  let pokemon = characters[pokemonSelected];
  imagePokemon = `
    <img src="${pokemon.ThumbnailImage}" alt="PokemonCompuImage" />`;

  details = `
     <span><strong>${pokemon.name}</strong></span>
     <span><strong>${pokemonSelected}</strong></span>
     `;

  document.querySelector('#yourPokemon').innerHTML = imagePokemon;
  document.querySelector('#yourPokeName').innerHTML = details;

  addToListYourPokemons(stackYou, 'yourSelection');

  //mostrar lista de pokemons cuando se seleccionen 3
  if (chosenStackYou.size() == 3) {
    document.querySelector('#pokemonInfo').style.display = 'none';
    document.querySelector('#searchPokemonSection').style.display = 'none';
    document.querySelector('#startBattle').style.display = 'block';

    displayPlayer(
      chosenStackYou,
      idYouList,
      'yourPokemon',
      'yourPokeName',
      'yourSelection'
    );
  }
};

function addToListYourPokemons(list) {
  let selection = '';
  let size = list.size();
  let peekID;
  peekID = list.pop();
  chosenStackYou.push(peekID);
}

//Start Battle
document.querySelector('#startBattle').onclick = () => {
  displayPlayer(
    stackCompu,
    idCompuList,
    'computerPokemon',
    'computerPokename',
    'compuSelection'
  );
  displayPlayer(
    chosenStackYou,
    idYouList,
    'yourPokemon',
    'yourPokeName',
    'yourSelection'
  );
  document.querySelector('#battleResults').style.display = 'block';
  if (stackCompu.size() == 0 && chosenStackYou.size() == 0) {
    document.querySelector('#startBattle').style.display = 'none';
  }
};
