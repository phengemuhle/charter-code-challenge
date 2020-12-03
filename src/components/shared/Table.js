import React, { useEffect, useState } from "react";
import "./Table.css";

const Table = (props) => {
  const [display, setDisplay] = useState([]);
  const [isSelected, setIsSelected] = useState([]);

  useEffect(() => {
    console.log("to table", props.fetch);
    setDisplay(props.fetch);
  }, [props.fetch]);

  const handleClick = (id) => {
    if (isSelected.includes(id)) {
      const filtered = isSelected.filter((value) => id !== value);
      setIsSelected(filtered);
    } else {
      setIsSelected((isSelected) => [...isSelected, id]);
    }
  };

  const tableRow = display.map((value, i) => {
    return (
      <>
        {!isSelected.includes(value.id) ? (
          <tr
            key={value.id}
            onClick={() => {
              handleClick(value.id);
            }}
          >
            <td className="name">{value.name}</td>
            <td className="city">{value.city}</td>
            <td className="state">{value.state}</td>
            <td className="phone">{value.telephone}</td>
            <td className="genre">{value.genre.replace(/,/g, ", ")}</td>
          </tr>
        ) : (
          <>
            <tr
              key={value.id}
              onClick={() => {
                handleClick(value.id);
              }}
            >
              <td className="name">{value.name}</td>
              <td className="city">{value.city}</td>
              <td className="state">{value.state}</td>
              <td className="phone">{value.telephone}</td>
              <td className="genre">{value.genre.replace(/,/g, ", ")}</td>
            </tr>
            <table
              onClick={() => {
                handleClick(value.id);
              }}
            >
              <thead>
                <tr>
                  <th>Street Address</th>
                  <th>Hours</th>
                  <th>Website</th>
                  <th>Attire</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                <td className="address">{value.address1}</td>
                <td className="hours">{value.hours.replace(/;/g, "\n")}</td>
                <td className="website">{value.website}</td>
                <td className="attire">{value.attire}</td>
                <td className="attire">
                  {value.tags.replace(/,/g, ", ").replace(/}/g, "")}
                </td>
              </tbody>
            </table>
          </>
        )}
      </>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th className="name">Name</th>
          <th className="city">City</th>
          <th className="state">State</th>
          <th className="phone">Phone</th>
          <th className="genre">Genre</th>
        </tr>
      </thead>
      <tbody>
        {display.length === 0 ? (
          <>
            <tr>
              <td></td>
              <td></td>
              <td>Please try your search again.</td>
              <td></td>
              <td></td>
            </tr>
          </>
        ) : (
          [tableRow]
        )}
      </tbody>
    </table>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: "100%",
    color: "white",
    flexDirection: "column",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    height: "100%",
    borderBottom: "1px solid black ",
  },
};

export default Table;
