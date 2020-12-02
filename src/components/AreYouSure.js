import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const AreYouSure = () => {
  return (
    <div style={styles.mainContainer}>
      <div>
        <p className="questionText">Let's try that again.</p>
        <p className="questionText">
          Are you ready to meet your next React developer?
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "columm" }}>
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
    height: "100vw",
    color: "white",
    flexDirection: "column",
  },
};
export default AreYouSure;
