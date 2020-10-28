import React, { useState } from "react";
import InterviewerList from '../InterviewerList';
import Button from '../Button';
import { action } from "@storybook/addon-actions";

function reset(setName, setInterviewer) {
  setName("");
  setInterviewer(null);
}

function cancel(onCancel, setName, setInterviewer) {
  reset(setName, setInterviewer);
  onCancel();
}


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const {
    interviewers,
    onSave,
    onCancel
  } = props;

  const interviewerListProps = {
    interviewers,
    interviewer,
    setInterviewer
  }

  const cancelProps = {
    onClick: () => cancel(onCancel, setName, setInterviewer)
  }

  const saveProps = {
    onClick:() => onSave(name, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder='Enter Student Name'
            value={name && name}
            onChange={(event) => setName(event.target.value)}
            onSubmit={event => event.preventDefault()}
          />
        </form>
        <InterviewerList {...interviewerListProps} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button {...cancelProps} danger>Cancel</Button>
          <Button {...saveProps} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}

