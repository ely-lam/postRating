import React, { useState, useEffect } from "react";
import axios from "axios";
import ApartmentPreview from "./ApartmentPreview";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const Home = ({ user }) => {
  const [currUser, userSetter] = useState(user);
  const [apartments, setApartments] = useState([]);
  const [partialApartments, setPartialApartments] = useState([]);
  const [homeMsg, setHomeMsg] = useState("");

  // handles pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = partialApartments.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getUser = () => {
    const url = `./users/get/${user.username}`;
    axios
        .get(url)
        .then((result) => {
          const data = result.data;
          userSetter(data);
        })
        .catch((err) => {
          console.log("load favorite failed!");
        });
  };

  const getApartments = () => {
    const url = "./get-apts";
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.length === 0) {
          setHomeMsg("There is no apartments loaded");
        } else {
          console.log("Apartments loaded");
          setApartments(data);
          setPartialApartments(data);
        }
      })
      .catch((err) => {
        setHomeMsg(err.body);
      });
  };

  useEffect(() => {
    console.log("Loading apartments");
    getApartments();
    getUser();
  }, []);

  return (
    <div>
      <div>
        <SearchBar
          apartments={apartments}
          apartmentsSetter={setPartialApartments}
          postPerPageSetter={setPostsPerPage}
        />
        <p style={{ color: "red" }}>{homeMsg}</p>
        <ul style={{ listStyle: "none" }}>
          {currentPosts.map((apartment, index) => {
            return (
              <li key={`apartment-${index}`}>
                <ApartmentPreview apartment={apartment} user={currUser} userSetter={userSetter} />
              </li>
            );
          })}
        </ul>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={partialApartments.length}
          paginate={paginate}
          indexOfFirstPost={indexOfFirstPost}
          indexOfLastPost={indexOfLastPost}
          partialApartments={apartments}
        />
      </div>
    </div>
  );
};

export default Home;
