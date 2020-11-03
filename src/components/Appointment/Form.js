import React, { useState } from "react";
import InterviewerList from '../InterviewerList';
import Button from '../Button';

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
  const [error, setError] = useState("");

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

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError(null);
    onSave(name, interviewer);
  }

  const cancelProps = {
    onClick: () => cancel(onCancel, setName, setInterviewer)
  }

  const saveProps = {
    onClick:() => validate(name, interviewer)
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
            data-testid='student-name-input'
          />
        </form>
        <section className="appointment__validation">{error}</section>
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

