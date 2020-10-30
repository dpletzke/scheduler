import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;
   
  const renderInterviewers = Object.values(interviewers).map(({ id, name, avatar }) => {
    const passProps = {
      key:id,
      name, 
      avatar,
      selected: id === interviewer,
      setInterviewer: (event) => setInterviewer(id)
    }
    return (
      <InterviewerListItem {...passProps} />
    )
  })
  

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{renderInterviewers}</ul>
    </section>
  );
}