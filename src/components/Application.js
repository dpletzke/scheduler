import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

import axios from 'axios';

export default function Application(props) {

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {}
  };
  const [state, setState] = useState(initialState);
  const setDay = day => setState(prev => ({ ...prev, day })); 
 
   useEffect(()=> {
    const getDays = axios.get('http://localhost:8001/api/days');
    const getAppointments = axios.get('http://localhost:8001/api/appointments');
    const getInterviewers = axios.get('http://localhost:8001/api/interviewers');
    
    Promise.all([getDays, getAppointments, getInterviewers]).then((all) => {
      const [
        { data: days }, { data: appointments }, { data: interviewers }
      ] = all;

      setState(prev => ({...prev, days, appointments, interviewers}));
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const bookInterview = (interview, id) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const url = `http://localhost:8001/api/appointments/${id}`
    return axios.put(url, { interview }).then(res => {
      setState(prev => {
        return {...prev, appointments};
      });
    });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `http://localhost:8001/api/appointments/${id}`
    return axios.delete(url).then(res => {
      setState(prev => {
        return {...prev, appointments};
      });
    });
  }


  /* build schedule */
  const appointmentsForToday = getAppointmentsForDay(state, state.day);
  const schedule = appointmentsForToday.map(appointment => {

    const interview = getInterview(state, appointment.interview);
    
    const passProps = {
      ...appointment,
      key: appointment.id,
      interview,
      interviewers: state.interviewers,
      bookInterview,
      cancelInterview
    }
    return <Appointment {...passProps} />;
  });

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
