import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import "../App.css";

interface userProps {
  id: number;
  fName: string;
  lName: string;
  age: number;
  refreshList: Function;
}
interface user {
  fName: String;
  lName: String;
  age: number;
}

const UserRow: FC<userProps> = ({ id, fName, lName, age, refreshList }) => {
  const [edit, setEdit] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [varAge, setVarAge] = useState<number>(0);

  const handleDelete = async () => {
    console.log(`Delete user with ID: ${id}`);
    await axios.delete(`http://localhost:8080/users/${id}`);
    refreshList();
  };
  const handleEdit = async () => {
    setEdit(!edit);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "fname") {
      setFirstName(e.target.value);
    }
    if (e.target.id === "lname") {
      setLastName(e.target.value);
    }
    if (e.target.id === "age") {
      setVarAge(Number(e.target.value));
    }
    console.log(firstName, lastName, varAge);
  };
  const insertInfo = async () => {
    let dataPacket: user = {
      fName: firstName,
      lName: lastName,
      age: varAge,
    };
    let response = await axios.patch(`/users/${id}`, {
      payload: dataPacket,
    });
    console.log(response);
    setEdit(!edit);
    refreshList();
  };
  return (
    <tr>
      <td>{id} </td>
      {edit ? (
        <td>{fName}</td>
      ) : (
        <td>
          <input
            onChange={handleChange}
            type="text"
            id="fname"
            placeholder="First name"
          />
        </td>
      )}
      {edit ? (
        <td>{lName}</td>
      ) : (
        <td>
          <input
            onChange={handleChange}
            type="text"
            id="lname"
            placeholder="Last name"
          />
        </td>
      )}
      {edit ? (
        <td>{age}</td>
      ) : (
        <td>
          <input
            onChange={handleChange}
            type="number"
            id="age"
            placeholder="Age"
          />
        </td>
      )}
      {edit ? (
        <td>
          <button className="top" onClick={() => handleDelete()}>
            Delete user
          </button>
          <button onClick={() => handleEdit()}>Edit user</button>
        </td>
      ) : (
        <td>
          <button className="top" onClick={() => insertInfo()}>
            Submit user
          </button>
          <button onClick={() => handleEdit()}>Cancel</button>
        </td>
      )}
    </tr>
  );
};

export default UserRow;
