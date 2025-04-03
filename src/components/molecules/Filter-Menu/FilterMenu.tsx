import { useNavigate } from "react-router-dom";
import MenuFilterDsk from "../Menu-Filter-Dsk/MenuFilterDsk";
import ROUTES from "../../../constants/routes/Routes";
import filterIcon from "../../../assets/icons/filter_icon.svg";

const FilterMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <MenuFilterDsk/>
      </div>

      <button
        className="flex items-center justify-center hover:bg-primary100 h-38 w-38 rounded-[8px] md:hidden"
        onClick={() => {
          navigate(ROUTES.FILTER);
        }}
      >
        <img src={filterIcon} alt="filterIcon" />
      </button>
    </>
  );
};

export default FilterMenu;
