import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import List from './List';
import styled from 'styled-components';


const TaskInput = styled.input`
  width: 400px;
  height: 50px;
  font-size: 1.5rem;
`; 

const StartTaskButton = styled.button`
  width: 400px;
  height: 50px;
  font-size: 1.8rem;
  margin: 30px;
`;

const ValidationMessage = styled.div`
  color: red;
  // align-self: flex-start;
  text-align: left;
`;

const CurrentTaskBox = styled.div`
  height: 400px;
  width: 500px;
  font-size: 36px;
  color: black;
  border-radius: 10%;
  background-color: darkgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;

  &:hover {
    background-color: darkgoldenrod;
    color:aliceblue;
  }
`;


// let startTime = new Date().toLocaleTimeString();
let startTime: Date;

function Clock() {
  const [changeTaskFlag, setChangeTaskFlag] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [showvalidationError, setShowvalidationError] = useState(false);
  const [itemTitle, setItemTitle] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    setCurrentTask(newTaskTitle);
  }, [changeTaskFlag]);

  // const startTimeTime = time.toLocaleTimeString();

  // const handleButtonClick = (currentTime: string) => {
    
  // }

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  }

  const handleChangeTaskButtonClick = (currentTime: Date) => {
    if(newTaskTitle.trim() != "") {
      const newItem = { currentTime: currentTime, title: itemTitle }
      setItems([...items, currentTime.toLocaleTimeString()])
      startTime = currentTime;

      setChangeTaskFlag(changeTaskFlag+1);
      setShowvalidationError(false);
    } else setShowvalidationError(true);
  }

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("event.key: ", event.key);
    if (event.key === 'Enter') {
      // Enter 키를 누를 때, 버튼을 클릭한 것으로 처리합니다.
      handleChangeTaskButtonClick(currentTime);
    }
  };


  const timeFormatter = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  });

  let timeCount: string = "";
  // let hours;
  // let minutes;
  // let seconds;
  let formattedTimeCount;
  if(startTime != undefined) {
    const timeInterval = currentTime.getTime() - startTime.getTime();
    var newTime = new Date(timeInterval - (9 * 60 * 60 * 1000));
    // hours = newTime.getHours();
    // minutes = newTime.getMinutes();
    //   seconds = newTime.getSeconds();
    formattedTimeCount = timeFormatter.format(newTime);
  }

  return (
    changeTaskFlag != 0? <>
      <CurrentTaskBox>
        {currentTask}<br/><br/>
        {formattedTimeCount}
        <span>{startTime.toLocaleTimeString()} | {currentTime.toLocaleTimeString()}</span>
      </CurrentTaskBox>
      <div>
        <TaskInput 
          type="text" 
          value={newTaskTitle} 
          onChange={handleInputChange} 
          placeholder="What to do now"
          ref={inputRef}
          onKeyDown={handleEnterKeyDown}
            />
        <ValidationMessage>{showvalidationError? "Please enter a new task." : ""}</ValidationMessage> 
      </div>   
      <StartTaskButton onClick={() => handleChangeTaskButtonClick(currentTime)}>Switch Current Task </StartTaskButton> 
      <List items={items}/>
  </> : <>
    <div>
      <TaskInput 
        type="text" 
        value={newTaskTitle} 
        onChange={handleInputChange} 
        placeholder="What to do now"
        ref={inputRef}
        onKeyDown={handleEnterKeyDown}
          />
      <ValidationMessage>{showvalidationError? "Please enter your first task." : ""}</ValidationMessage> 
    </div>   
    <StartTaskButton onClick={() => handleChangeTaskButtonClick(currentTime)}>Start Time Tracking</StartTaskButton> 
  </>
    
  );
}

export default Clock;