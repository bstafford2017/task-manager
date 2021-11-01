import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { connect } from 'react-redux'
import Task from './Task'
import { getTasks } from '../Tasks/taskActions'
import { Spinner } from 'reactstrap'
import Categories from '../Categories'
import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs'

const TaskList = ({ getTasks, loading, tasks, ...props }) => {
  const [search, setSearch] = useState('')
  const [displayFilter, setDisplayFilter] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [createBefore, setCreateBefore] = useState('')
  const [createAfter, setCreateAfter] = useState('')

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

  const onClear = (e) => {
    setCreateBefore('')
    setCreateAfter('')
    setSearch('')
    setSelectedCategory('')
  }

  const onCategory = (e) => {
    setSelectedCategory(e.target.value)
  }

  const onCreateBefore = (e) => {
    setCreateBefore(e.target.value)
  }

  const onCreateAfter = (e) => {
    setCreateAfter(e.target.value)
  }

  const matching = (task) =>
    search
      ? task.title.includes(search) ||
        task.category.includes(search) ||
        task.description.includes(search)
      : true

  return (
    <>
      <Row>
        {displayFilter ? (
          <Col sm={8}>
            {loading ? (
              <Spinner color='success' style={spinnerStyles} />
            ) : (
              <Row>
                {tasks.filter(matching).map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </Row>
            )}
          </Col>
        ) : (
          <Col sm={11}>
            {loading ? (
              <Spinner color='success' style={spinnerStyles} />
            ) : (
              <Row>
                {tasks.filter(matching).map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </Row>
            )}
          </Col>
        )}
        <Col sm={1}>
          <Button
            style={{ float: 'right' }}
            onClick={() => setDisplayFilter(!displayFilter)}
          >
            {displayFilter ? <BsFillCaretRightFill /> : <BsFillCaretLeftFill />}
          </Button>
        </Col>
        {displayFilter && (
          <Col
            sm={3}
            style={{
              backgroundColor: 'rgb(155,155,155)'
            }}
          >
            <CardBody>
              <h3 style={{ textAlign: 'center' }}>Filter</h3>
              <Row>
                <Label>Search:</Label>
                <Input
                  type='text'
                  value={search}
                  placeholder='Search tasks...'
                  onChange={onChange}
                />
              </Row>
              <Row>
                <Label>Category:</Label>
                <Input
                  type='select'
                  onChange={onCategory}
                  value={selectedCategory}
                >
                  {Categories.map((c) => (
                    <option>{c}</option>
                  ))}
                  <option selected={true}>None</option>
                </Input>
              </Row>
              <Row>
                <Label>Created before:</Label>
                <Input type='date' onChange={onCreateBefore} />
                <Label>Created after:</Label>
                <Input type='date' onChange={onCreateAfter} />
              </Row>
              <Row>
                <Button className='col-sm-4 offset-sm-4' onClick={onClear}>
                  Clear
                </Button>
              </Row>
            </CardBody>
          </Col>
        )}
      </Row>
    </>
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
