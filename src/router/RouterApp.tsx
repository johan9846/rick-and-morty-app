import { BrowserRouter as Router } from "react-router-dom";
import Destktop from "../pages/Destktop/Destktop";


const RouterApp = () => {
  return (
    <Router basename="/Rick-and-Morty">
     <Destktop/>
    </Router>
  )
}

export default RouterApp
