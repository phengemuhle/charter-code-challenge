import React, { useEffect, useState } from "react";

const GenreFilter = (props) => {
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label>Filter by Genre</label>
      <span style={{ display: "flex", flexDirection: "row" }}>
        <select onChange={(e) => props.handleGenreSelect(e)}>
          <option defaultValue value="All">
            All
          </option>
          {props.genreFilter}
        </select>
        <input type="submit" onClick={(e) => props.handleFilterByGenre(e)} />
      </span>
    </form>
  );
};
export default GenreFilter;
