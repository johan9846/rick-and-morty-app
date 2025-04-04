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

      const resultsToShow = resultData
        .filter(
          (cf) =>
            !characterState.allCharacter.some(
              (cs) => (cs.id === cf.id && cs.isFavorite) || cs.id === cf.id
            )
        )
        .map((ch) => ({
          ...ch,
          comments: ch.comments ?? [],
          occupation: ch.occupation ?? "nada",
          isFavorite: ch.isFavorite ?? false,
        }));

      /*  console.log(resultsToShow); */

      allCharacterVar({
        ...characterState,
        listFilterCharactersApi: resultsToShow,
        loading: false,
      });

      filterVar({
        ...filterVarState,
        filteredCharactersCount:
          filterVarState.selectedFiltersCount > 0 ? resultsToShow.length : 0,
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
