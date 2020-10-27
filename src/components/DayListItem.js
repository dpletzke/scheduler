import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

function formatSpots(spots) {
  return (spots ? spots : 'no') + (spots !== 1 ? ' spots' : ' spot') + ' remaining';
} 


export default function DayListItem(props) {

  const itemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });
  return (
    <li className={itemClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}