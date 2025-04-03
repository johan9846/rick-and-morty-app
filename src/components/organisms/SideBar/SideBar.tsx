import { useState, useEffect, useMemo } from "react";
import { useCharacters } from "../../../hooks/UseAllCharacters/useAllCharacters";
import { allCharacterVar } from "../../../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";
import SidebarSection from "../../molecules/Sidebar-Section/SidebarSection";
import FilterApp from "../Filter-APP/FilterApp";

const SideBar = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, characters } = useCharacters(page);

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

  console.log(listToShow, "listToShow");
  console.log(listToShow, "listToShow");

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className="bg-white h-screen flex flex-col pt-42 pr-20 pb-42 pl-20 md:bg-gray-50"
      style={{ border: "2px solid red" }}
    >
      <FilterApp />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-full h-auto overflow-auto mt-8">
            <SidebarSection
              title={`STARRED CHARACTERS (${favoritesCharacter.length})`}
              list={
                (listFilterCharacters ?? []).length > 0
                  ? listFilterCharacters.filter((char) =>
                      favoritesCharacter.some((fav) => fav.id === char.id)
                    )
                  : favoritesCharacter
              }
            />

            <SidebarSection
              title={`CHARACTERS (${listToShow.length})`}
              list={listToShow.filter(
                (char) => !favoritesCharacter.some((fav) => fav.id === char.id)
              )}
            />
          </div>

          <div
            className="flex w-full mt-[20px]"
            style={{ justifyContent: "center", gap: "20px" }}
          >
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className={`px-8 py-4 rounded-lg text-white font-semibold transition-all duration-200 ${
                page === 1
                  ? "bg-custom_gray_dark disabled:cursor-not-allowed disabled:text-custom_gray"
                  : "bg-primary600 hover:bg-primary700"
              }`}
            >
              Prev
            </button>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-8 py-2 rounded-lg bg-primary600 hover:bg-primary700 text-white font-semibold transition-all duration-200"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
