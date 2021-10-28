import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Input, Row } from 'reactstrap'
import { connect } from 'react-redux'
import Task from './Task'
import { getTasks } from '../Tasks/taskActions'
import { Spinner } from 'reactstrap'

const TaskList = ({ getTasks, loading, tasks, ...props }) => {
  const [search, setSearch] = useState('')

  const spinnerStyles = {
    width: '5rem',
    height: '5rem',
    position: 'absolute',
    left: '50%',
    top: '50%'
  }

  useEffect(() => {
    getTasks()
  }, [getTasks])

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  const matching = (task) =>
    search
      ? task.title.includes(search) ||
        task.category.includes(search) ||
        task.description.includes(search)
      : true

  if (loading) return <Spinner color='success' style={spinnerStyles} />

  return (
    <Container fluid>
      <h2 style={{ textAlign: 'center' }}>Task List</h2>
      <Col
        sm={12}
        md={{
          offset: 3,
          size: 6
        }}
      >
        <Input
          type='text'
          value={search}
          placeholder='Search tasks...'
          onChange={onChange}
        />
      </Col>
      <Row>
        {tasks.filter(matching).map((task) => (
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
