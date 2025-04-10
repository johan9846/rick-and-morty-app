import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilteredCharacters } from "../../../hooks/UseAllCharacters/useFilteredCharacters";

import ROUTES from "../../../constants/routes/Routes";
import { filterVar } from "../../../apollo/reactiveVars";
import Country from "../Buttons-Menu/ButtonMenu";

const specieButton = [
  { name: "All", value: null },
  { name: "Human", value: "Human" },
  { name: "Alien", value: "Alien" },
];
const genderButton = [
  { name: "All", value: null },
  { name: "Male", value: "Male" },
  { name: "Female", value: "Female" },
];

export interface IFilterProps {
  gender: string | null;
  species: string | null;
}

const OptionFilter = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();

  const [filters, setFilter] = useState<IFilterProps>({
    gender: null,
    species: null,
  });

  const { fetchCharacters, updateLoading } = useFilteredCharacters();

  const handleGenderClick = (gender: string | null) => {
    setFilter({ ...filters, gender });
  };

  const handleSpeciesClick = (species: string | null) => {
    setFilter({ ...filters, species });
  };

  const handleFilter = async () => {
    try {
      updateLoading(true);

      const filtrosG = !filters.gender ? 0 : 1;
      const filtrosS = !filters.species ? 0 : 1;

      filterVar({
        ...filterVar(),
        selectedFiltersCount: filtrosG + filtrosS,
      });
      await fetchCharacters({ variables: filters });

      closeModal();
      navigate(ROUTES.HOME);
    } catch (error) {}
  };


  console.log(filters, "filterd")
  return (
    <div>
      <Country
        title={"Gender"}
        list={genderButton}
        filters={filters.gender}
        onChange={handleGenderClick}
      />

      <Country
        title={"Specie"}
        list={specieButton}
        filters={filters.species}
        onChange={handleSpeciesClick}
      />

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
