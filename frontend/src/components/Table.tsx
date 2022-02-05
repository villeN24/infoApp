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
  const [sort, setSort] = useState<boolean>(false);
  const [ageFlip, setAgeFlip] = useState<boolean>();
  const [idFlip, setIdFlip] = useState<boolean>();
  const [fNameFlip, setFNameFlip] = useState<boolean>();
  const [lNameFlip, setLNameFlip] = useState<boolean>();

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
  }, [refresh, sort]);

  const sortByID = () => {
    let tmp = list;
    console.log(tmp);
    if (idFlip !== true) {
      tmp.sort((a, b) => {
        return a.id - b.id;
      });
    } else {
      tmp.sort((a, b) => {
        return b.id - a.id;
      });
    }
    setIdFlip(!idFlip);
    setList(tmp);
    setSort(!sort);
  };
  const sortByAge = () => {
    let tmp = list;
    if (ageFlip !== true) {
      tmp.sort((a, b) => {
        return a.age - b.age;
      });
    } else {
      tmp.sort((a, b) => {
        return b.age - a.age;
      });
    }
    setAgeFlip(!ageFlip);
    setList(tmp);
    setSort(!sort);
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
              <th onClick={() => sortByAge()}>age</th>
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
