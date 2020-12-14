import React, { useState } from "react";

import "../style/App.css";
import "./LoginForm";
import "./RegisterForm";
import "./Home";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navigation from "./Navigation";

const App = () => {
  const [user, setUser] = useState(undefined);
  const [register, setRegister] = useState(false);

  return (
    <div className={"App"}>
      <div className={"header-container"}>
        <h1>Post Rating</h1>
        <p>
          A interactive web application that allows user to comment and rate
          existing post
        </p>
      </div>
      {!user && !register && (
        <LoginForm userSetter={setUser} registerSetter={setRegister} />
      )}
      {register && <RegisterForm />}
      {user && <Navigation user={user} />}
    </div>
  );
};

export default App;
