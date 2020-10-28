import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";

export default function Appointment(props) {
  const { time } = props;

  const passProps = {
    time
  }

  return (
    <article className="appointment">
      <Header {...passProps} />
    </article>
  );
}