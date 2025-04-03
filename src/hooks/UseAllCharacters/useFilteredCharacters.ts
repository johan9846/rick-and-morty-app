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

export function useFilteredCharacters(onCompleted?: (data: CharactersData) => void) {
  // Definir una función `onCompletedWrapper` para asegurarnos de que no sea undefined
  const onCompletedWrapper = (data: CharactersData) => {
    if (onCompleted) {
      onCompleted(data); // Llamar la función proporcionada si existe
    }
  };

  // Ejecuta la consulta y llama `onCompletedWrapper` cuando termine
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
