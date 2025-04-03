import { makeVar } from "@apollo/client";

// Definir el tipo de los datos que manejarás en la variable reactiva
interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  status:string;
  comments?: Comment[];
  occupation?: string;
  isFavorite?: boolean;
}

export interface Comment {
  id: string;
  comment: string;
}

// Definir el tipo de la variable reactiva
interface CharactersState {
  allCharacter: Character[];
  favoritesCharacter: Character[];
  characterSelected: Character | null; // Ahora puede ser un objeto Character
  listFilterCharacters: Character[] | []; // 🔥 Lista filtrada (corregido)
}
// Inicializar la variable reactiva con el tipo correcto
export const allCharacterVar = makeVar<CharactersState>({
  allCharacter: [],         // Arreglo de personajes
  favoritesCharacter: [],   // Arreglo de favoritos
  characterSelected:  null,   // Arreglo de seleccionados
  listFilterCharacters: [], // 🔥 Lista filtrada
});
export const filterVar = makeVar({ selectedFiltersCount: 0, filteredCharactersCount: 0 });
