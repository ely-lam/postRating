import React from "react";
import { useForm } from "react-hook-form";
import "../style/SearchBar.css";

const SearchBar = ({ apartments, apartmentsSetter, postPerPageSetter }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let newData = apartments;
    if (data["search-text"]) {
      newData = filerPostsByKeyword(
        data["search-text"],
        data["search-place"],
        newData
      );
    }
    newData = filerPostsByBedrooms(parseInt(data["housing"]), newData);
    newData = sortPosts(data["sorting"], newData);
    postPerPageSetter(parseInt(data["post-per-page"]));
    apartmentsSetter(newData);
  };

  const filerPostsByKeyword = (keyword, searchPlace, apartments) => {
    switch (searchPlace) {
      case "hood":
        return apartments.filter(
          (apartment) => apartment.hood && apartment.hood.includes(keyword)
        );
      case "title":
        return apartments.filter(
          (apartment) =>
            apartment.titleTextOnly && apartment.titleTextOnly.includes(keyword)
        );
      case "body":
        return apartments.filter(
          (apartment) => apartment.body && apartment.body.includes(keyword)
        );
      default:
        return apartments;
    }
  };

  const filerPostsByBedrooms = (numBedroom, apartments) => {
    switch (numBedroom) {
      case -1:
        return apartments.filter((apartment) => apartment.housing === null);
      case 0:
        return apartments;
      case 1:
        return apartments.filter(
          (apartment) => apartment.housing && apartment.housing === 1
        );
      case 2:
        return apartments.filter(
          (apartment) => apartment.housing && apartment.housing === 2
        );
      case 3:
        return apartments.filter(
          (apartment) => apartment.housing && apartment.housing === 3
        );
      case 4:
        return apartments.filter(
          (apartment) => apartment.housing && apartment.housing >= 4
        );
      default:
        return apartments;
    }
  };

  const sortPosts = (options, apartments) => {
    switch (options) {
      case "unsorted":
        return apartments;
      case "new-old":
        return apartments.sort(compareTime).reverse();
      case "old-new":
        return apartments.sort(compareTime);
      case "low-high":
        return apartments
          .filter((apartment) => apartment.price)
          .sort(comparePrice);

      case "high-low":
        return apartments
          .filter((apartment) => apartment.price)
          .sort(comparePrice)
          .reverse();
      case "best-worst":
        return apartments.sort(compareRating).reverse();
      default:
        return apartments;
    }
  };

  //
  const compareTime = (a, b) => {
    if (a.time < b.time) {
      return -1;
    } else if (a.time > b.time) {
      return 1;
    } else {
      return 0;
    }
  };

  // compare price from low to high
  const comparePrice = (a, b) => {
    if (a.price < b.price) {
      return -1;
    } else if (a.price > b.price) {
      return 1;
    } else {
      return 0;
    }
  };

  // compare rating from low to high
  const compareRating = (a, b) => {
    if (a.rating < b.rating) {
      return -1;
    } else if (a.rating > b.rating) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={"searchBar"}>
        <div className={"search-option"}>
          <label htmlFor={"search-text"}>Keywords</label>
          <input
            type={"text"}
            name={"search-text"}
            id={"search-text"}
            aria-label={"search-text"}
            placeholder={"Enter keywords"}
            ref={register}
          />
        </div>

        <div className={"search-option"}>
          <label htmlFor={"search-place"}>Search place: </label>
          <select
            id={"search-place"}
            aria-label={"search-place"}
            name={"search-place"}
            ref={register}
          >
            <option aria-label={"hood"} value={"hood"}>
              hood
            </option>
            <option aria-label={"title"} value={"title"}>
              title
            </option>
            <option aria-label={"body"} value={"body"}>
              Body
            </option>
          </select>
        </div>
        <div className={"search-option"}>
          <label htmlFor={"housing"}>Bedrooms: </label>
          <select
            id={"housing"}
            aria-label={"housing"}
            name={"housing"}
            ref={register}
          >
            <option aria-label={"any-bedroom"} value={"0"}>
              Any Bedrooms
            </option>
            <option aria-label={"1-bedroom"} value={"1"}>
              1 Bedroom
            </option>
            <option aria-label={"2-bedroom"} value={"2"}>
              2 Bedrooms
            </option>
            <option aria-label={"3-bedroom"} value={"3"}>
              3 Bedrooms
            </option>
            <option aria-label={"4-bedroom"} value={"4"}>
              4+ Bedrooms
            </option>
            <option aria-label={"not-specified-bedroom"} value={"-1"}>
              Not Specified
            </option>
          </select>
        </div>
        <div className={"search-option"}>
          <label htmlFor={"sorting"}>Sort by:</label>
          <select
            id={"sorting"}
            aria-label={"sorting"}
            name={"sorting"}
            ref={register}
          >
            <option aria-label={"unsorted"} value={"unsorted"}>
              unsorted
            </option>
            <option aria-label={"time-new-old"} value={"new-old"}>
              newest to oldest
            </option>
            <option aria-label={"time-old-new"} value={"old-new"}>
              oldest tp newest
            </option>
            <option aria-label={"price-low-high"} value={"low-high"}>
              lowest to highest price
            </option>
            <option aria-label={"price-high-low"} value={"high-low"}>
              highest to lowest price
            </option>
            <option aria-label={"rating"} value={"best-worst"}>
              highest to lowest rating
            </option>
          </select>
        </div>
        <div className={"search-option"}>
          <label>Posts per page:</label>
          <select
            id={"post-per-page"}
            aria-label={"post-per-page"}
            name={"post-per-page"}
            ref={register}
            defaultValue={"20"}
          >
            <option aria-label={"10"} value={"10"}>
              10
            </option>
            <option aria-label={"20"} value={"20"}>
              20
            </option>
            <option aria-label={"50"} value={"50"}>
              50
            </option>
          </select>
        </div>

        <button type={"submit"}>
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
