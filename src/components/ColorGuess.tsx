import React, { useEffect, useState } from 'react';

const hexChars = Array.from({ length: 10 }, (_, i) => `${i}`).concat([
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
]);
export default function ColorGuess() {
  const [correctColor, setCorrectColor] = useState('');

  const [options, setOptions] = useState([]);

  const [status, setStatus] = useState<Status | undefined>();

  function genColor() {
    return `#${new Array(6)
      .fill('')
      .map(() => hexChars[Math.floor(Math.random() * hexChars.length)])
      .join('')}`;
  }
  function init() {
    const correct = genColor();

    const options = [correct, genColor(), genColor()].sort(
      () => 0.5 - Math.random()
    );

    setOptions(options);

    setCorrectColor(correct);
  }
  enum Status {
    Wrong,
    Correct,
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (status === Status.Correct) init();
  }, [status]);

  function handleClick(opt) {
    if (opt !== correctColor) setStatus(Status.Wrong);
    if (opt === correctColor) setStatus(Status.Correct);
  }

  console.log(options);
  return (
    <div>
      <h1>Color guess</h1>
      <div
        style={{
          display: 'flex',
          gap: 20,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: correctColor,
            width: 200,
            height: 200,
          }}
        />
        <div>
          {options.map((opt) => (
            <button onClick={() => handleClick(opt)}>{opt}</button>
          ))}
        </div>
        <p>
          {status === Status.Correct
            ? 'Correct'
            : status === Status.Wrong
            ? 'Wrong'
            : null}
        </p>
      </div>
    </div>
  );
}
