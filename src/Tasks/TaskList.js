import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container, Row } from 'reactstrap'
import { connect } from 'react-redux'
import Task from './Task'
import { getTasks } from '../Tasks/taskActions'
import { Spinner } from 'reactstrap'

const TaskList = ({ getTasks, loading, tasks, ...props }) => {
  const spinnerStyles = {
    width: '5rem',
    height: '5rem',
    position: 'absolute',
    left: '50%',
    top: '50%'
  }

  useEffect(() => {
    if (tasks.length === 0) getTasks()
  }, [getTasks])

  if (loading) return <Spinner color='success' style={spinnerStyles} />

  return (
    <Container fluid>
      <h2 style={{ textAlign: 'center' }}>Task List</h2>
      <Row xs='1' md='2'>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Row>
    </Container>
  )
}

TaskList.propTypes = {
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
  isAdmin: state.auth.user.admin,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.tasks.loading
})

const mapDispatchToProps = {
  getTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
