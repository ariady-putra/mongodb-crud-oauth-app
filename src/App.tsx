import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./styles/ReactToastify.css";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import VinylList from "./components/VinylList";
import VinylAdd from "./components/VinylAdd";
import VinylEdit from "./components/VinylEdit";

function App() {
  return (
    <>
      <NavBar />
      <Hero />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VinylList />} />
          <Route path="/add" element={<VinylAdd />} />
          <Route path="/edit/:vinylRecordID" element={<VinylEdit />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        // theme="dark"
      />
    </>
  );
}

export default App;
