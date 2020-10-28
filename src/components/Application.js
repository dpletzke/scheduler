import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import axios from 'axios';



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Thrall',
      interviewer: {
        id: 1, 
        name: 'Vampire',
        avatar: "https://www.fillmurray.com/80/80"
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "3pm",
  }
];

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:8001/api/days').then((res) => {
      setDays(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

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
          days={days}
          day={day}
          setDay={setDay}
        /></nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          const passProps = {
            ...appointment,
            key: appointment.id,
            onEdit: () => console.log(`Edit: ${appointment.id}`),
            onDelete: () => console.log(`Delete: ${appointment.id}`),
            onAdd: () => console.log(`Add: ${appointment.id}`)
          }
          return <Appointment {...passProps} />;
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
