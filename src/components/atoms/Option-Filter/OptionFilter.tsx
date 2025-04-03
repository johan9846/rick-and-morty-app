import { useState } from "react";
import { useFilteredCharacters } from "../../../hooks/UseAllCharacters/useFilteredCharacters"; // Importa el hook

const FilterPanel = () => {
  const [species, setSpecies] = useState<string | null>("All");
  const [gender, setGender] = useState<string | null>("All");

  const { loading, error, characters, fetchCharacters } = useFilteredCharacters();

  const handleGenderClick = (option: string) => {
    setGender(option === "All" ? "All" : option);
  };

  const handleSpeciesClick = (option: string) => {
    setSpecies(option === "All" ? "All" : option);
  };

  const handleFilter = () => {
    console.log("Filters Applied:", {
      species: species === "All" ? "All Species" : species,
      gender: gender === "All" ? "All Genders" : gender,
    });

    fetchCharacters({
      variables: {
        species: species === "All" ? null : species,
        gender: gender === "All" ? null : gender,
      },
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-80">
      <h3 className="text-lg font-semibold mb-2">Gender</h3>
      <div className="flex gap-2 mb-4">
        {["All", "Male", "Female"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-lg ${
              gender === "All" || gender === option ? "bg-purple-300" : "bg-gray-200"
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
              species === "All" || species === option ? "bg-purple-300" : "bg-gray-200"
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

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}
      <div className="mt-4">
        {characters.map((char) => (
          <div key={char.id} className="flex items-center gap-2">
            <img src={char.image} alt={char.name} className="w-10 h-10 rounded-full" />
            <p>{char.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
