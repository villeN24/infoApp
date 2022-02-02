import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

interface IInfo {
  id: number;
  fName: string;
  lName: string;
  age: number;
}
const defaultList: IInfo[] = [];

function Table() {
  const [list, setList]: [IInfo[], (lists: IInfo[]) => void] =
    useState(defaultList);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get<IInfo[]>(`http://localhost:8080/users`);
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
