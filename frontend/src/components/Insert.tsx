import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import "../App.css";

const Insert = () => {
  const [userInfo, setUserInfo] = useState({ fName: "", lName: "", age: 0 });
  const print = () => {
    console.log(userInfo);
  };
  return (
    <div>
      <input type="text" id="fname" value="first name" required />
      <input type="text" id="lname" value="last name" required />
      <input type="text" id="age" value="age" required />
      <button onClick={() => print()}>Submit</button>
    </div>
  );
};

export default Insert;
