import React from 'react'
import InterviewerListItem from './InterviewerListItem'
import 'components/InterviewerList.scss'

import PropTypes from 'prop-types'

const InterviewerList = (props) => {

  let interviewItem = props.interviewers.map((interviewer) => {
    return <InterviewerListItem 
      key = {interviewer.id}
      name = {interviewer.name}
      avatar = {interviewer.avatar}
      selected = {interviewer.id === props.value}
      setInterviewer = {() => props.onChange(interviewer.id)}
      />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewItem}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList