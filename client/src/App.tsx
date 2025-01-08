import { Route, Routes } from "react-router-dom";
import AuthCallback from "./pages/authCallback/AuthCallback";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authCallback" element={<AuthCallback />} />
    </Routes>
  );
}

export default App;
