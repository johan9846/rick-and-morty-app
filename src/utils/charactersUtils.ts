import { allCharacterVar } from "../apollo/reactiveVars";

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

export const toggleFavoriteCharacter = (character: CharacterVar) => {
  const characterState = allCharacterVar();

  const isFavorite = characterState.favoritesCharacter.some(
    (fav) => fav.id === character.id
  );
  const updatedCharacter = { ...character, isFavorite: !isFavorite };

  // Actualizar la lista de todos los personajes
  const updatedAllCharacters = characterState.allCharacter.map((char) =>
    char.id === character.id ? updatedCharacter : char
  );

  // Si hay una búsqueda activa, actualizamos listFilterCharacters
  const updatedListFilterCharacters = characterState.listFilterCharacters.map(
    (char) => (char.id === character.id ? updatedCharacter : char)
  );

  allCharacterVar({
    ...characterState, // Mantiene las demás propiedades sin cambios
    allCharacter: updatedAllCharacters,
    favoritesCharacter: isFavorite
      ? characterState.favoritesCharacter.filter(
          (fav) => fav.id !== character.id
        )
      : [...characterState.favoritesCharacter, updatedCharacter],
    characterSelected:
      characterState.characterSelected?.id === character.id
        ? updatedCharacter
        : characterState.characterSelected,
    listFilterCharacters: updatedListFilterCharacters, // 🔥 Aseguramos que se actualice la lista filtrada
  });
};

// Función para actualizar comentarios
export const updateComments = (comment: Comment, id: string) => {
  const characterState = allCharacterVar();

  // Combinar allCharacter y favoritesCharacter y buscar el personaje
  const updatedCharacter = [...characterState.allCharacter, ...characterState.favoritesCharacter]
    .find((character) => character.id === id);

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
    favoritesCharacter: characterState.favoritesCharacter.map((char) =>
      char.id === id ? newCharacter : char
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
  const updatedCharacter = [...characterState.allCharacter, ...characterState.favoritesCharacter]
    .find((character) => character.id === characterId);

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
    favoritesCharacter: characterState.favoritesCharacter.map((char) =>
      char.id === characterId ? newCharacter : char
    ),
    characterSelected:
      characterState.characterSelected?.id === characterId
        ? newCharacter
        : characterState.characterSelected,
  });
};


export const filterResults = (parameter: string) => {
  const characterState = allCharacterVar();

  // Verificar si el parámetro está vacío para resetear la lista
  if (!parameter.trim()) {
    allCharacterVar({
      ...characterState,
      listFilterCharacters: [],
    });
    console.log("listFilterCharacters vacío porque no hay parámetro de búsqueda:", []);
    return;
  }

  // Combinar allCharacter y favoritesCharacter asegurando que no haya duplicados
  const combinedCharacters = [
    ...characterState.allCharacter,
    ...characterState.favoritesCharacter.filter(
      (fav) => !characterState.allCharacter.some((char) => char.id === fav.id)
    ),
  ];

  // Aplicar el filtro a la lista combinada
  const filteredCharacters = combinedCharacters.filter((character) =>
    [character.name, character.status, character.species]
      .map((value) => value.toLowerCase())
      .some((field) => field.includes(parameter.toLowerCase()))
  );

  // Si no hay coincidencias, asegurar que la lista sea un array vacío
  const finalFilteredCharacters = filteredCharacters.length > 0 ? filteredCharacters : [];

  console.log("listFilterCharacters después de filtrar:", finalFilteredCharacters);

  // Actualizar la variable reactiva
  allCharacterVar({
    ...characterState,
    listFilterCharacters: finalFilteredCharacters,
  });
};






export const orderList = (order: "asc" | "desc") => {
  const characterState = allCharacterVar();

  // Asegurar que TypeScript entienda el tipo de los parámetros
  const sortFunction = (a: CharacterVar, b: CharacterVar) =>
    order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);

  allCharacterVar({
    ...characterState,
    allCharacter: [...characterState.allCharacter].sort(sortFunction),
    favoritesCharacter: [...characterState.favoritesCharacter].sort(sortFunction),
    listFilterCharacters: [...characterState.listFilterCharacters].sort(sortFunction),
  });
};




