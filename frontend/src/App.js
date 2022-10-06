import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login, Profile } from './Pages'

 function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/editProfile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;