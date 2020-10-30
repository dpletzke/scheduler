export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;

  const today = days.find(d => d.name === day);

  if (!today || !today.appointments) {
    return [];
  } else {
    const appointmentData = Object.values(appointments);
    return appointmentData.filter(({ id }) => today.appointments.includes(id));
  }
}

export function getInterview(state, interview) {
  const { interviewers } = state;
  
  if(!interview) {
    return null;
  } else {
    const interviewer = interviewers[interview.interviewer];
    return {...interview, interviewer }
  }
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;

  const today = days.find(d => d.name === day);

  if (!today || !today.appointments) {
    return [];
  } else {

    const todaysInterviewerIds = getAppointmentsForDay(state, day)
        .filter(({ interview }) => interview)
        .map(({ interview }) => interview.interviewer);

    const todaysInterviewers = Object.values(interviewers)
        .filter(({ id }) => todaysInterviewerIds.includes(id));

    return todaysInterviewers;
  }
}


