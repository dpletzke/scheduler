import { useState, useEffect } from "react";
import axios from 'axios';

import { updateAppointments, rectifySpots } from '../helpers';

export default function useApplicationData () {

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

  const bookInterview = (interview, appointmentId) => {

    const appointments = updateAppointments(state, interview, appointmentId);
    const days = rectifySpots({ days:state.days, appointments }, appointmentId);

    const url = `http://localhost:8001/api/appointments/${appointmentId}`
    return axios.put(url, { interview }).then(res => {
      setState(prev => {
        return {...prev, appointments, days};
      });
    });
  }

  const cancelInterview = (appointmentId) => {

    const appointments = updateAppointments(state, null, appointmentId);
    const days = rectifySpots({ days:state.days, appointments }, appointmentId);

    const url = `http://localhost:8001/api/appointments/${appointmentId}`
    return axios.delete(url).then(res => {
      setState(prev => {
        return {...prev, appointments, days};
      });
    });
  }


  return {state, setDay, bookInterview, cancelInterview};
}