import React, { FC, useEffect, useState } from "react";
import "../App.css";

interface userProps {
  id: number;
  fName: string;
  lName: string;
  age: number;
}

const UserRow: FC<userProps> = ({ id, fName, lName, age }) => {
  return (
    <tr>
      <td>{id} </td>
      <td>{fName}</td>
      <td>{lName}</td>
      <td>{age}</td>
    </tr>
  );
};

export default UserRow;
