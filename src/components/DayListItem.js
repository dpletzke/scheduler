import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

function formatSpots(spots) {
  return (spots ? spots : 'no') + (spots !== 1 ? ' spots' : ' spot') + ' remaining';
} 


export default function DayListItem(props) {
  const { selected, spots, setDay, name } = props;


  const itemClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': !spots
  });
  return (
    <li className={itemClass} onClick={() => setDay(name)} data-testid="day" >
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}