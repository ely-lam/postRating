import React from "react";
import "../style/Pagination.css";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  indexOfFirstPost,
  indexOfLastPost,
  partialApartments,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={"pagination-nav"}>
      <p style={{ textAlign: "center" }}>
        Showing {indexOfFirstPost + 1} -{" "}
        {indexOfLastPost >= partialApartments.length
          ? partialApartments.length
          : indexOfLastPost}{" "}
        of total {partialApartments.length} qualified apartments
      </p>
      <ul className={"pagination"} style={{ listStyle: "none" }}>
        {pageNumbers.map((number) => (
          <li key={`page-${number}`} className={"page-item"}>
            <a
              onClick={() => paginate(number)}
              href={"!#"}
              className={"page-link"}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
