import React from "react";
import Row from "./Row";

const Table = ({ data, updateValue }) => {
    return (
        <table border="1" cellPadding="10">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                    <th>Input</th>
                    <th>Allocation %</th>
                    <th>Allocation Val</th>
                    <th>Variance %</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <Row key={row.id} row={row} updateValue={updateValue} />
                ))}
            </tbody>
        </table>
    );
};

export default Table;
