import React, { FC, ReactNode, useState, useEffect } from "react";
import axios from "axios";

const TableComponent = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://localhost:8080/users");
      let json = Object.values(response.data);
      console.log(json);
      setList(json);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {list.map((id) => (
          <li>
            <p>
              {id.id} {id.fName} {id.lName} {id.age}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableComponent;
