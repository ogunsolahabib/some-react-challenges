import * as React from 'react';
import './style.css';
import Countdown from './components/Countdown';
import ColorGuess from './components/ColorGuess';
import MemoryGame from './components/MemoryGame';
import CountryCapitalcCheck from './components/CountriesCapitalCheck';
import TreeStructureDisplay from './components/TreeStructure';

// Create a countdown timer. It should have the following:
// * 2 input fields(one to take mins, the other to take seconds )
// * A button for starting the timer
// * A display section that shows the countdown
// e.g Input of 1 min 30 seconds should show:
//  1: 30
// 1: 29
// 1: 28
// ….
// 0:0

const { useState, useEffect } = React;

export default function App() {
  return (
    <div id="container">
      {/* <Countdown /> */}
      {/* <ColorGuess /> */}
      {/* <MemoryGame /> */}
      {/* <CountryCapitalcCheck /> */}
      <TreeStructureDisplay />
    </div>
  );
  const [minVal, setMinVal] = useState(0);
  const [secVal, setSecVal] = useState(0);

  const [minText, setMinText] = useState(0);
  const [secText, setSecText] = useState(0);

  const [running, setRunning] = useState(false);

  useEffect(() => {
    let runner;

    setInterval(() => {
      if (runner && (+minText > 0 || +secText > 0)) {
        if (+secText == 0) {
          setSecText(59);
          setMinText(+minText - 1);
        } else {
          setSecText(+secText - 1);
          console.log('run', running);
        }
      } else {
        clearInterval(runner);
      }
    }, 1000);

    return () => {
      clearInterval(runner);
    };
  }, [running, secText, minText]);

  const startTimer = () => {
    setMinText(minVal);
    setSecText(secVal);
    setRunning(true);
  };
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <input value={minVal} onChange={(e) => setMinVal(e.target.value)} />
      <input value={secVal} onChange={(e) => setSecVal(e.target.value)} />
      <button onClick={startTimer}>Start</button>
      <div>
        <span>{minText ?? 0}</span>:<span>{secText ?? 0}</span>
      </div>
    </div>
  );
}

// export default function App() {
//   const [min, setMin] = useState(0);
//   const [sec, setSec] = useState(0);

//   const [minCount, setMinCount] = useState('0');
//   const [secCount, setSecCount] = useState('0');

//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let runner;

//     runner = setInterval(
//       () => {
//         if (sec !== 0) {
//           return;

//           if (sec >= 0) {
//             setSecCount((prev) => `${sec === 59 ? 0 : +prev + 1}`);
//           }
//         }
//       },

//       1000
//     );
//     return () => {
//       clearInterval(runner);
//     };
//   }, [isRunning, minCount, secCount]);

//   const startTimer = () => {
//     setRunning(true);
//   };

//   return (
//     <div>
//       <h1>Hello StackBlitz!</h1>

//       <input
//         value={min}
//         placeholder="Minutes"
//         onChange={(e) => setMin(+e.target.value)}
//       />
//       <input
//         value={sec}
//         placeholder="Seconds"
//         onChange={(e) => setSec(+e.target.value)}
//       />

//       <button onClick={startTimer}>Start</button>
//       <h3>
//         {minCount}: {secCount}
//       </h3>
//     </div>
//   );
// }
