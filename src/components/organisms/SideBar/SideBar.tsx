import { useState, useEffect } from "react";
import { useCharacters } from "../../../hooks/UseAllCharacters/useAllCharacters";
import { allCharacterVar } from "../../../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";
import SidebarSection from "../../molecules/sidebar-section/SidebarSection";

const SideBar = () => {
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
        allCharacter: characters.map(character => ({
          ...character,
          isFavorite: false,
          occupation: "nada"
        })), // Guardamos los personajes con las nuevas propiedades
        favoritesCharacter: characterState.favoritesCharacter, // Mantenemos favoritos sin cambios
      });
    }
  }, [characters]); // Solo ejecuta el efecto si `characters` cambia

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white h-screen flex flex-col pt-42 pr-20 pb-42 pl-20 md:bg-gray-50 ">
       <div className="w-full h-full overflow-auto " style={{border:"2px solid blue"}}>
      
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
    </div>
  );
};

export default SideBar;
