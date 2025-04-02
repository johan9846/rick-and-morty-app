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

// Función para alternar favoritos
export const toggleFavoriteCharacter = (character: CharacterVar) => {
  const characterState = allCharacterVar();

  const isFavorite = characterState.favoritesCharacter.some(
    (fav) => fav.id === character.id
  );

  const updatedCharacter = { ...character, isFavorite: !isFavorite };

  allCharacterVar({
    allCharacter: characterState.allCharacter.map((char) =>
      char.id === character.id ? updatedCharacter : char
    ),
    favoritesCharacter: isFavorite
      ? characterState.favoritesCharacter.filter((fav) => fav.id !== character.id)
      : [...characterState.favoritesCharacter, updatedCharacter],
    characterSelected:
      characterState.characterSelected?.id === character.id
        ? updatedCharacter // Asegurar que `characterSelected` refleje el cambio en isFavorite
        : characterState.characterSelected,
  });
};






// Función para actualizar comentarios
export const updateComments = (comment: Comment, id: string) => {
  const characterState = allCharacterVar();

  // Buscar el personaje en allCharacter
  const updatedCharacter = characterState.allCharacter.find(
    (character) => character.id === id
  );

  if (!updatedCharacter) return;

  // Crear una nueva versión del personaje con el comentario agregado
  const newCharacter = {
    ...updatedCharacter,
    comments: [comment, ...(updatedCharacter.comments ?? [])], // Asegurar que comments sea del tipo Comment[]
  };

  allCharacterVar({
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

  const updatedCharacter = characterState.allCharacter.find(
    (character) => character.id === characterId
  );

  if (!updatedCharacter) return;

  const newCharacter = {
    ...updatedCharacter,
    comments: updatedCharacter.comments?.filter(comment => comment.id !== commentId) || [],
  };

  allCharacterVar({
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

