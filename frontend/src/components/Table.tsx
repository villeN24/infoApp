import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import UserRow from "./UserRow";

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
          <UserRow id={id.id} fName={id.fName} lName={id.lName} age={id.age} />
        ))}
      </table>
    </div>
  );
}

export default Table;
