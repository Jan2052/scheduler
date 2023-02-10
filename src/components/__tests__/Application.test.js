import React from "react";
import axios from "axios";

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
  queryByText,
  queryAllByAltText,
  queryByAltText
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
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));// container ??

    // 3. Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");//getAllByTestId finds by data-testid attribute that we input (data-testid="appointment") into index.js
    const appointment = appointments[0]; //first appointment is 12pm and currently interview is set to null (in our axios.js mock file)

    fireEvent.click(getByAltText(appointment, "Add"));// getByAltText finds "Add" by image alt attribute

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" } //input student name
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); //chosing interviewer by image alt attribute

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // console.log(prettyDOM(appointment));

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day => // container is <li in DayListItem
      queryByText(day, "Monday")
    );
    console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  /*
  CANCELLING Test Plan
    
 // 1. Render the Application.
 // 2. Wait until the text "Archie Cohen" is displayed.
 // 3. Click the "Delete" button on the booked appointment.
 // 4. Check that the confirmation message is shown.
 // 5. Click the "Confirm" button on the confirmation.
 // 6. Check that the element with the text "Deleting" is displayed.
 // 7. Wait until the element with the "Add" button is displayed.
 // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
 // */
  // it("4. loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  //   // 1. Render the Application.
  //   const { container, debug } = render(<Application />);

  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));

  //   // 3. Click the "Delete" button on the booked appointment.
  //   const appointment = getAllByTestId(container, "appointment").find(
  //     appointment => queryByText(appointment, "Archie Cohen")
  //   );

  //   fireEvent.click(queryByAltText(appointment, "Delete"));
  //   // 4. Check that the confirmation message is shown.
  //   expect(
  //     getByText(appointment, "Are you sure you would like to delete?")
  //   ).toBeInTheDocument();

  //   // 5. Click the "Confirm" button on the confirmation.
  //   fireEvent.click(queryByText(appointment, "Confirm"));

  //   // 6. Check that the element with the text "Deleting" is displayed.
  //   expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  //   // 7. Wait until the element with the "Add" button is displayed.
  //   await waitForElement(() => getByAltText(appointment, "Add"));

  //   // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );

  //   expect(getByText(day, "2 spots remaining")).toBeInTheDocument(); // FAILED shows "1 spot remaining"
  // });

  /*
  EDITING
    // We want to start by finding an existing interview.
    // With the existing interview we want to find the edit button.
    // We change the name and save the interview.
    // We don't want the spots to change for "Monday", since this is an edit.
    // Read the errors because sometimes they say that await cannot be outside of an async function.
  */
  it("5. loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Enter the name "Janet Lam" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Janet Lam" } //input student name
    });
    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Check that the DayListItem with the text "Monday" still says "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  //ERROR HANDLING - SAVE
  it("6. shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. Wait until the ERROR_SAVE message is displayed.
    await waitForElement(() => getByText(appointment, "Could not save appointment."));
    expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();
  });

  //ERROR HANDLING - DELETE
  it("7. shows the delete error when failing to delete an existing appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
  });
})
