import { BrowserRouter as Router } from "react-router-dom";
import { useReactiveVar } from "@apollo/client"; // Importa useReactiveVar
import Destktop from "../pages/Destktop/Destktop";
import MainTemplate from "../../src/components/templates/Main-Template/MainTemplate";
import { allCharacterVar } from "../../src/apollo/reactiveVars";

const RouterApp = () => {
  const allCharacterState = useReactiveVar(allCharacterVar); // Escucha cambios en la variable reactiva

  console.log("variables reactivas", allCharacterState); // Se actualizará automáticamente al cambiar

  return (
    <Router basename="/Rick-and-Morty">
      <Destktop />
      <MainTemplate />
    </Router>
  );
};

export default RouterApp;
