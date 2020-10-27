import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";
const classNames = require('classnames');


export default function DayList(props) {
  const { days, day, setDay } = props;
   
  const renderDays = days.map(({ id, name, spots }) => {
    const passProps = {
      selected: day === name,
      name, 
      setDay,
      key:id,
      spots
    }
    return (<DayListItem {...passProps} />)
  })
  

  return (
    <ul>
      {renderDays}
    </ul>
  );
}