import "./App.css";
import { Route, Routes } from "react-router-dom";
import Profile from './Profile'
import Home from "./Home";
import Header from './Header'

function App() {
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
