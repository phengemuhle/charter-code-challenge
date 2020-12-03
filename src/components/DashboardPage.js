import React from "react";
import { useEffect, useState } from "react";
import Table from "./shared/Table";
import SearchField from "./shared/SearchField";

const DashboardPage = (props) => {
  const [page, setPage] = useState({ min: 0, max: 9 });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(props.fetch);
  const [searched, setSearched] = useState(data);
  const [display, setDisplay] = useState(props.fetch);

  useEffect(() => {
    setIsLoading(true);
    sortASC();
    pageResults();
    setIsLoading(false);
  }, [page, searched]);

  const pageResults = () => {
    console.log("searched", searched);
    const paged = searched.filter((value, index) => {
      if (index >= page.min && index <= page.max) {
        return value;
      }
    });
    setDisplay(paged);
  };

  const sortASC = () => {
    let sortedProducts = props.fetch;
    sortedProducts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return setData(sortedProducts);
  };

  const handelMore = () => {
    const newPage = { min: page.min + 10, max: page.max + 10 };
    setPage(newPage);
  };
  const handelLess = () => {
    const newPage = { min: page.min - 10, max: page.max - 10 };
    setPage(newPage);
  };

  const onSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.value;
    const loctaions = data;
    const filteredLocations = findMatches(searchTerm, loctaions);
    console.log(filteredLocations);
    return setSearched(filteredLocations);
  };

  function findMatches(searchTerm, loctaions) {
    return loctaions.filter((item) => {
      const regex = new RegExp(searchTerm, "gi");
      return (
        item.name.match(regex) ||
        item.city.match(regex) ||
        item.genre.match(regex)
      );
    });
  }

  return (
    <div style={styles.mainContainer}>
      <div style={styles.filterContainer}>
        <SearchField onSearch={onSearch} />
      </div>
      <div style={styles.tableContainer}>
        {isLoading ? <p>Loading...</p> : <Table fetch={display} />}
      </div>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={page.min > 0 ? handelLess : null}
        >
          {"<<"} Previous Page
        </button>
        <button
          style={styles.button}
          onClick={page.max < props.fetch.length - 1 ? handelMore : null}
        >
          Next Page {">>"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededeb",
    height: "100%",
    color: "black",
    fontSize: "1rem",
    flexDirection: "column",
    backgroundSize: "100vh 100vw",
  },
  filterContainer: {
    display: "flex",
    width: "90%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tableContainer: {
    width: "90%",
    overflow: "auto",
  },
  button: {
    margin: ".5rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    fontSize: "1rem",
    borderRadius: 30,
    backgroundColor: "blue",
    fontWeight: "bold",
    color: "white",
  },
};

export default DashboardPage;
