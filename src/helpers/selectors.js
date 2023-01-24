export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((x) => x.name === day);
  if (!filteredDays) {
    return [];
  }
  const appointments = filteredDays.appointments.map((id) => state.appointments[id])
  return appointments
}