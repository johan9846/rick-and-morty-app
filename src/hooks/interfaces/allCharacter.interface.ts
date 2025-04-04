
export interface Character {
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

export interface CharactersData {
  characters: {
    results: Character[];
  };
}

export interface CharactersVars {
  page: number;
}

export interface FilterCharactersVars {
  species?: string | null;
  gender?: string | null;
}
