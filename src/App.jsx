import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        setPokemon(data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index}>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
