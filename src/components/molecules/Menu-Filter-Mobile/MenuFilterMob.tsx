import ArrowBackIcon from "../../../assets/icons/arrow_back_icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes/Routes";
import OptionFilter from "../../atoms/Option-Filter/OptionFilter";

const MenuFilterMob = () => {
  const navigate = useNavigate();

  return (
    <section className="md:hidden flex flex-col  h-screen w-screen md:h-278 md:w-343 bg-white z-50 p-24 pt-0 ">
      <div className=" h-[70px] md:hidden flex items-center ">
        <img
          className="h-[24px] w-[24px] cursor-pointer "
          src={ArrowBackIcon}
          alt="arrow_back_icon"
          onClick={() => navigate(ROUTES.HOME)}
        />
      </div>
      <OptionFilter closeModal={()=>navigate(ROUTES.HOME)} />
    </section>
  );
};

export default MenuFilterMob;
