import { useState } from "react";
import lenIcon from "../../../assets/icons/len_icon.svg";
import { filterResults } from "../../../utils/charactersUtils";

const FilterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
    filterResults(e.target.value);
  };

  return (
    <div className="flex">
      <img src={lenIcon} alt="Search Icon"  />
      <label className="flex relative w-full h-full">
        <input
          className="w-full h-full outline-none border-none text-custom_gray text-[14px] bg-transparent px-2"
          onChange={handleSearch}
          placeholder="Search or filter results"
          value={searchTerm}
        />
      </label>
    </div>
  );
};

export default FilterSearch;
