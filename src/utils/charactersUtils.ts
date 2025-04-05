import { allCharacterVar} from "../apollo/reactiveVars";

export interface CharacterVar {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  comments?: Comment[];
  occupation?: string;
  isFavorite?: boolean;
}

export interface Comment {
  id: string;
  comment: string;
}

export const toggleFavoriteCharacter = (
  character: CharacterVar,
 
) => {

  const characterState = allCharacterVar();
  const updatedAllCharacters = characterState.allCharacter.map((char) =>
    char.id === character.id
      ? { ...character, isFavorite: !char.isFavorite }
      : char
  );

  const updatedListFilterCharacters = characterState.listFilterCharacters.map(
    (char) =>
      char.id === character.id
        ? { ...character, isFavorite: !char.isFavorite }
        : char
  );

  const updatedListFilterCharactersApi =
    characterState.listFilterCharactersApi.map((char) =>
      char.id === character.id
        ? { ...character, isFavorite: !char.isFavorite }
        : char
    );

  return {
    ...characterState,
    allCharacter: updatedAllCharacters,
    listFilterCharactersApi: updatedListFilterCharactersApi,
    characterSelected:
      characterState.characterSelected?.id === character.id
        ? {
            ...characterState.characterSelected,
            isFavorite: !characterState.characterSelected.isFavorite,
          }
        : characterState.characterSelected,

    listFilterCharacters: updatedListFilterCharacters,
  };
};

export const updateComments = (comment: Comment, id: string) => {
  const characterState = allCharacterVar();

  const updateComment = [
    ...characterState.allCharacter,
    ...characterState.listFilterCharactersApi,
  ].find((character) => character.id === id);
  if (!updateComment) return; // Si no encontramos el personaje, no hacemos nada.

  allCharacterVar({
    ...characterState,
    allCharacter: characterState.allCharacter.map((char) =>
      char.id === id
        ? {
            ...char,
            comments: char.comments ? [...char.comments, comment] : [comment], // Agregar al array si ya existe, si no, crear un nuevo array con el comentario
          }
        : char
    ),
    listFilterCharactersApi: characterState.listFilterCharactersApi.map(
      (char) =>
        char.id === id
          ? {
              ...char,
              comments: char.comments ? [...char.comments, comment] : [comment],
            }
          : char
    ),
    characterSelected:
      characterState.characterSelected?.id === id
        ? {
            ...characterState.characterSelected,
            comments: characterState.characterSelected.comments
              ? [...characterState.characterSelected.comments, comment]
              : [comment], // Agregar el comentario al array existente o crear uno nuevo
          }
        : characterState.characterSelected,
  });
};

export const deleteComment = (commentId: string, characterId: string) => {
  const characterState = allCharacterVar();

  const deleteComment = [
    ...characterState.allCharacter,
    ...characterState.listFilterCharactersApi,
  ].find((character) => character.id === characterId);
  if (!deleteComment) return; // Si no encontramos el personaje, no hacemos nada.

  allCharacterVar({
    ...characterState,
    allCharacter: characterState.allCharacter.map((char) =>
      char.id === characterId
        ? {
            ...char,
            comments: char.comments
              ? char.comments.filter((comment) => comment.id !== commentId) // Eliminar el comentario
              : [],
          }
        : char
    ),
    listFilterCharactersApi: characterState.listFilterCharactersApi.map(
      (char) =>
        char.id === characterId
          ? {
              ...char,
              comments: char.comments
                ? char.comments.filter((comment) => comment.id !== commentId) // Eliminar el comentario
                : [],
            }
          : char
    ),
    characterSelected:
      characterState.characterSelected?.id === characterId
        ? {
            ...characterState.characterSelected,
            comments: characterState.characterSelected.comments
              ? characterState.characterSelected.comments.filter(
                  (comment) => comment.id !== commentId // Eliminar el comentario
                )
              : [],
          }
        : characterState.characterSelected,
  });
};

export const filterResults = (parameter: string) => {
  const characterState = allCharacterVar();

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
