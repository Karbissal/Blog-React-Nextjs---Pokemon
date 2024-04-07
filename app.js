function fetchPokemonData() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    axios.get(apiUrl)
        .then(response => {
            const pokemonData = {
                name: response.data.name,
                types: response.data.types.map(type => type.type.name).join(', '),
                pokedexNumber: response.data.id
            };
            const audio = new Audio();
            audio.src = `https://play.pokemonshowdown.com/audio/cries/${pokemonName}.mp3`;
            audio.volume = 0.2;
            audio.play();
            
            const pokemonImage = response.data.sprites.front_default;

            const pokemonInfoContainer = document.getElementById('pokemonInfoContainer');
            pokemonInfoContainer.innerHTML = `
                <img src="${pokemonImage}" alt="${pokemonData.name}">
                <p><strong>Name:</strong> ${pokemonData.name}</p>
                <p><strong>Type(s):</strong> ${pokemonData.types}</p>
                <p><strong>Pokedex Number:</strong> ${pokemonData.pokedexNumber}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching Pokemon information:', error);
            alert('Pokemon not found. Please enter a valid Pokemon name.');
        });
}