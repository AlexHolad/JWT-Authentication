import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

import './Home.css'

const Home = () => {
  return(
    <div className="home">
      <LoginScreen/>
      <RegisterScreen/>
    </div>
  )
};

export default Home;
