import {  useEffect, useMemo } from "react";
import { useCharacters } from "../../../hooks/UseAllCharacters/useAllCharacters";
import { allCharacterVar } from "../../../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";
import SidebarSection from "../../molecules/Sidebar-Section/SidebarSection";
import FilterApp from "../Filter-APP/FilterApp";

const SideBar = () => {
  
  const { loading, error, characters } = useCharacters(1);

  // Obtener el estado actual de la variable reactiva
  const characterState = useReactiveVar(allCharacterVar);
  const {
    allCharacter,
    favoritesCharacter,
    listFilterCharacters = [],
  } = characterState; // Desestructuración

  useEffect(() => {
    if (
      characters &&
      JSON.stringify(characters) !== JSON.stringify(allCharacter)
    ) {
      allCharacterVar({
        allCharacter: characters.map((character) => ({
          ...character,
          isFavorite: false,
          occupation: "nada",
        })), // Guardamos los personajes con nuevas propiedades
        favoritesCharacter, // Mantener favoritos sin cambios
        characterSelected: null,
        listFilterCharacters: [],
      });
    }
  }, [characters]); // Solo ejecuta el efecto si `characters` cambia

  // Usar useMemo para decidir qué lista mostrar
  const listToShow = useMemo(
    () =>
      (listFilterCharacters ?? []).length > 0
        ? listFilterCharacters
        : allCharacter,
    [listFilterCharacters, allCharacter]
  );

  console.log(listFilterCharacters, "holaaa");

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white h-screen flex flex-col pt-42 pr-20 pb-42 pl-20 md:bg-gray-50">
      <FilterApp />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            className="w-full h-auto overflow-auto"
            style={{ border: "2px solid blue" }}
          >
            <SidebarSection
              title="Starred Characters"
              list={listToShow.filter((char) => char.isFavorite)}
            />
            <SidebarSection
              title="CHARACTERS"
              list={listToShow.filter((char) => !char.isFavorite)}
            />
          </div>

       
        </>
      )}
    </div>
  );
};

export default SideBar;
