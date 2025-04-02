import { makeVar } from "@apollo/client";

// Definir el tipo de los datos que manejarás en la variable reactiva
interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
}

// Definir el tipo de la variable reactiva
interface CharactersState {
  allCharacter: Character[];
  favoritesCharacter: Character[];
}

// Inicializar la variable reactiva con el tipo correcto
export const allCharacterVar = makeVar<CharactersState>({
  allCharacter: [],         // Arreglo de personajes
  favoritesCharacter: [],   // Arreglo de favoritos
});

export const filterVar = makeVar(null);
