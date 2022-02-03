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

const UserRow: FC<userProps> = ({ id, fName, lName, age, refreshList }) => {
  const handleDelete = async () => {
    console.log(`Delete user with ID: ${id}`);
    await axios.delete(`http://localhost:8080/users/${id}`);
    refreshList();
  };
  return (
    <tr>
      <td>{id} </td>
      <td>{fName}</td>
      <td>{lName}</td>
      <td>{age}</td>
      <td>
        <button onClick={() => handleDelete()}>Delete user</button>
      </td>
    </tr>
  );
};

export default UserRow;
