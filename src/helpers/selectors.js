

// returns appointment IDs for a specific day
export function getAppointmentsForDay(state, dayName) {

  if (!dayName) {
    return [];
  }

  const day = state.days.find(dayObj => dayObj.name === dayName);

  if (!day) {
    return [];
  }

  const apptID = day.appointments;

  const appointments = apptID.map((id) => {
    return state.appointments[id]
  })

  return appointments;
};


// returns interviewers for a specific day
export function getInterviewersForDay(state, day) {
  
  let interviewers = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      interviewers = dayObj.interviewers;
    }
  }

  const interviewerList = interviewers.map((id) => {
    for (let interviewer in state.interviewers) {
      if (Number(interviewer) === id) {
        return state.interviewers[interviewer];
      }
    } 
    return null;
  })

  return interviewerList;

};


// returns information of a specific interview
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
};