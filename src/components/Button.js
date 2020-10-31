import React from "react";
import "components/Button.scss";
const classNames = require('classnames');


export default function Button(props) {
  
  const classFromProps = {
    ' button--confirm': props.confirm,
    ' button--danger': props.danger
  }
  let buttonClass = classNames('button', classFromProps);


  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

