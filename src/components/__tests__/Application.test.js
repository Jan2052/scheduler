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
  getByAltText
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

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    console.log(prettyDOM(appointment));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  });
})