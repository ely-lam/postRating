import React, {useState} from "react"

import '../style/App.css';
import './LoginForm'
import './RegisterForm'
import './Home'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Home from "./Home";



const App = () => {

    const [user, setUser] = useState(undefined);
    const [register, setRegister] = useState(false);

  return (
    <div className={"App"}>
        <div>
            <h1>Header</h1>
        </div>
        {!user && !register && <LoginForm userSetter={setUser} registerSetter={setRegister}/>}
        {register && <RegisterForm/>}
        {user && <Home user={user}/>}
    </div>
  );
};

export default App;
