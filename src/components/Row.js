import React, { useEffect, useState } from "react";

const Row = ({ row, updateValue }) => {
    const [inputValue, setInputValue] = useState("");
    const [variance, setVariance] = useState(0);
    const [oldData,setOldData] = useState(null);

    const calculatedValue = row.children
        ? row.children.reduce((sum, child) => sum + child.value, 0)
        : row.value;

    const handleAllocationPercentage = () => {
        setOldData(row.value)
        const percentage = parseFloat(inputValue);
        if (!isNaN(percentage)) {
            const newValue = row.value * (1 + percentage / 100);
            updateValue(row.id, newValue);
        }
    };

    const handleAllocationValue = () => {
        setOldData(row.value)
        const value = parseFloat(inputValue);
        if (!isNaN(value)) {
            updateValue(row.id, value);
        }
    };

    useEffect(() => {
        let calculated = oldData ? oldData : row.value;
        const updateVariance = (currentRow) => {
            const newCalculatedValue = currentRow.children
                ? currentRow.children.reduce((sum, child) => sum + child.value, 0)
                : currentRow.value;
            const newVariance = currentRow.value
                ? ((newCalculatedValue - calculated) / calculated) * 100
                : 0;
            setVariance(newVariance);
        };

        updateVariance(row);
        console.log(row.label, "=", row.value, "-", ":", variance);

    }, [calculatedValue, row.value, row.children]);

    return (
        <>
            <tr>
                <td>{row.label}</td>
                <td>{calculatedValue.toFixed(0)}</td>
                <td>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </td>
                <td>
                    <button onClick={handleAllocationPercentage}>Apply %</button>
                </td>
                <td>
                    <button onClick={handleAllocationValue}>Apply Value</button>
                </td>
                <td>{variance.toFixed(2)}%</td>
            </tr>
            {row.children &&
                row.children.map((child) => (
                    <Row key={child.id} row={child} updateValue={updateValue} />
                ))}
        </>
    );
};

export default Row;
