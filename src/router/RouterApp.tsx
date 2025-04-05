import { BrowserRouter as Router } from "react-router-dom";
import Destktop from "../pages/Destktop/Destktop";
import MainTemplate from "../../src/components/templates/Main-Template/MainTemplate";
import { allCharacterVar } from "../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";

const RouterApp = () => {
/*   const hola = useReactiveVar(allCharacterVar);
  console.log(hola, "hoalaa"); */
  return (
    <Router basename="/rick-and-morty-app">
      <Destktop />
      <MainTemplate />
    </Router>
  );
};

export default RouterApp;
