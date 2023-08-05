import React, { useState, useEffect, ChangeEvent } from 'react';
import List from './List';
import styled from 'styled-components';


const InitialTaskInput = styled.input`
  width: 400px;
  height: 50px;
  margin: 30px;
  font-size: 1.5rem;
`; 

const StartButton = styled.button`
  width: 400px;
  height: 50px;
  font-size: 1.8rem;
`;


// let startTime = new Date().toLocaleTimeString();
let startTime: string;

function Clock() {
  const [startFlag, setStartFlag] = useState<boolean>(false);
  const [time, setTime] = useState(new Date());
  const [currentTaskTitle, setCurrentTaskTitle] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [itemTitle, setItemTitle] = useState<string>("");


  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalID);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  const handleButtonClick = (currentTime: string) => {
    const newItem = { currentTime: currentTime, title: itemTitle }
    setItems([...items, formattedTime])
    startTime = formattedTime;
  }

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTaskTitle(event.target.value);
  }

  const handleStartButtonClick = () => {
    setStartFlag(true);
  }

  return (
    startFlag? <>
      <div className="clock" onClick={() => handleButtonClick(formattedTime)}>
        {currentTaskTitle}<br/>
        {formattedTime}<br/>
        Switch Current Task
      </div>
      <List items={items}/>
  </> : <>
    <InitialTaskInput type="text" value={currentTaskTitle} onChange={handleInputChange} placeholder="What to do now"/>
    <StartButton onClick={handleStartButtonClick}>Start Time Tracking</StartButton> 
  </>
    
  );
}

export default Clock;