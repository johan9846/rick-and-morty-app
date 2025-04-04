import { useLazyQuery, gql } from "@apollo/client";
import { CharactersData, FilterCharactersVars } from "../interfaces/allCharacter.interface"; // Importar interfaces

const GET_FILTERED_CHARACTERS = gql`
  query GetCharacters($species: String, $gender: String) {
    characters(filter: { species: $species, gender: $gender }) {
      results {
        id
        name
        image
        species
        gender
      }
    }
  }
`;

export function useFilteredCharacters(onQueryComplete?: (data: CharactersData) => void) {
  // Definir una función `onCompletedWrapper` para asegurar que no sea undefined
  const onCompletedWrapper = (data: CharactersData) => {
    if (onQueryComplete) {
      onQueryComplete(data); // Llamar a la función proporcionada si existe
    }
  };

  // Ejecutar la consulta y llamar `onCompletedWrapper` cuando termine
  const [fetchCharacters, { loading, error, data }] = useLazyQuery<CharactersData, FilterCharactersVars>(
    GET_FILTERED_CHARACTERS,
    {
      onCompleted: onCompletedWrapper, // Se ejecuta cuando los datos están listos
    }
  );

  return {
    loading,
    error,
    characters: data?.characters?.results || [],
    fetchCharacters,
  };
}
