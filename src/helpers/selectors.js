export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;

  const today = days.find(d => d.name === day);

  if (!today || !today.appointments) {
    return [];
  } else {
    const appointmentData = Object.values(appointments);
    return  appointmentData.filter(({ id }) => today.appointments.includes(id));
  }
}