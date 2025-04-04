import { allCharacterVar, ICharactersStateProps } from "../apollo/reactiveVars";

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
  characterState: ICharactersStateProps
) => {
  const isFavorite = characterState.allCharacter.find(
    (fav) => fav.id === character.id
  )?.isFavorite;
  const updatedCharacter = { ...character, isFavorite: !isFavorite };

  const updatedAllCharacters = characterState.allCharacter.map((char) =>
    char.id === character.id ? updatedCharacter : char
  );

  const updatedListFilterCharacters = characterState.listFilterCharacters.map(
    (char) => (char.id === character.id ? updatedCharacter : char)
  );

  const updatedListFilterCharactersApi =
    characterState.listFilterCharactersApi.map((char) =>
      char.id === character.id ? updatedCharacter : char
    );

  return {
    ...characterState,
    allCharacter: updatedAllCharacters,
    listFilterCharactersApi: updatedListFilterCharactersApi,
    characterSelected: updatedCharacter,
    listFilterCharacters: updatedListFilterCharacters,
  };
};

export const updateComments = (comment: Comment, id: string) => {
  const characterState = allCharacterVar();

  const updatedCharacter = [
    ...characterState.allCharacter,
    ...characterState.listFilterCharactersApi,
  ].find((character) => character.id === id);

  if (!updatedCharacter) return;

  const newCharacter = {
    ...updatedCharacter,
    comments: [comment, ...(updatedCharacter.comments ?? [])],
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

  const updatedCharacter = [
    ...characterState.allCharacter,
    ...characterState.listFilterCharactersApi,
  ].find((character) => character.id === characterId);

  if (!updatedCharacter) return;

  const newCharacter = {
    ...updatedCharacter,
    comments:
      updatedCharacter.comments?.filter(
        (comment) => comment.id !== commentId
      ) || [],
  };

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
