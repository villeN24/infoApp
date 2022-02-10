import axios from "axios";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import "../App.css";

interface user {
  fName: string;
  lName: string;
  age: number | string;
}
interface insertProps {
  refreshList: Function;
}

const Insert: FC<insertProps> = ({ refreshList }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number | string>("");

  const insertInfo = async (event: any) => {
    event.preventDefault();
    let dataPacket: user = {
      fName: firstName,
      lName: lastName,
      age: age,
    };
    setFirstName("");
    setLastName("");
    setAge("");
    await axios.post(`/users`, {
      payload: dataPacket,
    });
    refreshList();
  };

  return (
    <div id="insertContainer">
      <form onSubmit={insertInfo}>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          id="fname"
          value={firstName}
          placeholder="First name"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          id="lname"
          value={lastName}
          placeholder="Last name"
        />
        <input
          onChange={(e) => setAge(Number(e.target.value))}
          type="number"
          id="age"
          value={age}
          placeholder="Age"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Insert;
