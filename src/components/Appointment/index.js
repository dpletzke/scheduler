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
    time, interview, interviewers
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

  // name
  // interviewers,
  // interviewer
  // onSave,
  // onCancel
  const formProps = {
    name: interview ? interview.student : null,
    interview: interview ? interview : null,
    interviewer: interview ? interview.interviewer : null,
    interviewers,
    onSave: () => console.log('onSave:' + interview.student),
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