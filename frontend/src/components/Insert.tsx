import axios from "axios";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import "../App.css";

interface user {
  fName: String;
  lName: String;
  age: number;
}
interface insertProps {
  refreshList: Function;
}

const Insert: FC<insertProps> = ({ refreshList }) => {
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [age, setAge] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "fname") {
      setFirstName(e.target.value);
    }
    if (e.target.id === "lname") {
      setLastName(e.target.value);
    }
    if (e.target.id === "age") {
      setAge(Number(e.target.value));
    }
  };
  const insertInfo = async () => {
    let dataPacket: user = {
      fName: firstName,
      lName: lastName,
      age: age,
    };
    await axios.post(`http://localhost:8080/users`, {
      payload: dataPacket,
    });
    refreshList();
  };

  return (
    <div>
      <input
        onChange={handleChange}
        type="text"
        id="fname"
        placeholder="First name"
      />
      <input
        onChange={handleChange}
        type="text"
        id="lname"
        placeholder="Last name"
      />
      <input onChange={handleChange} type="text" id="age" placeholder="Age" />
      <button onClick={() => insertInfo()}>Submit</button>
    </div>
  );
};

export default Insert;
