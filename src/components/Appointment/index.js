import React, { Fragment } from "react"
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {
  return (
    <>
      <article className="appointment"></article>
      <Header time={props.time} />
      {props.interview ? <Show/> : <Empty/>}
    </>
  )
} 