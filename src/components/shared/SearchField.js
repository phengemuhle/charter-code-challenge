import React, { useEffect, useState } from "react";

const SearchField = (props) => {
  const [term, setTerm] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.onSearch(e);
    }
  };

  const handleOnChage = (e) => {
    if (e.target.value === "") {
      return props.onSearch(e);
    } else {
      setTerm(e);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Search locations</label>
      <span style={{ display: "flex", flexDirection: "row" }}>
        <input
          type="text"
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Search.."
          onChange={(e) => handleOnChage(e)}
        />
        <button onClick={(e) => props.onSearch(term)}>Search</button>
      </span>
    </div>
  );
};
export default SearchField;
