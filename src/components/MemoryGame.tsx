import React, { useState } from 'react';

const defaultValues = [
  [0, 2, 4, 1],
  [5, 1, 0, 5],
  [4, 3, 2, 3],
];

export default function MemoryGame() {
  const [values] = useState(defaultValues);

  const [isPaused, setIsPaused] = useState(false);

  const [valuesStatus, setValuesStatus] = useState(
    new Array(values.length)
      .fill('')
      .map((val) => new Array(values[0].length).fill(false))
  );

  const [lastValueObj, setLastValueObj] = useState<
    { rowIndex: number; colIndex: number } | undefined
  >();

  function handleClick(rowIndex, colIndex) {
    if (valuesStatus[rowIndex][colIndex] || isPaused) return;
    const lastValue = lastValueObj
      ? values[lastValueObj.rowIndex][lastValueObj.colIndex]
      : undefined;
    console.log(lastValue);

    const clickedValue = values[rowIndex][colIndex];

    const statusCopy = [...valuesStatus];
    statusCopy[rowIndex][colIndex] = true;
    setValuesStatus(statusCopy);

    if (lastValueObj) {
      if (clickedValue !== lastValue) {
        setIsPaused(true);
        setTimeout(() => {
          const statusCopy = [...valuesStatus];
          statusCopy[lastValueObj.rowIndex][lastValueObj.colIndex] = false;
          statusCopy[rowIndex][colIndex] = false;

          setValuesStatus(statusCopy);
          setLastValueObj(undefined);
          setIsPaused(false);
        }, 1000);
      } else {
        setLastValueObj(undefined);
        if (valuesStatus.flat().every((revealed) => revealed)) {
          setTimeout(() => {
            alert('congrats');
          }, 1000);
        }
      }
    } else {
      setLastValueObj({ rowIndex, colIndex });
    }
  }

  return (
    <div>
      <h1>Memory Game</h1>
      <div
        style={{
          display: 'grid',
          gap: 10,
          gridTemplateRows: 'repeat(4, auto)',
          gridTemplateColumns: 'repeat(4, auto)',
          justifyContent: 'center',
        }}
      >
        {values.map((row, i) =>
          row.map((col, j) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                handleClick(i, j);
              }}
              key={`${i}${j}`}
              style={{ width: 50, height: 50, border: '1px solid' }}
            >
              {valuesStatus[i][j] ? col : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
