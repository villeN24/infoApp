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
  const [helper, setHelper] = useState<boolean>(true);
  const [sortID, setSortID] = useState<boolean>(false);

  /**
   * Refreshes the rendered list when something is changed from child.
   */
  const refreshList = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (refresh !== helper) {
        let response = await axios.get(`http://localhost:8080/users`);
        setList(response.data);
        setHelper(refresh);
      }
    };
    fetchData();
  }, [refresh, sortID]);

  const sortByID = () => {
    let tmp = list;
    tmp.reverse();
    setList(tmp);
    setSortID(!sortID);
  };
  return (
    <div id="container">
      <div id="table">
        <table>
          <tbody>
            <tr>
              <th onClick={() => sortByID()}>ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>age</th>
              <th>Functionality</th>
            </tr>
            {list.map((id) => (
              <UserRow
                key={id.id}
                id={id.id}
                fName={id.fName}
                lName={id.lName}
                age={id.age}
                refreshList={refreshList}
              />
            ))}
          </tbody>
        </table>
        <div id="insert">
          <Insert refreshList={refreshList} />
        </div>
      </div>
    </div>
  );
}

export default Table;
