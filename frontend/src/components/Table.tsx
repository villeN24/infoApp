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
interface Style {
  backgroundColor: string;
  icon: string | null;
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
  const [idStyle, setIdStyle] = useState<Style>({
    backgroundColor: "#96d4d4",
    icon: null,
  });
  const [fNameStyle, setFNameStyle] = useState<Style>({
    backgroundColor: "#96d4d4",
    icon: null,
  });
  const [lNameStyle, setLNameStyle] = useState<Style>({
    backgroundColor: "#96d4d4",
    icon: null,
  });
  const [ageStyle, setAgeStyle] = useState<Style>({
    backgroundColor: "#96d4d4",
    icon: null,
  });

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
    if (idFlip !== true) {
      setIdStyle({ backgroundColor: "lightgray", icon: "\u23F6" });
      tmp.sort((a, b) => {
        return a.id - b.id;
      });
    } else {
      setIdStyle({ backgroundColor: "lightgray", icon: "\u23F7" });
      tmp.sort((a, b) => {
        return b.id - a.id;
      });
    }
    setIdFlip(!idFlip);
    setList(tmp);
    setSort(!sort);
    setAgeFlip(false);
    setFNameStyle({ backgroundColor: "#96d4d4", icon: null });
    setLNameStyle({ backgroundColor: "#96d4d4", icon: null });
    setAgeStyle({ backgroundColor: "#96d4d4", icon: null });
  };
  const sortByAge = () => {
    let tmp = list;
    if (ageFlip !== true) {
      setAgeStyle({ backgroundColor: "lightgray", icon: "\u23F6" });
      tmp.sort((a, b) => {
        return a.age - b.age;
      });
    } else {
      setAgeStyle({ backgroundColor: "lightgray", icon: "\u23F7" });
      tmp.sort((a, b) => {
        return b.age - a.age;
      });
    }
    setAgeFlip(!ageFlip);
    setList(tmp);
    setSort(!sort);
    setIdFlip(false);
    setFNameStyle({ backgroundColor: "#96d4d4", icon: null });
    setLNameStyle({ backgroundColor: "#96d4d4", icon: null });
    setIdStyle({ backgroundColor: "#96d4d4", icon: null });
  };
  const sortByName = (firstName: boolean) => {
    let tmp = list;
    if (firstName === true) {
      tmp.sort((a, b) => {
        let fa;
        let fb;
        if (fNameFlip !== true) {
          setFNameStyle({ backgroundColor: "lightgray", icon: "\u23F6" });
          fa = a.fName.toLowerCase();
          fb = b.fName.toLowerCase();
        } else {
          setFNameStyle({ backgroundColor: "lightgray", icon: "\u23F7" });
          fa = b.fName.toLowerCase();
          fb = a.fName.toLowerCase();
        }
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setLNameStyle({ backgroundColor: "#96d4d4", icon: null });
      setLNameFlip(false);
      setFNameFlip(!fNameFlip);
    }
    if (firstName === false) {
      tmp.sort((a, b) => {
        let fa;
        let fb;
        if (lNameFlip !== true) {
          setLNameStyle({ backgroundColor: "lightgray", icon: "\u23F6" });
          fa = a.lName.toLowerCase();
          fb = b.lName.toLowerCase();
        } else {
          setLNameStyle({ backgroundColor: "lightgray", icon: "\u23F7" });
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
      setFNameStyle({ backgroundColor: "#96d4d4", icon: null });
      setFNameFlip(false);
      setLNameFlip(!lNameFlip);
    }
    setList(tmp);
    setSort(!sort);
    setAgeFlip(false);
    setIdFlip(false);
    setIdStyle({ backgroundColor: "#96d4d4", icon: null });
    setAgeStyle({ backgroundColor: "#96d4d4", icon: null });
  };
  return (
    <div id="container">
      <div id="table">
        <table>
          <tbody>
            <tr>
              <th style={idStyle} onClick={() => sortByID()}>
                ID {idStyle.icon}
              </th>
              <th style={fNameStyle} onClick={() => sortByName(true)}>
                First name {fNameStyle.icon}
              </th>
              <th style={lNameStyle} onClick={() => sortByName(false)}>
                Last name {lNameStyle.icon}
              </th>
              <th style={ageStyle} onClick={() => sortByAge()}>
                age {ageStyle.icon}
              </th>
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
