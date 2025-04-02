import { useState } from "react";

import lenIcon from "../../../assets/icons/len_icon.svg";

const FilterSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <span className="flex relative items-center justify-between w-full bg-[#F3F4F6] h-52 rounded-[8px] pt-9 pr-13 pb-9 pl-20">
        <img src={lenIcon} alt="lenIcon" />
        <label className="flex relative w-full h-34">
          <input
            className="w-full h-full outline-none border-none text-custom_gray text-14 bg-transparent p-2"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search or filter results"
            value={searchTerm}
          />
        </label>
      </span>
    </div>
  );
};

export default FilterSearch;
