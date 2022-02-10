import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import Insert from "./Insert";
import { UserRow } from "./UserRow";

const topColor: string = "#36304a";
const hlColor: string = "gray";

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
    backgroundColor: topColor,
    icon: null,
  });
  const [fNameStyle, setFNameStyle] = useState<Style>({
    backgroundColor: topColor,
    icon: null,
  });
  const [lNameStyle, setLNameStyle] = useState<Style>({
    backgroundColor: topColor,
    icon: null,
  });
  const [ageStyle, setAgeStyle] = useState<Style>({
    backgroundColor: topColor,
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
        let response = await axios.get(`/users`);
        setList(response.data);
        setHelper(refresh);
      }
    };
    fetchData();
  }, [refresh, sort]);

  const sortByID = () => {
    let tmp = list;
    if (idFlip !== true) {
      setIdStyle({ backgroundColor: hlColor, icon: "\u23F6" });
      tmp.sort((a, b) => {
        return a.id - b.id;
      });
    } else {
      setIdStyle({ backgroundColor: hlColor, icon: "\u23F7" });
      tmp.sort((a, b) => {
        return b.id - a.id;
      });
    }
    setIdFlip(!idFlip);
    setList(tmp);
    setSort(!sort);
    setAgeFlip(false);
    setFNameStyle({ backgroundColor: topColor, icon: null });
    setLNameStyle({ backgroundColor: topColor, icon: null });
    setAgeStyle({ backgroundColor: topColor, icon: null });
  };
  const sortByAge = () => {
    let tmp = list;
    if (ageFlip !== true) {
      setAgeStyle({ backgroundColor: hlColor, icon: "\u23F6" });
      tmp.sort((a, b) => {
        return a.age - b.age;
      });
    } else {
      setAgeStyle({ backgroundColor: hlColor, icon: "\u23F7" });
      tmp.sort((a, b) => {
        return b.age - a.age;
      });
    }
    setAgeFlip(!ageFlip);
    setList(tmp);
    setSort(!sort);
    setIdFlip(false);
    setFNameStyle({ backgroundColor: topColor, icon: null });
    setLNameStyle({ backgroundColor: topColor, icon: null });
    setIdStyle({ backgroundColor: topColor, icon: null });
  };
  const sortByName = (firstName: boolean) => {
    let tmp = list;
    if (firstName === true) {
      tmp.sort((a, b) => {
        let fa;
        let fb;
        if (fNameFlip !== true) {
          setFNameStyle({ backgroundColor: hlColor, icon: "\u23F6" });
          fa = a.fName.toLowerCase();
          fb = b.fName.toLowerCase();
        } else {
          setFNameStyle({ backgroundColor: hlColor, icon: "\u23F7" });
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
      setLNameStyle({ backgroundColor: topColor, icon: null });
      setLNameFlip(false);
      setFNameFlip(!fNameFlip);
    }
    if (firstName === false) {
      tmp.sort((a, b) => {
        let fa;
        let fb;
        if (lNameFlip !== true) {
          setLNameStyle({ backgroundColor: hlColor, icon: "\u23F6" });
          fa = a.lName.toLowerCase();
          fb = b.lName.toLowerCase();
        } else {
          setLNameStyle({ backgroundColor: hlColor, icon: "\u23F7" });
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
      setFNameStyle({ backgroundColor: topColor, icon: null });
      setFNameFlip(false);
      setLNameFlip(!lNameFlip);
    }
    setList(tmp);
    setSort(!sort);
    setAgeFlip(false);
    setIdFlip(false);
    setIdStyle({ backgroundColor: topColor, icon: null });
    setAgeStyle({ backgroundColor: topColor, icon: null });
  };
  return (
    <div id="container">
      <div id="table">
        <table>
          <tbody>
            <tr>
              <th id="left" style={idStyle} onClick={() => sortByID()}>
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
              <th id="right"></th>
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
