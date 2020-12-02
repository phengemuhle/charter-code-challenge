import React, { useEffect, useState } from "react";
import "./Table.css";

const Table = (props) => {
  const [data, setData] = useState(props.fetch);
  const [display, setDisplay] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [page, setPage] = useState(props.page);
  useEffect(() => {
    setPage(props.page);
  }, [props.page]);
  useEffect(() => {
    const paged = data.filter((value, index) => {
      if (index >= page.min && index <= page.max) {
        return value;
      }
    });
    setDisplay(paged);
  }, [page]);

  const handleClick = (id) => {
    if (isSelected.includes(id)) {
      const filtered = isSelected.filter((value) => id !== value);
      setIsSelected(filtered);
    } else {
      setIsSelected((isSelected) => [...isSelected, id]);
    }
  };

  const tableRow = display.map((value, i) => {
    console.log(value);

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
          <th style={{ maxWidth: "1rem" }} className="name">
            Name
          </th>
          <th style={{ maxWidth: "1rem" }} className="city">
            City
          </th>
          <th style={{ maxWidth: "1rem" }} className="state">
            State
          </th>
          <th style={{ maxWidth: "1rem" }} className="phone">
            Phone
          </th>
          <th style={{ maxWidth: "1rem" }} className="genre">
            Genre
          </th>
        </tr>
      </thead>
      <tbody>{tableRow}</tbody>
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
