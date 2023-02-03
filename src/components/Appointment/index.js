import React from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
  }

  const deleteInterview = () => {
    transition(DELETING)
    props.deleteInterview(props.id).then(() => {
      transition(EMPTY);
    })
  }

  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
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
            // onCancel={()=> transition(SHOW)}
            onCancel={() => back(SHOW)}
            onConfirm={deleteInterview}
          />)}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        )}
      </article>
    </>
  )
}