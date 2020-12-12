import React, {useState} from "react";
import Home from "./Home";
import MyFavorites from "./MyFavorites";
import MyComments from "./MyComments";

const Navigation = ({user}) => {

    const [currentModule, setCurrentModule] = useState(<Home user={user}/>);
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
            <div>
                <h1>Header</h1>
                <ul>
                    <li key={"nav-home"} style={{ listStyleType: "None" }}
                        className={currentState[0] ? "active" : ""}>
                        <a href={currentPage} onClick={() => setCurrentPage(0, <Home user={user}/>)}>Home</a>
                    </li>
                    <li key={"nav-favorite"} style={{ listStyleType: "None" }}
                        className={currentState[1] ? "active" : ""}>
                        <a href={currentPage} onClick={() => setCurrentPage(1, <MyFavorites user={user}/>)}>My Favorites</a>
                    </li>
                    <li key={"nav-comment"} style={{ listStyleType: "None" }}
                        className={currentState[2] ? "active" : ""}>
                        <a href={currentPage} onClick={() => setCurrentPage(2, <MyComments user={user}/>)}>My Comments</a>
                    </li>
                    <li key="log-out" style={{ listStyleType: "None" }}>
                        <a href={"/logout"} className="App-link">
                            {" "}
                            <i className={"fa fa-sign-out"} /> Log out
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                {currentModule}
            </div>
        </div>
    )
};

export default Navigation;