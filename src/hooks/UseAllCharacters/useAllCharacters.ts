import { useQuery, gql } from "@apollo/client";
import { CharactersData, CharactersVars } from "../interfaces/allCharacter.interface"; // Importar interfaces

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

export function useCharacters(page: number) {
  const { loading, error, data } = useQuery<CharactersData, CharactersVars>(
    GET_CHARACTERS,
    { variables: { page } }
  );

  return {
    loading,
    error,
    characters: data?.characters?.results || [],
  };
}
