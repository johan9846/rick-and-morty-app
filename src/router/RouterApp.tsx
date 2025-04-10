import { BrowserRouter as Router } from "react-router-dom";
import Destktop from "../pages/Destktop/Destktop";
import MainTemplate from "../../src/components/templates/Main-Template/MainTemplate";

const RouterApp = () => {
  return (
    <Router basename="/rick-and-morty-app">
      <Destktop />
      <MainTemplate />
    </Router>
  );
};

export default RouterApp;
