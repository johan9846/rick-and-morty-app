import { useQuery, gql } from "@apollo/client";
import {
  CharactersData,
  CharactersVars,
} from "../interfaces/allCharacter.interface"; 
import { allCharacterVar } from "../../apollo/reactiveVars";

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

export function useCharacters() {
  const { loading, error, data } = useQuery<CharactersData, CharactersVars>(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
      onCompleted: (data) => {
        console.log("etnrre")
        const result = data.characters.results.map((ch) => ({
          ...ch,
          comments: [],
          occupation: "nada",
          isFavorite: false,
        }));
      
        allCharacterVar({
          allCharacter: result,
          listFilterCharactersApi: [],
          characterSelected: null,
          listFilterCharacters: [],
        });
      },
    }
  );

  return {
    loading,
    error,
    characters: data?.characters?.results || [],
  };
}
