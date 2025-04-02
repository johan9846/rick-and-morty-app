import { allCharacterVar } from "../apollo/reactiveVars";

export interface CharacterVar {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  comments?: Comment[];
  occupation?: string;
  isFavorite?: boolean;
}

// Función para alternar favoritos
export const toggleFavoriteCharacter = (character: CharacterVar) => {
  // Obtenemos el estado actual
  const characterState = allCharacterVar();

  // Determinamos si el personaje ya es favorito
  const isFavorite = characterState.favoritesCharacter.some(
    (fav) => fav.id === character.id
  );

  if (isFavorite) {
    // Si está en favoritos, lo quitamos de favoritesCharacter y lo volvemos a agregar a allCharacter
    allCharacterVar({
      allCharacter: [
        ...characterState.allCharacter,
        { ...character, isFavorite: false },
      ],
      favoritesCharacter: characterState.favoritesCharacter.filter(
        (fav) => fav.id !== character.id
      ),
    });
  } else {
    // Si no está en favoritos, lo pasamos a favoritesCharacter y lo eliminamos de allCharacter
    allCharacterVar({
      allCharacter: characterState.allCharacter.filter(
        (char) => char.id !== character.id
      ),
      favoritesCharacter: [ 
        ...characterState.favoritesCharacter,
        { ...character, isFavorite: true },
      ],
    });
  }
};
