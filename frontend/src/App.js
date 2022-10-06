import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { EditProfile, Login } from './Pages'

 function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;