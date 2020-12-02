import React from "react";
import { useEffect, useState } from "react";
import Table from "./shared/Table";

const DashboardPage = (props) => {
  const [page, setPage] = useState({ min: 0, max: 9 });

  const handelMore = () => {
    const newPage = { min: page.min + 10, max: page.max + 10 };
    setPage(newPage);
  };
  const handelLess = () => {
    const newPage = { min: page.min - 10, max: page.max - 10 };
    setPage(newPage);
  };
  return (
    <div style={styles.mainContainer}>
      <div style={styles.tableContainer}>
        <Table fetch={props.fetch} page={page} />
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={page.min > 0 ? handelLess : null}>
          {"<<"} Previous Page
        </button>
        <button onClick={page.min < props.fetch.length ? handelMore : null}>
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
    backgroundColor: "#aea2a9",
    height: "100%",
    color: "black",
    flexDirection: "column",
    backgroundSize: "100vh 100vw",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tableContainer: {
    width: "90%",
    overflow: "auto",
  },
};

export default DashboardPage;
