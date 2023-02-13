export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((x) => x.name === day);
  if (!filteredDays) {
    return [];
  }
  const appointments = filteredDays.appointments.map((id) => state.appointments[id]);
  return appointments;
};

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
};

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((x) => x.name === day);
  if (!filteredDays) {
    return [];
  }
  const interviewers = filteredDays.interviewers.map((id) => state.interviewers[id]);
  return interviewers;
};
