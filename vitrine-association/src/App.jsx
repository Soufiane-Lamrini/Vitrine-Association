// ...existing code...
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Galerie from "./pages/Galerie";
import Projets from "./pages/projets";
import GetInvolved from "./pages/Impliquer"; // Ajout de l'import
import Layout from "./components/Layout"; // Import Layout component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/impliquer" element={<GetInvolved />} /> {/* Nouvelle route */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;