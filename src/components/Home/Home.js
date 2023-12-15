import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div
  style={{
    backgroundColor: "gray",
    height: "100%",
    overflow: "hidden",
  }}
>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            marginRight: "10px",
            paddingTop: "10px",
          }}
        >
          <Link
            to="login"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              width: "fit-content",
              marginRight: "5px",
            }}
          >
            <p
              style={{
                border: "1px solid #343a40",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
            >
              Sign in
            </p>
          </Link>
          <Link
            to="email"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              width: "fit-content",
              marginRight: "5px",
            }}
          >
            <p
              style={{
                border: "1px solid #343a40",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
            >
              Signup
            </p>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1 style={{ color: "white" }}>WhiteBoard</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
