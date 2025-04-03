import ArrowBackIcon from "../../../assets/icons/arrow_back_icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes/Routes";

const MenuFilterMob = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{ border: "2px solid yellow" }}
      className="md:hidden flex flex-col gap-20 ring-1 padding-24 h-screen w-screen md:h-278 md:w-343 bg-white z-50 p-24"
    >
      <div className="mb-20 mt-20 md:hidden">
        <img
          className=" h-24 w-24 cursor-pointer"
          src={ArrowBackIcon}
          alt="arrow_back_icon"
          onClick={() => navigate(ROUTES.HOME)}
        />
      </div>
      sdfsdfsdfsdfsdfsdfsdfsdfsd
    </section>
  );
};

export default MenuFilterMob;
