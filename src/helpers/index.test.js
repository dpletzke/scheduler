import { updateAppointments, rectifySpots } from "./index";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      spots: 2
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5, 6],
      spots: 1
    },
    {
      id: 3,
      name: "Thursday",
      appointments: [7],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    },
    "6": {
      id: 6,
      time: "10am",
      interview: { student: "Rodney Dangerfield", interviewer: 3 }
    },
    "7": { id: 7, time: "1pm", interview: null },

  },
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
    },
    "3": {
      id: 3,
      name: "Bill Murray",
      avatar: "https://www.fillmurray.com/80/80"
    }
  }
};

const appointments = {
  "1": { id: 1, time: "12pm", interview: { student: "Garfield", interviewer: 3 } },
  "2": { id: 2, time: "1pm", interview: null },
  "3": {
    id: 3,
    time: "2pm",
    interview: { student: "Archie Cohen", interviewer: 2 }
  },
  "4": { id: 4, time: "3pm", interview: null },
  "5": {
    id: 5,
    time: "4pm",
    interview: { student: "Chad Takahashi", interviewer: 2 }
  },
  "6": {
    id: 6,
    time: "10am",
    interview: { student: "Rodney Dangerfield", interviewer: 3 }
  },
  "7": { id: 7, time: "1pm", interview: null },
}

const interview = { student: "Garfield", interviewer: 3 };

/* updateAppointments */
test("updateAppointments returns an appointments object", () => {
  const result = updateAppointments(state, interview, 1);
  expect(Array.isArray(result)).toBe(false);
});

test("updateAppointments returns an object without changing the amount of appointments", () => {
  const result = updateAppointments(state, interview, 1);
  expect(Object.keys(result).length).toEqual(7);
});

test("updateAppointments returns an object with the correct appointment that has the correct interview data", () => {
  const result = updateAppointments(state, interview, 1);
  expect(result[1].interview.student).toEqual("Garfield");
});

test("updateAppointments does not mutate the original state", () => {
  updateAppointments(state, interview, 1);
  expect(state.appointments[1].interview).toBe(null);
});

/* rectifySpots */
//{days, new appointments}, appointmentId
test("rectifySpots returns an array", () => {
  const result = rectifySpots({ days: state.days, appointments}, 1);
  expect(Array.isArray(result)).toBe(true);
});

test("rectifySpots returns an array without changing the amount of days", () => {
  const result = rectifySpots({ days: state.days, appointments}, 1);
  expect(result.length).toEqual(3);
});

test("rectifySpots returns an array with the correct day with the correct number of spots", () => {
  const result = rectifySpots({ days: state.days, appointments}, 1);
  expect(result[0].spots).toEqual(1);
});

test("rectifySpots does not mutate the original state", () => {
  rectifySpots({ days: state.days, appointments}, 1);
  expect(state.days[0].spots).toEqual(2);
});

/* getAppointmentsForDay */
/*
test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

test("getInterview returns null if no interview is booked", () => {
  const result = getInterview(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});

test("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(1);
});

test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
  const [first, second] = getInterviewersForDay(state, "Tuesday");
  expect(first).toEqual(state.interviewers["2"]);
  expect(second).toEqual(state.interviewers["3"]);
});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day has appointments, but no interviews", () => {
  const result = getInterviewersForDay(state, "Thursday");
  expect(result.length).toEqual(0);
}); */