import React, { useEffect, useState } from 'react';
export default function Countdown() {
  const [minValue, setMinValue] = useState('');
  const [secValue, setSecValue] = useState('');

  const [minDisplay, setMinDisplay] = useState(0);
  const [secDisplay, setSecDisplay] = useState(0);

  const [running, setRunning] = useState(false);

  function startRunner() {
    setRunning(true);
    setMinDisplay(+minValue);
    setSecDisplay(+secValue);
  }

  function stopRunner() {
    setRunning(false);
    setMinDisplay(0);
    setSecDisplay(0);
  }

  useEffect(() => {
    let runner;
    // sec counts to 0

    // min -- if sec is 1

    if (!running) return;

    // if (secDisplay === 0) {
    //   setMinDisplay((min) => min - 1);
    //   setSecDisplay(59);
    // }
    console.log(minDisplay, secDisplay);
    runner = setInterval(() => {
      if (!secDisplay && !minDisplay) return clearInterval(runner);
      if (secDisplay > 0) setSecDisplay((sec) => sec - 1);

      if (secDisplay === 0) {
        setMinDisplay((min) => min - 1);
        setSecDisplay(59);
      }
    }, 1000);

    return () => clearInterval(runner);
  }, [running, secDisplay, minDisplay]);

  return (
    <div>
      <h1>Countdown timer</h1>
      <input
        type="number"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
      />

      <input
        type="number"
        value={secValue}
        onChange={(e) => setSecValue(e.target.value)}
      />
      <button onClick={startRunner}>start</button>
      <div>
        {minDisplay}: {secDisplay}
      </div>
    </div>
  );
}
