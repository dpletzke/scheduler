import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

import axios from 'axios';

export default function Application(props) {

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {}
  };
  const [state, setState] = useState(initialState);
  const setDay = day => setState({ ...state, day }); 

  useEffect(()=> {
    const getDays = axios.get('http://localhost:8001/api/days');
    const getAppointments = axios.get('http://localhost:8001/api/appointments');
    const getInterviewers = axios.get('http://localhost:8001/api/interviewers');
    
    Promise.all([getDays, getAppointments, getInterviewers]).then((all) => {
      const [
        { data: days },
        { data: appointments },
        { data: interviewers }
      ] = all;
      setState(prev => ({...prev, days, appointments, interviewers}));
    }).catch(err => {
      console.log(err);
    });
  }, [])

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    // const interview = getInterviewer(state, appointment.interview);
    const passProps = {
      ...appointment,
      key: appointment.id,
      onEdit: () => console.log(`Edit: ${appointment.id}`),
      onDelete: () => console.log(`Delete: ${appointment.id}`),
      onAdd: () => console.log(`Add: ${appointment.id}`)
    }
    return <Appointment {...passProps} />;
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        /></nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
