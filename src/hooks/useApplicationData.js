import axios from "axios";
import { useEffect, useState } from "react";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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

  // helper function
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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log(interview)

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        const days = countSpotsLeft(appointments, state.day, state.days)
        setState((prev) => ({...prev, appointments, days}))
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = countSpotsLeft(appointments, state.day, state.days)
        setState({ ...state, appointments, days})
      })
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}


