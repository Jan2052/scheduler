import React from 'react';
import axios from 'axios';

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText,
  queryByAltText,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);
describe('Application', () => {
  it('1. defaults to Monday and changes the schedule when a new day is selected', () => {
    const {getByText} = render(<Application />);

    return waitForElement(() => getByText('Monday'));
  });

  it('2. changes the schedule when a new day is selected', async () => {
    const {getByText} = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('3. loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    const {container, debug} = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, 'appointment');// getAllByTestId finds by data-testid attribute that we input (data-testid='appointment') into index.js
    const appointment = appointments[0]; // first appointment is 12pm and currently interview is set to null (in our axios.js mock file)

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: 'Lydia Miller-Jones'},
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday'),
    );

    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  it('4. loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const {container, debug} = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
        (appointment) => queryByText(appointment, 'Archie Cohen'),
    );

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    expect(
        getByText(appointment, 'Are you sure you would like to delete?'),
    ).toBeInTheDocument();


    fireEvent.click(queryByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, 'Add'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday'),
    );

    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('5. loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const {container, debug} = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
        (appointment) => queryByText(appointment, 'Archie Cohen'),
    );

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: 'Janet Lam'},
    });

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday'),
    );

    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('6. shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();
    const {container, debug} = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
        (appointment) => queryByText(appointment, 'Archie Cohen'),
    );

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: 'Lydia Miller-Jones'},
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));


    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Could not save appointment.'));
    expect(getByText(appointment, 'Could not save appointment.')).toBeInTheDocument();
  });

  it('7. shows the delete error when failing to delete an existing appointment', async () => {
    axios.delete.mockRejectedValueOnce();
    const {container, debug} = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
        (appointment) => queryByText(appointment, 'Archie Cohen'),
    );

    fireEvent.click(getByAltText(appointment, 'Delete'));

    expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();


    await waitForElement(() => getByText(appointment, 'Could not cancel appointment.'));
    fireEvent.click(getByAltText(appointment, 'Close'));

    await waitForElement(() => getByText(container, 'Archie Cohen'));
  });
});
