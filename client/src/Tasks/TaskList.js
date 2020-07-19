import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Container } from 'reactstrap'
import { connect } from 'react-redux'
import Task from './Task'
import { getTasks } from '../Tasks/taskActions'

const TaskList = ({ getTasks, tasks, ...props }) => {
  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <Container fluid>
      <h2 style={{ textAlign: 'center' }}>Task List</h2>
      <Table dark>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Important</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </tbody>
      </Table>
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
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  getTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
