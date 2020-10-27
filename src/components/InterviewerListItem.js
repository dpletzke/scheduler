import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const itemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });
  return (
    <li className={itemClass} onClick={() => setInterviewer(name)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
