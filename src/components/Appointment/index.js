import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";


import useVisualMode from "../../hooks/useVisualMode.js";



const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';



export default function Appointment(props) {
  const {
    id, time, interview, interviewers, bookInterview
  } = props;

  const initialVisualMode = interview ? SHOW : EMPTY;
  const {mode, back, transition} = useVisualMode(initialVisualMode);
  
  const headerProps = { time };
  const emptyProps = { onAdd: () => transition(CREATE) };
  const showProps = {
    student: interview ? interview.student : null,
    interviewer : interview ? interview.interviewer : null,
    onEdit: () => transition(CREATE),
    onDelete: () => transition(EMPTY)
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview({...interview}, id);
    transition(SHOW);
  }

  const formProps = {
    name: interview ? interview.student : null,
    interviewer: interview ? interview.interviewer : null,
    interviewers,
    onSave: (name, interviewer) => save(name, interviewer),
    onCancel: () => back(),

  }

  const showSlot = (mode) => {
    switch (mode) {
      case EMPTY: 
        return <Empty {...emptyProps} />;
      case SHOW: 
        return <Show {...showProps} />;
      case CREATE: 
        return <Form {...formProps} />;
      default:
        break;
    }
  }

  return (
    <article className="appointment">
      <Header {...headerProps} />
      {showSlot(mode)} 
    </article>
  );
}