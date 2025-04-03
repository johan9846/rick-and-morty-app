import { useState } from "react";
import { useFilteredCharacters } from "../../../hooks/UseAllCharacters/useFilteredCharacters"; // Importa el hook
import { allCharacterVar } from "../../../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";

import { CharactersData } from "../../../hooks/interfaces/allCharacter.interface";

const OptionFilter = () => {
  const [species, setSpecies] = useState<string | null>("All");
  const [gender, setGender] = useState<string | null>("All");

  const characterState = useReactiveVar(allCharacterVar);
  const { allCharacter, favoritesCharacter } = characterState; // Desestructuración

  const onCharactersFetched = (data: CharactersData) => {
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
      }
    }
  };

  const { fetchCharacters } = useFilteredCharacters(onCharactersFetched);

  const handleGenderClick = (option: string) => {
    setGender(option === "All" ? "All" : option);
  };

  const handleSpeciesClick = (option: string) => {
    setSpecies(option === "All" ? "All" : option);
  };

  const handleFilter = () => {
    const filters = {
      species: species === "All" ? null : species,
      gender: gender === "All" ? null : gender,
    };


    fetchCharacters({ variables: filters });
  };
  return (
    <div className="bg-white rounded-lg shadow-md ">
      <div className="text-[14px] font-medium mb-2 text-[#6B7280]">Gender</div>
      <div className="flex gap-2 mb-6 ">
        {["All", "Male", "Female"].map((option) => (
          <button
            key={option}
            className={`w-[102px] h-[44px] ${
              gender === "All" || gender === option
                ? "bg-[#EEE3FF] text-[14px] font-semibold rounded-[8px] text-[#8054C7]"
                : "border border-[1px] border-[#E5E7EB] text-[14px] font-semibold rounded-[8px] text-[#111827]"
            }`}
            onClick={() => handleGenderClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="text-[14px] font-medium mb-2 text-[#6B7280]">Specie</div>

      <div className="flex gap-2 mb-6">
        {["All", "Human", "Alien"].map((option) => (
          <button
            key={option}
            className={`w-[102px] h-[44px] ${
              species === "All" || species === option
                ? "bg-[#EEE3FF] text-[14px] font-semibold rounded-[8px] text-[#8054C7]"
                : "border border-[1px] border-[#E5E7EB] text-[14px] font-semibold rounded-[8px] text-[#111827]"
            }`}
            onClick={() => handleSpeciesClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="w-full bg-primary600 h-[38px]  text-[14px] text-white rounded-lg hover:bg-primary700"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default OptionFilter;
