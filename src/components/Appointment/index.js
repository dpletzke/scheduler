import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {
  const {
    time,
    interview,
    onEdit,
    onDelete, 
    onAdd 
  } = props;

  const headerProps = {
    time
  }

  /* props must be declared even if component they are for won't show */
  let showProps;
  if (interview) {
    showProps = {
      student: interview.student,
      interviewer : interview.interviewer,
      onEdit,
      onDelete
    }
  };
  
  const emptyProps = {
    onAdd
  }

  return (
    <article className="appointment">
      <Header {...headerProps} />
      {interview ? <Show {...showProps} /> : <Empty {...emptyProps} />}
    </article>
  );
}