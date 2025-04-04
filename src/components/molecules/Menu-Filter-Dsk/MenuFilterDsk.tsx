import { useState } from "react";

import filterIcon from "../../../assets/icons/filter_icon.svg";
import OptionFilter from "../../atoms/Option-Filter/OptionFilter";

const MenuFilterDsk = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <>
      <button
        className="flex items-center justify-center hover:bg-primary100 h-38 w-38 rounded-[8px] hidden md:flex"
        onClick={() => setOpen(!open)}
      >
        <img src={filterIcon} alt="filterIcon" />
      </button>

      <div
        style={{ display: open ? "block" : "none" }}
        className="absolute left-0 top-full hidden md:block flex-col ring-1 ring-black ring-opacity-5 shadow-lg rounded-[6px] h-[278px] w-[343px] h-auto bg-white z-50 p-6"
      >
        <OptionFilter closeModal={handleClose} />
      </div>
    </>
  );
};

export default MenuFilterDsk;
