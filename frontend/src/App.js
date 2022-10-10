import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { EditProfile, Login } from "./Pages";
import ProtectedRoutes from "./utility/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/editProfile" element={<ProtectedRoutes />}>
            <Route path="/editProfile" element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
