import React from 'react'
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import { Fragment } from 'react'



const index = (props) => {

  console.log(props.interview)

  return (
    <Fragment>
      <Header time={props.time} />
      {props.interview ?
        <Show student={props.interview.student} interviewer={props.interview.interviewer} /> :
        <Empty />
      }
    </Fragment>
  )
}

export default index


