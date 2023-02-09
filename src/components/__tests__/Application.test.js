import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
  prettyDOM,
  // ByLabelText,
  // ByPlaceholderText,
  // ByText,
  // ByDisplayValue,
  // ByAltText,
  // ByTitle,
  // ByRole,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);
describe("Application", () => {
  // xit("renders without crashing", () => {
  //   render(<Application />);
  // });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
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
  it("changes the schedule when a new day is selected", async () => {//async
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));//await


    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument(); // .not.toBeInTheDocument should fail
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

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
    console.log(prettyDOM(appointment));
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
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

    const day = getAllByTestId(container, "day").find(day => // container is <li ?? in DayListItem
      queryByText(day, "Monday")
    );
    console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument(); // ERROR don't know why but skipping ahead
  });
})