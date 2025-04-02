import { useState, useEffect } from "react";
import { useCharacters } from "../../hooks/UseAllCharacters/useAllCharacters";
import { allCharacterVar } from "../../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";
import SidebarSection from "../../components/sidebar-section/SidebarSection";

const Destktop = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, characters } = useCharacters(page);

  // Obtener el estado actual de la variable reactiva
  const characterState = useReactiveVar(allCharacterVar);

  useEffect(() => {
    if (
      characters &&
      JSON.stringify(characters) !== JSON.stringify(characterState.allCharacter)
    ) {
      allCharacterVar({
        allCharacter: characters, // Guardamos los personajes en 'allCharacter'
        favoritesCharacter: characterState.favoritesCharacter, // Mantenemos favoritos sin cambios
      });
    }
  }, [characters]); // Solo ejecuta el efecto si `characters` cambia

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Personajes de Rick and Morty</h1>
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Anterior
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Siguiente</button>

      <SidebarSection
        title="Starred Characters"
        list={characterState.favoritesCharacter}
      />
      <SidebarSection title="CHARACTERS" list={characterState.allCharacter} />
    </div>
  );
};

export default Destktop;
