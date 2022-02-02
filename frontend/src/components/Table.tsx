import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

interface IInfo {
  id: number;
  fName: string;
  lName: string;
  age: number;
}

function Table() {
  const [list, setList] = useState<IInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`http://localhost:8080/users`);
      setList(response.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>First name</th>
          <th>Last name</th>
          <th>age</th>
        </tr>
        {list.map((id) => (
          <tr>
            <td>{id.id} </td>
            <td>{id.fName}</td>
            <td>{id.lName}</td>
            <td>{id.age}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
