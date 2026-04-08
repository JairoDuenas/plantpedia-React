import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import CareGuides from "./pages/CareGuides";
import Community from "./pages/Community";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="guias" element={<CareGuides />} />
          <Route path="comunidad" element={<Community />} />
        </Route>
      </Routes>
    </Router>
  );
}
