import "./App.css";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useAppSelector } from "./app/hooks";

function App() {
  const signed_state = useAppSelector((state) => state.isLoggedIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={signed_state ? <Home /> : <Auth />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
