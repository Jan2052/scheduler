export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((x) => x.name === day);
  if (!filteredDays) {
    return [];
  }
  const appointments = filteredDays.appointments.map((id) => state.appointments[id])
  return appointments
}



export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewers: {
        "1": {  
          "id": 1,
          "name": "Sylvia Palmer",
          "avatar": "https://i.imgur.com/LpaY82x.png"
        },
        "2": {
          id: 2,
          name: "Tori Malcolm",
          avatar: "https://i.imgur.com/Nmx0Qxo.png"
        }
      }
    }
  }
  return null;
}