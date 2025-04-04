import { useMemo } from "react";

import SidebarSection from "../../molecules/Sidebar-Section/SidebarSection";
import FilterApp from "../Filter-APP/FilterApp";
import { useFilteredCharacters } from "../../../hooks/UseAllCharacters/useFilteredCharacters";

const SideBar = ({ loading }: { loading?: boolean }) => {
  const {
    characterState,
    error,
    loading: filterLoading,
  } = useFilteredCharacters();

  const {
    allCharacter,
    listFilterCharactersApi,
    listFilterCharacters = [],
  } = characterState;

  const listToShow = useMemo(() => {
    if (
      listFilterCharacters.length === 0 &&
      listFilterCharactersApi.length === 0
    ) {
      return allCharacter;
    }
    if (listFilterCharacters.length === 0) {
      return listFilterCharactersApi;
    }
    return listFilterCharacters;
  }, [listFilterCharacters, allCharacter, listFilterCharactersApi]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white h-screen flex flex-col pt-42 pr-16 pb-[112px] pl-16 md:bg-gray-50">
      <h1 className="text-2xl min-h-40 mb-17 font-bold">Rick and Morty list</h1>

      <FilterApp />

      {loading || filterLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-full h-auto overflow-auto">
            <SidebarSection
              title={`STARRED CHARACTERS (${
                listToShow.filter((char) => char.isFavorite).length
              })`}
              list={listToShow.filter((char) => char.isFavorite)}
            />
            <SidebarSection
              title={`CHARACTERS (${
                listToShow.filter((char) => !char.isFavorite).length
              })`}
              list={listToShow.filter((char) => !char.isFavorite)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
