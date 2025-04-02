
import { useState } from "react";
import { useCharacters } from "../../hooks/UseAllCharacters/useAllCharacters";

const Destktop = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, characters } = useCharacters(page);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Personajes de Rick and Morty</h1>
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Anterior
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Siguiente</button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {characters.map((character) => (
          <div key={character.id} style={{ margin: 10, textAlign: "center" }}>
            <img
              src={character.image}
              alt={character.name}
              style={{ borderRadius: "50%" }}
            />
            <h3>{character.name}</h3>
            <p>
              {character.species} - {character.gender}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destktop;
