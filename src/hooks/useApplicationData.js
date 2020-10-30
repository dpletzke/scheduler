import { useState, useEffect } from "react";
import axios from 'axios';

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


  return {state, setDay, bookInterview, cancelInterview};
}