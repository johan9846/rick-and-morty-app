import { makeVar } from "@apollo/client";


interface Character {
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


export interface ICharactersStateProps {
  allCharacter: Character[];
  listFilterCharactersApi: Character[];
  characterSelected: Character | null;
  listFilterCharacters: Character[] | []; 
  loading?: boolean;
}

export const allCharacterVar = makeVar<ICharactersStateProps>({
  allCharacter: [], 
  listFilterCharactersApi: [], 
  characterSelected: null, 
  listFilterCharacters: [], 
  loading: false,
});
export const filterVar = makeVar({
  selectedFiltersCount: 0,
  filteredCharactersCount: 0,
});
