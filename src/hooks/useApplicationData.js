import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
      .catch((error) => {
        console.log("ERROR", error.message)
      })
  }, [])

  const updateSpots = (id, shouldAddSpot) => {
    state.days.forEach((day) => {
      if (day.appointments.includes(id)) {
        if (shouldAddSpot) {
          day.spots += 1;
        } 
        if (!shouldAddSpot && day.spots > 0){
          day.spots -= 1;
        }
      }
    })
  }


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        updateSpots(id, false)
        setState({ ...state, appointments })
      })
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
    return axios.delete(`/api/appointments/${id}`, { appointments })
      .then(() => {
        updateSpots(id, true)
        setState({ ...state, appointments })
      })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}