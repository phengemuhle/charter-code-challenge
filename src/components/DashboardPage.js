import React, { useEffect, useState, useCallback } from "react";
import Table from "./shared/Table";
import SearchField from "./shared/SearchField";
import GenreFilter from "./shared/GenreFilter";
import StateFilter from "./shared/StateFilter";
const GLOBAL = require("./shared/Global");

const DashboardPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [initial, setinitial] = useState(props.fetch);
  const [state, setState] = useState("All");
  const [filteredState, setFilteredState] = useState(initial);
  const [filteredGenre, setFilteredGenre] = useState(initial);
  const [page, setPage] = useState({ min: 0, max: 9 });
  const [data, setData] = useState(filteredState);
  const [display, setDisplay] = useState(data);
  const [searched, setSearched] = useState(data);
  const [initialGenre, setInitialGenre] = useState([]);
  const [genre, setGenre] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const stateAbbreviations = GLOBAL.stateAbbreviations;
  // Process Genres
  useEffect(() => {
    let genres = [];
    initial.map((value) => {
      let list = value.genre.split(",");
      list.map((value) => {
        if (!genres.includes(value)) {
          genres.push(value);
        }
      });
    });
    setInitialGenre(genres);
  }, []);

  useEffect(() => {
    setSelectedGenre(initialGenre);
  }, [initialGenre]);

  // Filtering logic
  const handleStateSelect = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const handleFilterByState = (e) => {
    e.preventDefault();
    if (genre == "All") {
      setSelectedGenre(initialGenre);
    } else {
      setSelectedGenre([genre]);
    }
    if (state == "All") {
      return setFilteredState(initial);
    } else {
      let newState = initial.filter((value) => {
        if (value.state == state) {
          if (checkGenre(value) == true) {
            return value;
          }
        }
      });
      return setFilteredState(newState);
    }
  };
  const checkGenre = (value) => {
    let genreArr = value.genre.split(",");
    let count = 0;
    genreArr.map((type) => {
      if (selectedGenre.includes(type)) {
        count += 1;
      }
    });
    return count > 0;
  };
  const handleGenreSelect = (e) => {
    e.preventDefault();
    setGenre(e.target.value);
  };

  const handleFilterByGenre = (e) => {
    e.preventDefault();
    setSelectedGenre([genre]);
  };

  // Sorting logic
  const sortASC = useCallback(() => {
    let sortedProducts = filteredState;
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
  });

  // Page logic
  const handleMore = () => {
    const newPage = { min: page.min + 10, max: page.max + 10 };
    setPage(newPage);
  };

  const handleLess = () => {
    const newPage = { min: page.min - 10, max: page.max - 10 };
    setPage(newPage);
  };

  const pageResults = () => {
    const paged = searched.filter((value, index) => {
      if (index >= page.min && index <= page.max) {
        return value;
      }
    });
    return setDisplay(paged);
  };

  // Searching logic
  const onSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.value;
    const locations = filteredState;
    const searchedLocations = findMatches(searchTerm, locations);
    return setSearched(searchedLocations);
  };

  const findMatches = (searchTerm, locations) => {
    return locations.filter((item) => {
      const regex = new RegExp(searchTerm, "gi");
      return (
        item.name.match(regex) ||
        item.city.match(regex) ||
        item.genre.match(regex)
      );
    });
  };

  const stateFilter = stateAbbreviations.map((state) => {
    return (
      <>
        <option key={state} value={state}>
          {state}
        </option>
      </>
    );
  });

  const genreFilter = initialGenre.map((genre) => {
    return (
      <>
        <option key={genre} value={genre}>
          {genre}
        </option>
      </>
    );
  });

  useEffect(() => {}, [genre]);

  useEffect(() => {
    setSearched(filteredState);
  }, [filteredState, selectedGenre, genre]);

  useEffect(() => {
    setIsLoading(true);
    sortASC();
    pageResults();
    setIsLoading(false);
  }, [page, data, searched, filteredState, state, genre]);c
  return (
    <div style={styles.mainContainer}>
      <div style={styles.filterContainer}>
        <SearchField onSearch={onSearch} />
        <StateFilter
          stateFilter={stateFilter}
          handleStateSelect={handleStateSelect}
          handleFilterByState={handleFilterByState}
        />
        <GenreFilter
          genreFilter={genreFilter}
          handleGenreSelect={handleGenreSelect}
          handleFilterByGenre={handleFilterByGenre}
        />
      </div>
      <div style={styles.tableContainer}>
        {isLoading ? <p>Loading...</p> : <Table fetch={display} />}
      </div>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={page.min > 0 ? handleLess : null}
        >
          {"<<"} Previous Page
        </button>
        <button
          style={styles.button}
          onClick={page.max < props.fetch.length - 1 ? handleMore : null}
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
    justifyContent: "space-around",
    width: "60%",
    marginBottom: "1rem",
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
