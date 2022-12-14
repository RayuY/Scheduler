import React from 'react'
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'
import Error from 'components/Appointment/Error'
import useVisualMode from 'hooks/useVisualMode'


const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"


  // import helper functions from hooks 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )


  // saves an appointment, shows transition SAVING and catch if there's error saving
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .catch((err) => {
        console.log(err)
        transition(ERROR_SAVE, true)
      })
  }

  // cancels an appointment, shows transition CONFIRM and catch if there's error saving
  function destroy() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true)
      })
  }

  return (

    <article className="appointment" data-testid="appointment">

      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === SAVING && (
        <Status message={"Saving"} />
      )}
      {mode === DELETE && (
        <Status message={"Deleting"} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => transition(SHOW)}
          onConfirm={destroy}
        />
      )}
        {mode === ERROR_DELETE && (
        <Error
          message={"Error"}
          onClose={() => back()}
        />
      )}
        {mode === ERROR_SAVE && (
        <Error
          message={"Error"}
          onClose={() => back()}
        />
      )}
    </article>
  )
}

export default Appointment
