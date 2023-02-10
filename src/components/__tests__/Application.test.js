import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
  prettyDOM,
  ByLabelText,
  ByPlaceholderText,
  ByText,
  ByDisplayValue,
  ByAltText,
  ByTitle,
  ByRole,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

// To check our tests run in terminal
// npm test -- --coverage --watchAll=false

afterEach(cleanup);
describe("Application", () => {
  // xit("renders without crashing", () => {
  //   render(<Application />);
  // });

  it("1. defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"));
  });

  // it("defaults to Monday and changes the schedule when a new day is selected", () => {
  //   const { getByText } = render(<Application />);

  //   return waitForElement(() => getByText("Monday")).then(() => {
  //     fireEvent.click(getByText("Tuesday"));
  //     expect(getByText("Leopold Silvers")).toBeInTheDocument();
  //   });
  // });
  //^^^^^Replaced^^^^^
  it("2. changes the schedule when a new day is selected", async () => {//async
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));//await


    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument(); // .not.toBeInTheDocument should fail
  });

  it("3. loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));// container ??

    const appointments = getAllByTestId(container, "appointment");//getAllByTestId finds by data-testid attribute that we input (data-testid="appointment") into index.js
    const appointment = appointments[0]; //first appointment is 12pm and currently interview is set to null (in our axios.js mock file)

    fireEvent.click(getByAltText(appointment, "Add"));// getByAltText finds "Add" by image alt attribute

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" } //input student name
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); //chosing interviewer by image alt attribute

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // console.log(prettyDOM(appointment));

    const day = getAllByTestId(container, "day").find(day => // container is <li in DayListItem
      queryByText(day, "Monday")
    );
    console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument(); // ERROR
  });
//CANCELLING
  it("4. loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Add" button on the first empty appointment.
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    // 5. Click the first interviewer in the list.
    // 6. Click the "Save" button on that same appointment.
    // 7. Check that the element with the text "Saving" is displayed.
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
  });
})
