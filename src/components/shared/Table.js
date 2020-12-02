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
              <td className="name col-3">{value.name}</td>
              <td className="city col-3">{value.city}</td>
              <td className="state col-1">{value.state}</td>
              <td className="phone col-2">{value.telephone}</td>
              <td className="genre col-3">{value.genre}</td>
            </tr>
            <tr
              key={value.id}
              onClick={() => {
                handleClick(value.id);
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th className="address col-3">Street Address</th>
                    <th className="hours col-3">Hours</th>
                    <th className="website col-3">Website</th>
                    <th className="attire col-3">Attire</th>
                  </tr>
                </thead>
                <tbody>
                  <td className="address col-3">{value.address1}</td>
                  <td className="hours col-3">
                    {value.hours.replace(/;/g, "\n")}
                  </td>
                  <td className="website col-3">{value.website}</td>
                  <td className="attire col-3">{value.attire}</td>
                </tbody>
              </table>
            </tr>
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
