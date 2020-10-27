import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";
const classNames = require('classnames');


export default function DayList(props) {
  const { days, day, setDay } = props;
  // const itemClass = classNames('day-list__item', {
  //   'day-list__item--selected': props.selected,
  //   'day-list__item--full': !props.spots
  // });
  
  const renderDays = days.map(({ id, name, spots }) => {
    const selected = day === name;
    const passProps = {
      selected,
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