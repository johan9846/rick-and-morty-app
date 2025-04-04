import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilteredCharacters } from "../../../hooks/UseAllCharacters/useFilteredCharacters"; 

import ROUTES from "../../../constants/routes/Routes";
import { filterVar } from "../../../apollo/reactiveVars";

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

interface IFilterProps {
  gender: string | null;
  specie: string | null;
}

const OptionFilter = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();

  const [filters, setFilter] = useState<IFilterProps>({
    gender: null,
    specie: null,
  });

  const { fetchCharacters, updateLoading } = useFilteredCharacters();

  const handleGenderClick = (gender: string | null) => {
    setFilter({ ...filters, gender });
  };

  const handleSpeciesClick = (specie: string | null) => {
    setFilter({ ...filters, specie });
  };

  const handleFilter = async () => {
    try {
      updateLoading(true);
      await fetchCharacters({ variables: filters });

      closeModal();
      navigate(ROUTES.HOME);
    } catch (error) {}
  };

  useEffect(() => {
    const filtrosG = !filters.gender ? 0 : 1;
    const filtrosS = !filters.specie ? 0 : 1;
    filterVar({
      ...filterVar(),
      selectedFiltersCount: filtrosG + filtrosS,
    });
  }, [filters.gender, filters.specie]);

  return (
    <div>
      <div className="text-[14px] font-medium font-greycliff mb-2 text-[#6B7280]">
        Gender
      </div>
      <div className="flex gap-2 mb-6 justify-between ">
        {genderButton.map((option) => (
          <button
            key={option.name}
            className={`w-[102px] h-[44px] font-greycliff rounded-[8px] text-[14px] font-semibold
      ${
        filters.gender === option.value
          ? "bg-[#EEE3FF] text-[#8054C7]"
          : "border border-[1px] border-[#E5E7EB] text-[#111827]"
      }`}
            onClick={() => handleGenderClick(option.value)}
          >
            {option.name}
          </button>
        ))}
      </div>

      <div className="text-[14px] font-medium font-greycliff mb-2 text-[#6B7280]">
        Specie
      </div>

      <div className="flex gap-2 mb-6 justify-between">
        {specieButton.map((option) => (
          <button
            key={option.name}
            className={`w-[102px] h-[44px] font-greycliff rounded-[8px] text-[14px] font-semibold
      ${
        filters.specie === option.value
          ? "bg-[#EEE3FF] text-[#8054C7]"
          : "border border-[1px] border-[#E5E7EB] text-[#111827]"
      }`}
            onClick={() => handleSpeciesClick(option.value)}
          >
            {option.name}
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
