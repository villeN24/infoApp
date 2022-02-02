import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import "../App.css";

interface userProps {
  id: number;
  fName: string;
  lName: string;
  age: number;
}

const UserRow: FC<userProps> = ({ id, fName, lName, age }) => {
  const [visible, setVisible] = useState(true);

  const handleDelete = async () => {
    console.log(`Delete user with ID: ${id}`);
    let response = await axios.delete(`http://localhost:8080/users/${id}`);
    console.log(response);
    setVisible(false);
  };
  return (
    <div>
      {visible ? (
        <tr>
          <td>{id} </td>
          <td>{fName}</td>
          <td>{lName}</td>
          <td>{age}</td>
          <button onClick={() => handleDelete()}>Delete user</button>
        </tr>
      ) : null}
    </div>
  );
};

export default UserRow;
