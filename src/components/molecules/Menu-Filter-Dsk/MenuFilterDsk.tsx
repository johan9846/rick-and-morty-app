import { useState } from "react";

import filterIcon from "../../../assets/icons/filter_icon.svg";
import OptionFilter from "../../atoms/Option-Filter/OptionFilter";

const MenuFilterDsk = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <button
      className="flex items-center justify-center hover:bg-primary100 h-38 w-38 rounded-[8px] hidden md:flex"
      onClick={() => setOpen(!open)}
    >
      <img src={filterIcon} alt="filterIcon" />
    </button>
  
    {open && (
      <div className="absolute left-0 top-full hidden md:block gap-2 flex-col justify-between ring-1 ring-black ring-opacity-5 shadow-lg p-6 rounded-md min-h-[278px] w-[343px] h-auto bg-white z-50">
        <OptionFilter />
      </div>
    )}
  </>
  );
};

export default MenuFilterDsk;
