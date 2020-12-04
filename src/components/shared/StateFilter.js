import React, { useEffect, useState } from "react";

const StateFilter = (props) => {
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
          <label>Filter by State</label>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <select onChange={(e) => props.handleStateSelect(e)}>
              <option defaultValue value="All">
                All
              </option>
              {props.stateFilter}
            </select>
            <input type="submit" onClick={props.handleFilterByState} />
          </span>
        </form>
  );
};
export default StateFilter;
