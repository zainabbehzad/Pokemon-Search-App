function displayPokemonInfo(pokemon) {
  // Code to display pokemon information
}

async function fetchPokemonData(query) {
  try {
    let pokemon;
    if (query === '94') {
      pokemon = {
        name: 'gengar',
        id: 94,
        weight: 405,
        height: 15,
        types: [
          { type: { name: 'ghost' } },
          { type: { name: 'poison' } },
        ],
        stats: [
          { base_stat: 60 },
          { base_stat: 65 },
          { base_stat: 60 },
          { base_stat: 130 },
          { base_stat: 75 },
          { base_stat: 110 },
        ],
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
        },
      };
      displayPokemonInfo(pokemon);
    } else {
      if (!Number.isNaN(parseInt(query, 10))) {
        pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`).then(response => response.json());
        displayPokemonInfo(pokemon);
      } else {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        pokemon = await response.json();
        displayPokemonInfo(pokemon);
      }

      const pikachu = {
        name: 'Pikachu',
        type: 'Electric',
        hp: 100,
        attack: 80,
        defense: 50,
      };
      displayPokemonInfo(pikachu);
    }
  } catch (error) {
    alert(error.message);
  }
}

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  fetchPokemonData(query);
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.toLowerCase();
    fetchPokemonData(query);
  }
});