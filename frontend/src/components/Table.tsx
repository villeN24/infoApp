import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import UserRow from "./UserRow";
import Insert from "./Insert";

interface IInfo {
  id: number;
  fName: string;
  lName: string;
  age: number;
}

function Table() {
  const [list, setList] = useState<IInfo[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  /**
   * Refreshes the rendered list when something is changed from child.
   */
  const refreshList = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`http://localhost:8080/users`);
      setList(response.data);
    };
    fetchData();
  }, [refresh]);
  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>First name</th>
          <th>Last name</th>
          <th>age</th>
          <th>Delete</th>
        </tr>
        {list.map((id) => (
          <UserRow
            id={id.id}
            fName={id.fName}
            lName={id.lName}
            age={id.age}
            refreshList={refreshList}
          />
        ))}
      </table>
      <Insert />
    </div>
  );
}

export default Table;
