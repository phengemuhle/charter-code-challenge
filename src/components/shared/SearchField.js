import React, { useState } from "react";

const SearchField = (props) => {
  const [term, setTerm] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.onSearch(e);
    }
  };

  return (
    <div>
      <input
        type="text"
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="Search.."
        onChange={(e) => setTerm(e)}
      />
      <button onClick={(e) => props.onSearch(term)}>Search</button>
    </div>
  );
};
export default SearchField;
