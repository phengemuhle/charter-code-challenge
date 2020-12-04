import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const HomePage = () => {
  return (
    <div style={styles.mainContainer}>
      <p className="questionText">
        Are you ready to meet your next React developer?
      </p>
      <div style={{ display: "flex", flexDirection: "columm" }}>
        <Link to={`/areYouSure`}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="redButton shared dualslide"
          >
            <span>Decline</span>
          </div>
        </Link>

        <Link to={`/dashboard`}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="greenButton shared dualslide"
          >
            <span>Accept</span>
          </div>
        </Link>
      </div>
    </div>
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
};
export default HomePage;
