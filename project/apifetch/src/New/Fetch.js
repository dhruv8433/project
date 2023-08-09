// we have to fetch data from json placeholder
import React, { useEffect, useState } from "react";

const Fetch = () => {
  const [Data, setData] = useState([]);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then((response) => setData(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <h1>Hello World</h1>
        <h2>Fetching Data from api</h2>
        {
            Data.map((response) => {
                return(
                    <>
                    </>
                )
            })
        }
    </div>
  );
};

export default Fetch;
