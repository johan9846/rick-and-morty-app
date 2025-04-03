import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilteredCharacters } from "../../../hooks/UseAllCharacters/useFilteredCharacters"; // Importa el hook
import { allCharacterVar, filterVar } from "../../../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";

import { CharactersData } from "../../../hooks/interfaces/allCharacter.interface";
import ROUTES from "../../../constants/routes/Routes";

const OptionFilter = ({
  closeModal,
}: {
  closeModal: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [species, setSpecies] = useState<string | null>("All");
  const [gender, setGender] = useState<string | null>("All");

  const characterState = useReactiveVar(allCharacterVar);
  const { allCharacter, favoritesCharacter } = characterState; // Desestructuración

  const onCharactersFetched = (data: CharactersData) => {
    closeModal(false);

    const characters = data.characters?.results || [];

    if (characters.length > 0) {
      // Crear un mapa con los personajes actuales por ID
      const characterMap = new Map(allCharacter.map((char) => [char.id, char]));

      // Generar la nueva lista de personajes
      const updatedCharacters = characters.map(
        (character) =>
          characterMap.has(character.id)
            ? characterMap.get(character.id)! // Mantiene los datos si ya existe
            : { ...character, isFavorite: false, occupation: "nada" } // Agrega los nuevos con valores por defecto
      );

      // Solo actualiza si hay cambios
      if (JSON.stringify(updatedCharacters) !== JSON.stringify(allCharacter)) {
        allCharacterVar({
          allCharacter: updatedCharacters,
          favoritesCharacter,
          characterSelected: null,
          listFilterCharacters: updatedCharacters,
        });

        filterVar({
          selectedFiltersCount: [species, gender].filter(
            (filter) => filter !== "All"
          ).length,
          filteredCharactersCount: updatedCharacters.length,
        });
      }

      navigate(ROUTES.HOME);
    }
  };

  const { fetchCharacters } = useFilteredCharacters(onCharactersFetched);

  const handleGenderClick = (option: string) => {
    if (option === "All") {
      setGender("All");
    } else {
      setGender(option);
    }
  };

  const handleSpeciesClick = (option: string) => {
    if (option === "All") {
      setSpecies("All");
    } else {
      setSpecies(option);
    }
  };

  const handleFilter = () => {
    const filters = {
      species: species === "All" ? null : species,
      gender: gender === "All" ? null : gender,
    };

    fetchCharacters({ variables: filters });
  };
  return (
    <div>
      <div className="text-[14px] font-medium font-greycliff mb-2 text-[#6B7280]">
        Gender
      </div>
      <div className="flex gap-2 mb-6 justify-between ">
        {["All", "Male", "Female"].map((option) => (
          <button
            key={option}
            className={`w-[102px] h-[44px] font-greycliff rounded-[8px] text-[14px] font-semibold
      ${
        gender === option
          ? "bg-[#EEE3FF] text-[#8054C7]"
          : "border border-[1px] border-[#E5E7EB] text-[#111827]"
      }`}
            onClick={() => handleGenderClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="text-[14px] font-medium font-greycliff mb-2 text-[#6B7280]">
        Specie
      </div>

      <div className="flex gap-2 mb-6 justify-between">
        {["All", "Human", "Alien"].map((option) => (
          <button
            key={option}
            className={`w-[102px] h-[44px] font-greycliff rounded-[8px] text-[14px] font-semibold
      ${
        species === option
          ? "bg-[#EEE3FF] text-[#8054C7]"
          : "border border-[1px] border-[#E5E7EB] text-[#111827]"
      }`}
            onClick={() => handleSpeciesClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="bg-primary600 h-[38px] text-[14px] text-white rounded-lg hover:bg-primary700 
   w-full md:max-w-full max-w-[calc(100%-48px)] mx-auto 
   absolute md:static bottom-[24px] left-0 right-0"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default OptionFilter;
