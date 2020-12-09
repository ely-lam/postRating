import React, {useState} from "react"

import '../style/App.css';
import './LoginForm'
import './RegisterForm'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";



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
    </div>
  );
};

export default App;
