import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => {
        transition(ERROR_SAVE, true)
        // console.log("ERROR SAVING", error)
      });
  }

  const destroy = (event) => {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => {
        transition(ERROR_DELETE, true)
        // console.log("ERROR DELETING",error)
      })
  }

  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
        {mode === SHOW && (
          <Show
            student={props.interview.student} //'student' often gives errors of null 
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />)}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        )}
        {mode === SAVING && (<Status message={"Saving"} />)}
        {mode === DELETING && (<Status message={"Deleting"} />)}
        {mode === CONFIRM && (
          <Confirm
            message={"Are you sure you would like to delete?"}
            onCancel={() => back(SHOW)}
            onConfirm={destroy}
          />)}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewers={props.interviewers}
            onCancel={() => back(SHOW)}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message={"Could not save appointment."}
            onClose={() => transition(EDIT)}
          />)}
        {mode === ERROR_DELETE && (
          <Error
            message={"Could not cancel appointment."}
            onClose={back} // not working
          />)}
      </article>
    </>
  )
}