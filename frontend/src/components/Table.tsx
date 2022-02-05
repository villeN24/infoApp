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
  const [nameFlip, setNameFlip] = useState<boolean>();

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
  const sortByName = (firstName: boolean) => {
    let tmp = list;
    if (nameFlip !== true) {
      tmp.sort((a, b) => {
        let fa: string;
        let fb: string;
        if (firstName === true) {
          fa = a.fName.toLowerCase();
          fb = b.fName.toLowerCase();
        } else {
          fa = a.lName.toLowerCase();
          fb = b.lName.toLowerCase();
        }
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    } else {
      tmp.sort((a, b) => {
        let fa: string;
        let fb: string;
        if (firstName === true) {
          fa = b.fName.toLowerCase();
          fb = a.fName.toLowerCase();
        } else {
          fa = b.lName.toLowerCase();
          fb = a.lName.toLowerCase();
        }
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
    setNameFlip(!nameFlip);
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
              <th onClick={() => sortByName(true)}>First name</th>
              <th onClick={() => sortByName(false)}>Last name</th>
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
