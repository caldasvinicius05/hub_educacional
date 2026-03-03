import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ResourceList from "./pages/ResourceList";
import ResourceForm from "./pages/ResourceForm";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ResourceList />} />
        <Route path="/novo" element={<ResourceForm />} />
        <Route path="/editar/:id" element={<ResourceForm />} />
      </Routes>
    </BrowserRouter>
  );
}