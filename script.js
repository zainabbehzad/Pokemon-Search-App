// Fetch Pokemon data
async function fetchPokemonData(pokemonId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch Pokemon data for ID ${pokemonId}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Display Pokemon information
async function displayPokemonInfo(pokemonId) {
  const pokemonData = await fetchPokemonData(pokemonId);
  if (pokemonData) {
    const { name, id, weight, height, sprites, stats, types } = pokemonData;
    const typeNames = types.map(type => type.type.name);
    const hpStat = stats.find(stat => stat.stat.name === 'hp');
    const attackStat = stats.find(stat => stat.stat.name === 'attack');
    const defenseStat = stats.find(stat => stat.stat.name === 'defense');
    const specialAttackStat = stats.find(stat => stat.stat.name === 'special-attack');
    const specialDefenseStat = stats.find(stat => stat.stat.name === 'special-defense');
    const speedStat = stats.find(stat => stat.stat.name === 'speed');

    // Update the HTML with the Pokemon's information
    document.getElementById('pokemon-name').textContent = name;
    document.getElementById('pokemon-id').textContent = `ID: ${id}`;
    document.getElementById('weight').textContent = `Weight: ${weight} lbs`;
    document.getElementById('height').textContent = `Height: ${height} ft`;
    document.getElementById('types').textContent = `Types: ${typeNames.join(', ')}`;
    document.getElementById('hp').textContent = hpStat.base_stat;
    document.getElementById('attack').textContent = attackStat.base_stat;
    document.getElementById('defense').textContent = defenseStat.base_stat;
    document.getElementById('special-attack').textContent = specialAttackStat.base_stat;
    document.getElementById('special-defense').textContent = specialDefenseStat.base_stat;
    document.getElementById('speed').textContent = speedStat.base_stat;
    document.getElementById('sprite').src = sprites.front_default;
  } else {
    // Handle the case when the Pokemon data could not be fetched
    if (Number.isNaN(Number(pokemonId))) {
      alert(`Invalid Pokemon ID: ${pokemonId}`);
    } else {
      alert(`Failed to fetch data for Pokemon ID ${pokemonId}`);
    }
  }
}

// Get the Pokemon ID from the user input
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const pokemonId = searchInput.value.trim();
  if (pokemonId) {
    displayPokemonInfo(pokemonId);
  }
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const pokemonId = searchInput.value.trim();
    if (pokemonId) {
      displayPokemonInfo(pokemonId);
    }
  }
});