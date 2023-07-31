import React, { useState, useEffect } from 'react';
import List from './List';

function Clock() {
  const [time, setTime] = useState(new Date());
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalID);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  const handleButtonClick = (currentTime: string) => {
    setItems([...items, formattedTime])
  }

  return (
    <>
        <div className="clock" onClick={() => handleButtonClick(formattedTime)}>
        {formattedTime}<br/>
        Switch Current Task
        </div>
        <List items={items}/>
    </>
  );
}

export default Clock;