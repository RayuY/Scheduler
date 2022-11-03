import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from '../Button'

const Form = (props) => {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setStudent("")
    setInterviewer(null)
  }

  function cancel() {
    reset();
  }

  function handleSubmit (event) {
    event.preventDefault();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setStudent(e.target.value)}
          />
        </form >
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(e) => setInterviewer(e)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form