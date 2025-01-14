import React, { useState } from "react";
import Table from "./components/Table";

const App = () => {
  const [data, setData] = useState([
    {
      id: "electronics",
      label: "Electronics",
      value: 1400,
      children: [
        { id: "phones", label: "Phones", value: 800 },
        { id: "laptops", label: "Laptops", value: 700 },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      children: [
        { id: "tables", label: "Tables", value: 300 },
        { id: "chairs", label: "Chairs", value: 700 },
      ],
    },
  ]);

  const updateValue = (id, newValue) => {
    const updateHierarchy = (rows) => {
      return rows.map((row) => {
        if (row.id === id) {
          row.value = newValue;
        }
        if (row.children) {
          row.children = updateHierarchy(row.children);
        }
        return row;
      });
    };
    const updatedData = updateHierarchy(data);
    setData(updatedData);
  };

  return (
    <div>
      <h1>Hierarchical Table</h1>
      <Table data={data} updateValue={updateValue} />
    </div>
  );
};

export default App;
