import React, { useEffect, useState } from "react";
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
      <ul>
        {list.map((id) => (
          <li>
            {id.id} {id.fName} {id.lName} {id.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Table;
