import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login-register/Login";
import Home from "./components/Home";
import Register from "./components/login-register/Register";
import PreviewDisplay from "./components/PreviewDisplay";
import ProtectedRoute from "./shared/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/auth/login" element={<Login />}></Route>
      <Route path="/auth/register" element={<Register />}></Route>
      <Route path="/preview" element={<PreviewDisplay />}></Route>
    </Routes>
  );
}

export default App;
