import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";
const classNames = require('classnames');


export default function Header(props) {
  const { time } = props;
   
  // const renderDays = days.map(({ id, name, spots }) => {
    // const passProps = {
      // selected: day === name,
      // name, 
      // setDay,
      // key:id,
      // spots
    // }
    // return (<DayListItem {...passProps} />)
  // })
  

  return (
  <header className="appointment__time">
    <h4 className="text--semi-bold">{time}</h4>
    <hr className="appointment__separator" />
  </header>
  );
}