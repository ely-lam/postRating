import React, { useState } from "react";
import Home from "./Home";
import MyFavorites from "./MyFavorites";
import MyComments from "./MyComments";
import "../style/Navigation.css";

const Navigation = ({ user }) => {
  const [currUser, userSetter] = useState(user);
  const [currentModule, setCurrentModule] = useState(<Home user={currUser} />);
  const [currentState, setCurrentState] = useState([true]);

  const currentPage = "#";

  const setCurrentPage = (index, module) => {
    setCurrentModule(module);
    const states = [false, false, false, false];
    states[index] = true;
    setCurrentState(states);
  };

  return (
    <div>
      <nav className={"main-nav-container"} aria-label={"main-nav-container"}>
        <p className={"welcome-message"}>{`Welcome, ${user.username}`}</p>
        <ul className={"main-nav"}>
          <li
            key={"nav-home"}
            style={{ listStyleType: "None" }}
            className={currentState[0] ? "active" : ""}
          >
            <a
              href={currentPage}
              onClick={() => setCurrentPage(0, <Home user={currUser} />)}
            >
              Home
            </a>
          </li>
          <li
            key={"nav-favorite"}
            style={{ listStyleType: "None" }}
            className={currentState[1] ? "active" : ""}
          >
            <a
              href={currentPage}
              onClick={() => setCurrentPage(1, <MyFavorites user={currUser} userSetter={userSetter} />)}
            >
              My Favorites
            </a>
          </li>
          <li
            key={"nav-comment"}
            style={{ listStyleType: "None" }}
            className={currentState[2] ? "active" : ""}
          >
            <a
              href={currentPage}
              onClick={() => setCurrentPage(2, <MyComments user={currUser} />)}
            >
              My Comments
            </a>
          </li>
          <li key="log-out" style={{ listStyleType: "None" }}>
            <a href={"/logout"} className="App-link">
              {" "}
              <i className={"fa fa-sign-out"} /> Log out
            </a>
          </li>
        </ul>
      </nav>
      <div>{currentModule}</div>
    </div>
  );
};

export default Navigation;
