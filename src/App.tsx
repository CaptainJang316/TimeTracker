import React from 'react';
import './App.css';
import Clock from './Clock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
      </header>
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';

// function DigitalClock() {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (date:Date) => {
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');

//     return `${hours}:${minutes}:${seconds}`;
//   };

//   return (
//     <div>
//       <h1>Digital Clock</h1>
//       <p>{formatTime(time)}</p>
//     </div>
//   );
// }

// export default DigitalClock;