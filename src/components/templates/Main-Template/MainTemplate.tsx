import ROUTES from "../../../constants/routes/Routes";
import { Route, Routes } from "react-router-dom";
import SideBar from "../../organisms/SideBar/SideBar";
import CharacterSelected from "../../organisms/Character-Selected/CharacterSelected";
import MenuFilterMob from "../../molecules/Menu-Filter-Mobile/MenuFilterMob";

const MainTemplate = () => {
  return (
    <main className="md:hidden w-screen h-screen">
      <Routes>
        <Route path={ROUTES.HOME} element={<SideBar />} />
        <Route
          path={ROUTES.SELECTED_CHARACTER}
          element={<CharacterSelected />}
        />
        <Route path={ROUTES.FILTER} element={<MenuFilterMob />} />
      </Routes>
    </main>
  );
};

export default MainTemplate;
