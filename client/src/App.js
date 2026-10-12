import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Exercice1 from "./pages/Exercice1";
import Exercice2 from "./pages/Exercice2"; 
import Exercice3 from "./pages/Exercice3";
import Exercice4 from "./pages/Exercice4";
import Exercice5 from "./pages/Exercice5";
import Exercice6 from "./pages/Exercice6";
import Exercice7 from "./pages/Exercice7";
import Exercice8 from "./pages/Exercice8";

function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Home />} />

        <Route path="/exercice-1" element={<Exercice1 />} />
<Route path="/exercice-2" element={<Exercice2 />} /> 
<Route path="/exercice-3" element={<Exercice3 />} /> 
<Route path="/exercice-4" element={<Exercice4 />} /> 
<Route path="/exercice-5" element={<Exercice5 />} /> 
<Route path="/exercice-6" element={<Exercice6 />} /> 
<Route path="/exercice-7" element={<Exercice7 />} /> 
<Route path="/exercice-8" element={<Exercice8 />} /> 


      </Routes>
    </BrowserRouter>
  );
}

export default App; 