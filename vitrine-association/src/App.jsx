// ...existing code...
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Galerie from "./pages/Galerie";
import Projets from "./pages/projets";
import GetInvolved from "./pages/Impliquer";
import Contact from "./pages/Contact";
import Home from "./pages/accueil";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Page d'accueil */}
          <Route path="/a-propos" element={<About />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/impliquer" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact />} /> {/* Page contact */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;