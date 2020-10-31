
import { getAppointmentsForDay } from './selectors';

/* will remove interview when interview is set to null */
export function updateAppointments(state, interview, appointmentId) {
  const newAppointment = {
    ...state.appointments[appointmentId],
    interview: interview ? { ...interview } : null
  };

  const newAppointments = {
    ...state.appointments,
    [appointmentId]: newAppointment
  };

  return newAppointments;
}


export function rectifySpots({ days, appointments }, appointmentId) {
  const dayIndex = days.findIndex(d => d.appointments.includes(appointmentId));
  const dayName = days[dayIndex].name;
  
  const newSpots = getAppointmentsForDay({ days, appointments }, dayName)
  .filter(appointment => !appointment.interview)
  .length;
  
  const newDays = [...days];
  newDays[dayIndex] = { ...days[dayIndex], spots: newSpots };
  
  return newDays;

}