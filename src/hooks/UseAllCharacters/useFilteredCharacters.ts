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

export function useFilteredCharacters() {
  // Solo ejecuta la consulta cuando `fetchCharacters` es llamado
  const [fetchCharacters, { loading, error, data }] = useLazyQuery<
    CharactersData,
    FilterCharactersVars
  >(GET_FILTERED_CHARACTERS);

  return {
    loading,
    error,
    characters: data?.characters?.results || [],
    fetchCharacters, // Llamar manualmente para obtener los personajes
  };
}
