// Definir la interfaz de un personaje
export interface Character {
    id: string;
    name: string;
    species: string;
    gender: string;
    image: string;
    comments?: Comment[];
    occupation?: string;
    isFavorite?: boolean;


  }
  
  // Definir la interfaz de la respuesta de la API
  export interface CharactersData {
    characters: {
      results: Character[];
    };
  }
  
  // Definir la interfaz de las variables para GraphQL
  export interface CharactersVars {
    page: number;
  }
  