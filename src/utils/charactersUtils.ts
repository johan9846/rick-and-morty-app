import { allCharacterVar, ICharactersStateProps } from "../apollo/reactiveVars";

export interface CharacterVar {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  comments?: Comment[]; // Asegúrate de que los comentarios sean un array de strings
  occupation?: string;
  isFavorite?: boolean;
}

export interface Comment {
  id: string;
  comment: string;
}

export const toggleFavoriteCharacter = (
  character: CharacterVar,
  characterState: ICharactersStateProps
) => {
  const isFavorite = characterState.allCharacter.find(
    (fav) => fav.id === character.id
  )?.isFavorite;
  const updatedCharacter = { ...character, isFavorite: !isFavorite };

  // Actualizar la lista de todos los personajes
  const updatedAllCharacters = characterState.allCharacter.map((char) =>
    char.id === character.id ? updatedCharacter : char
  );

  // Si hay una búsqueda activa, actualizamos listFilterCharacters
  const updatedListFilterCharacters = characterState.listFilterCharacters.map(
    (char) => (char.id === character.id ? updatedCharacter : char)
  );
  // Si hay una búsqueda activa, actualizamos listFilterCharacters
  const updatedListFilterCharactersApi =
    characterState.listFilterCharactersApi.map((char) =>
      char.id === character.id ? updatedCharacter : char
    );

  return {
    ...characterState, // Mantiene las demás propiedades sin cambios
    allCharacter: updatedAllCharacters,
    listFilterCharactersApi: updatedListFilterCharactersApi,
    characterSelected: updatedCharacter,
    listFilterCharacters: updatedListFilterCharacters, // 🔥 Aseguramos que se actualice la lista filtrada
  };
};

// Función para actualizar comentarios
export const updateComments = (comment: Comment, id: string) => {
  const characterState = allCharacterVar();

  // Combinar allCharacter y favoritesCharacter y buscar el personaje
  const updatedCharacter = [
    ...characterState.allCharacter,
    ...characterState.listFilterCharactersApi,
  ].find((character) => character.id === id);

  if (!updatedCharacter) return;

  // Crear una nueva versión del personaje con el comentario agregado
  const newCharacter = {
    ...updatedCharacter,
    comments: [comment, ...(updatedCharacter.comments ?? [])], // Asegurar que comments sea del tipo Comment[]
  };

  allCharacterVar({
    ...characterState,
    allCharacter: characterState.allCharacter.map((char) =>
      char.id === id ? newCharacter : char
    ),
    listFilterCharactersApi: characterState.listFilterCharactersApi.map(
      (char) => (char.id === id ? newCharacter : char)
    ),
    characterSelected:
      characterState.characterSelected?.id === id
        ? newCharacter
        : characterState.characterSelected,
  });
};

export const deleteComment = (commentId: string, characterId: string) => {
  const characterState = allCharacterVar();

  // Buscar el personaje en allCharacter y favoritesCharacter
  const updatedCharacter = [
    ...characterState.allCharacter,
    ...characterState.listFilterCharactersApi,
  ].find((character) => character.id === characterId);

  if (!updatedCharacter) return;

  // Crear una nueva versión del personaje con el comentario eliminado
  const newCharacter = {
    ...updatedCharacter,
    comments:
      updatedCharacter.comments?.filter(
        (comment) => comment.id !== commentId
      ) || [],
  };

  // Actualizar la variable reactiva con el nuevo personaje
  allCharacterVar({
    ...characterState,
    allCharacter: characterState.allCharacter.map((char) =>
      char.id === characterId ? newCharacter : char
    ),
    listFilterCharactersApi: characterState.listFilterCharactersApi.map(
      (char) => (char.id === characterId ? newCharacter : char)
    ),
    characterSelected:
      characterState.characterSelected?.id === characterId
        ? newCharacter
        : characterState.characterSelected,
  });
};

export const filterResults = (parameter: string) => {
  const characterState = allCharacterVar();

  if (!parameter.trim()) {
    console.log("search");
    
    allCharacterVar({
      ...characterState,
      listFilterCharacters: [],
    });

    return;
  }
  const { allCharacter, listFilterCharactersApi } = characterState;

  let listToShow = allCharacter;
  if (listFilterCharactersApi.length > 0) {
    listToShow = listFilterCharactersApi;
  }
 
  
  const listFilterCharacters = listToShow.filter((character) => {
    const name = character?.name ?? "";
    const status = character?.status ?? "";
    const species = character?.species ?? "";
  
    return (
      name.toLocaleLowerCase().includes(parameter.toLocaleLowerCase()) ||
      status.toLocaleLowerCase().includes(parameter.toLocaleLowerCase()) ||
      species.toLocaleLowerCase().includes(parameter.toLocaleLowerCase())
    );
  });
  

  allCharacterVar({
    ...characterState,
    listFilterCharacters,
  });
};

export const orderList = (order: "asc" | "desc") => {
  const characterState = allCharacterVar();
console.log("ordr list");

  // Asegurar que TypeScript entienda el tipo de los parámetros
  const sortFunction = (a: CharacterVar, b: CharacterVar) =>
    order === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);

  allCharacterVar({
    ...characterState,
    allCharacter: [...characterState.allCharacter].sort(sortFunction),
    listFilterCharactersApi: [...characterState.listFilterCharactersApi].sort(
      sortFunction
    ),
    listFilterCharacters: [...characterState.listFilterCharacters].sort(
      sortFunction
    ),
  });
};
