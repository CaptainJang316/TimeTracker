import React from 'react';

interface ListProps {
    items: string[];
}

const List:React.FC<ListProps> = ({items}) => {
  const reversedList = [...items].reverse();
  console.log("reversedList: " + reversedList);
  // items.reverse();
  return (
    <ul>
      {reversedList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;