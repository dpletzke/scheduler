import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


import useVisualMode from "../../hooks/useVisualMode.js";



/* modes of the Appointment component */
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const EDIT = 'EDIT';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';


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
  const confirmProps = {
    message: 'Are you sure?',
    onCancel: () => back(),
    onConfirm: () => cancel(id)
  }
  const showProps = {
    student: interview ? interview.student : null,
    interviewer : interview ? interview.interviewer : null,
    onEdit: () => transition(EDIT),
    onDelete: () => transition(CONFIRM)
  }

  const formProps = {
    name: interview ? interview.student : null,
    interviewer: interview ? interview.interviewer.id : null,
    interviewers,
    onSave: (name, interviewer) => save(name, interviewer),
    onCancel: () => back()
  }

  const showSlot = (mode) => {
    switch (mode) {
      case EMPTY:     return <Empty {...emptyProps} />;
      case CREATE:    return <Form {...formProps} />;
      case EDIT:      return <Form {...formProps} />;
      case SHOW:      return <Show {...showProps} />;
      case SAVING:    return <Status message={SAVING} />;
      case CONFIRM:   return <Confirm {...confirmProps} />;
      case DELETING:  return <Status message={DELETING} />;
      default: break;
    }
  }

  return (
    <article className="appointment">
      <Header {...headerProps} />
      {showSlot(mode)} 
    </article>
  );
}