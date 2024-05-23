import React, { useEffect, useState } from 'react';
export default function CountryCapitalcCheck() {
  return (
    <div>
      <CountryCapitalGame data={{ Germany: 'Berlin', Azerbaijan: 'Baku' }} />
    </div>
  );
}

function CountryCapitalGame({ data }) {
  const [lastIndex, setLastIndex] = useState<number | undefined>();

  const defaultData = Object.keys(data).concat(Object.values(data));

  const [dataArray, setDataArray] = useState(
    defaultData.sort(() => 0.5 - Math.random())
  );
  const [itemColors, setItemColors] = useState(
    new Array(dataArray.length).fill('').map(() => undefined)
  );

  const lastItem = dataArray[lastIndex];
  function handleClick(index) {
    const item = dataArray[index];
    let itemColorsCopy = [...itemColors];

    const resetColors = () => {
      itemColorsCopy = itemColorsCopy.map(() => undefined);
    };
    if (itemColorsCopy.filter((clr) => clr === 'red').length === 2) {
      resetColors();
    }
    itemColorsCopy[index] = 'blue';
    setItemColors(itemColorsCopy);
    if (lastItem) {
      if (data[lastItem] === item || data[item] === lastItem) {
        setDataArray((prev) =>
          prev.filter((i) => ![item, lastItem].includes(i))
        );
        resetColors();
        setItemColors(itemColorsCopy);
      } else {
        itemColorsCopy[index] = 'red';
        itemColorsCopy[lastIndex] = 'red';
      }
      setLastIndex(undefined);
    } else {
      if (itemColors.some((color) => color)) {
        setItemColors(
          new Array(dataArray.length).fill('').map(() => undefined)
        );
        itemColorsCopy[index] = 'blue';
        setItemColors(itemColorsCopy);
      }
      setLastIndex(index);
    }
  }

  console.log(itemColors);

  return (
    <div>
      <h1>Counties and Capitals</h1>
      {dataArray.length ? (
        dataArray.map((item, index) => (
          <button
            style={{
              backgroundColor: itemColors[index],
              color: itemColors[index] ? '#fff' : undefined,
            }}
            onClick={() => handleClick(index)}
            key={item}
          >
            {item}
          </button>
        ))
      ) : (
        <div>
          <p>Congrats!</p>
          <button onClick={() => setDataArray(defaultData)}>start</button>
        </div>
      )}
    </div>
  );
}
