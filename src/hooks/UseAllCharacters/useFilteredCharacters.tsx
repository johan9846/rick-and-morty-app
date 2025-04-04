import { useLazyQuery, gql, useReactiveVar } from "@apollo/client";
import {
  CharactersData,
  FilterCharactersVars,
} from "../interfaces/allCharacter.interface";
import { allCharacterVar, filterVar } from "../../apollo/reactiveVars";

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
  const characterState = useReactiveVar(allCharacterVar);

  const filterVarState = useReactiveVar(filterVar);

  const [fetchCharacters, { error }] = useLazyQuery<
    CharactersData,
    FilterCharactersVars
  >(GET_FILTERED_CHARACTERS, {
    onCompleted: (data) => {
      const resultData = data.characters.results;

      console.log(resultData, "resultData");
      const resultsToShow = resultData
        .map((newChar) => {
          const existingChar = characterState.allCharacter.find(
            (oldChar) => oldChar.id === newChar.id
          );

          return {
            ...newChar,
            comments: existingChar?.comments ?? newChar.comments ?? [],
            occupation: newChar.occupation ?? "nada",
            isFavorite: existingChar?.isFavorite ?? newChar.isFavorite ?? false,
          };
        })
        .filter((ch) => {
          const idNum = Number(ch.id);
          return idNum >= 1 && idNum <= 20;
        });

      allCharacterVar({
        ...characterState,
        listFilterCharactersApi: resultsToShow,
        loading: false,
      });

      filterVar({
        ...filterVarState,
        filteredCharactersCount: resultsToShow.length,
      });
    },
  });
  const updateLoading = (loading: boolean) => {
    allCharacterVar({
      ...characterState,
      loading,
    });
  };

  return {
    updateLoading,
    loading: characterState.loading,
    error,
    characterState,
    fetchCharacters,
  };
}
