import { useEffect, useState } from "react";
import { useFilteredCharacters } from "../../../hooks/UseAllCharacters/useFilteredCharacters"; // Importa el hook
import { allCharacterVar } from "../../../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";

const OptionFilter = () => {
  const [species, setSpecies] = useState<string | null>("All");
  const [gender, setGender] = useState<string | null>("All");
  const { characters, fetchCharacters } = useFilteredCharacters();

  const characterState = useReactiveVar(allCharacterVar);
  const { allCharacter, favoritesCharacter } = characterState; // Desestructuración
  
  useEffect(() => {
    if (characters && characters.length > 0) {
      // Crear un mapa con los personajes actuales para acceso rápido por ID
      const characterMap = new Map(allCharacter.map((char) => [char.id, char]));
  
      // Generar la nueva lista de personajes
      const updatedCharacters = characters.map((character) =>
        characterMap.has(character.id)
          ? characterMap.get(character.id)! // Mantiene los datos si ya existe
          : { ...character, isFavorite: false, occupation: "nada" } // Agrega los nuevos con valores por defecto
      );
  
      // Solo actualiza si hay cambios en la lista
      if (JSON.stringify(updatedCharacters) !== JSON.stringify(allCharacter)) {
        allCharacterVar({
          allCharacter: updatedCharacters,
          favoritesCharacter, // Mantiene los favoritos
          characterSelected: null,
          listFilterCharacters: updatedCharacters, // Asegurar que la lista de filtrados también se actualice
        });
      }
    }
  }, [characters, allCharacter]); // Escuchar cambios en characters y allCharacter
  

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

    console.log("Filters Applied:", filters);

    fetchCharacters({ variables: filters });
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-80">
      <h3 className="text-lg font-semibold mb-2">Gender</h3>
      <div className="flex gap-2 mb-4">
        {["All", "Male", "Female"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-lg ${
              gender === "All" || gender === option
                ? "bg-purple-300"
                : "bg-gray-200"
            }`}
            onClick={() => handleGenderClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-2">Specie</h3>
      <div className="flex gap-2 mb-4">
        {["All", "Human", "Alien"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-lg ${
              species === "All" || species === option
                ? "bg-purple-300"
                : "bg-gray-200"
            }`}
            onClick={() => handleSpeciesClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default OptionFilter;
