import axios from "axios";
import { useEffect, useState } from "react";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // fetch data api server
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, [])

  // helper function to be called in bookInterview and cancelInterview to provide updated spots left based on user action.
  function countSpotsLeft(appointments, day, days) {

    let spots = 0;
    const dayObj = days.find((item) => item.name === day)
    for (let id of dayObj.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }
    let newObj = {...dayObj, spots }
    const newDaysArr = days.map((item) => item.name === day ? newObj : item)
    return newDaysArr;
  }

  // books an appointment for user and update api database to keep changes
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // updates database with new appointment
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        const days = countSpotsLeft(appointments, state.day, state.days)
        setState((prev) => ({...prev, appointments, days}))
      })
  }

  // cancels an appointment for user and update api database to keep changes
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // delete appointment from database
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = countSpotsLeft(appointments, state.day, state.days)
        setState({ ...state, appointments, days})
      })
  }

  // updates state.day
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}



