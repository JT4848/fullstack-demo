import { useState } from "react";
import Trains from "./components/Trains";
import AuthForm from "./components/AuthForm";
import RegisterForm from "./components/RegisterForm";
import Conductors from "./components/Conductors";
import Stations from "./components/Stations";
function App() {

  const [token, setToken] = useState(null);
  const [signup, setSignUp] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSignUpClick = () => {
    setSignUp(!signup)
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  return (
    <>
      <h1>REACT TRAIN APP</h1>
      <p>Choo Choo!</p>

      {!token && (
      <button onClick={handleSignUpClick}>{signup ? "Sign In" : "Sign Up"}
      </button>
      )}

      {token ? (
        <>
          <button onClick={() => setToken(false)}>Sign Out</button>
          <button onClick={() => handleCategoryClick("trains")}>Trains</button>
          <button onClick={() => handleCategoryClick("conductors")}>Conductors</button>
          <button onClick={() => handleCategoryClick("stations")}>Stations</button>
        </>
      ) : ""}

      {token && selectedCategory === "trains" && <Trains token={token}/>}
      {token && selectedCategory === "conductors" && <Conductors token={token}/>}
      {token && selectedCategory === "stations" && <Stations token={token}/>}

     {!token && (signup ? <RegisterForm setToken={setToken}/> : <AuthForm setToken={setToken}/>)}
    
    </>
  );
}

export default App;
