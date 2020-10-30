import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";


import useVisualMode from "../../hooks/useVisualMode.js";



/* modes of the Appointment component */
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';

export default function Appointment(props) {
  const {
    id, time, interview, interviewers, bookInterview, cancelInterview
  } = props;

  const initialVisualMode = interview ? SHOW : EMPTY;
  const {mode, back, transition} = useVisualMode(initialVisualMode);
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview({...interview}, id).then(res => {
      transition(SHOW);
    }).catch(err => {
      console.log(err);
    });
  }

  const cancel = (id) => {

    transition(DELETING);
    cancelInterview(id).then(res => {
      transition(EMPTY);
    }).catch(err => {
      console.log(err);
    });
  }

  const headerProps = { time };
  const emptyProps = { onAdd: () => transition(CREATE) };
  const showProps = {
    student: interview ? interview.student : null,
    interviewer : interview ? interview.interviewer : null,
    onEdit: () => transition(CREATE),
    onDelete: () => cancel(id)
  }


  const formProps = {
    name: interview ? interview.student : null,
    interviewer: interview ? interview.interviewer : null,
    interviewers,
    onSave: (name, interviewer) => save(name, interviewer),
    onCancel: () => back()
  }

  const showSlot = (mode) => {
    switch (mode) {
      case EMPTY: 
        return <Empty {...emptyProps} />;
      case SHOW: 
        return <Show {...showProps} />;
      case CREATE: 
        return <Form {...formProps} />;
      case SAVING: 
        return <Status message={SAVING} />;
      case DELETING:
        return <Status message={DELETING} />;
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