# Interview Scheduler
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors.

Interviews can be booked between Monday and Friday.
A user can switch between weekdays.
A user can book an interview in an empty appointment slot.
Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
A user can cancel an existing interview.
A user can edit the details of an existing interview.
The list of days informs the user how many slots are available for each day.
The expected day updates the number of spots available when an interview is booked or canceled.
A user is presented with a confirmation when they attempt to cancel an interview.
A user is shown an error if an interview cannot be saved or deleted.
A user is shown a status indicator while asynchronous operations are in progress.
When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
The application makes API requests to load and persist data. We do not lose data after a browser refresh.

Scheduler
![Scheduler](https://user-images.githubusercontent.com/83184359/218352234-a8c88ab1-486b-4e3c-878c-bdf657bcec13.png)

Form for appointment
![Book Appointment](https://user-images.githubusercontent.com/83184359/218352341-dd9a4d44-5f0c-499e-a55a-584871e338a9.png)

Enter name and select interviewer
![Enter appointment info](https://user-images.githubusercontent.com/83184359/218352455-6c1d9e41-eb72-41cf-ad22-9e7686f11b1d.png)

Appointment booked!
![New appointment](https://user-images.githubusercontent.com/83184359/218352776-ecace3de-83b1-4c03-bb47-5bb88272e2b4.png)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Project Stack

Front-End:
- React
- JSX
- SASS
- Axios
- HTML

Back-End:
- Express
- Node.js
- PostgreSQL

Testing:
- Cypress
- Jest
- Storybook

Dependencies
- axios
- react
- react-dom
- react-scripts