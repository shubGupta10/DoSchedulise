import React, { useState } from "react";
import "./Join.css";
import logo from "../../ChatLoginImage/logo.png";
import { Link } from "react-router-dom";

let user;
const senduser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {

  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Live Chat</h1>
        <input onChange={(e) => setName( e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
        <Link to="/chat" onClick={(e) => !name ? e.preventDefault() : null}>
          <button onClick={senduser} className="joinbtn">
            Login In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
