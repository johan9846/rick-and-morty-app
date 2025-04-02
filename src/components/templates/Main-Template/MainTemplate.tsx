
import { useEffect } from "react";
import ROUTES from "../../../constants/routes/Routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "../../organisms/SideBar/SideBar";
import CharacterSelected from "../../organisms/Character-Selected/CharacterSelected";

const MainTemplate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(ROUTES.HOME);
  }, []);

  return (
    <main className="md:hidden w-screen h-screen">
      <Routes>
        <Route path={ROUTES.HOME} element={<SideBar />} />
        <Route path={ROUTES.SELECTED_CHARACTER} element={<CharacterSelected />} />

      </Routes>
    </main>
  );
};

export default MainTemplate;
