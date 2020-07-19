import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Alert,
  Button,
  CardFooter
} from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import categories from '../Categories'
import { addTask } from './taskActions'
import { toast } from 'react-toastify'
import { returnErrors, clearErrors } from '../Error/errorActions'

const CreateTask = ({
  addTask,
  error,
  returnErrors,
  clearErrors,
  ...props
}) => {
  const [task, setTask] = useState({
    title: '',
    category: '',
    description: '',
    important: false
  })

  const onChangeImportant = (e) => {
    setTask({
      ...task,
      [e.target.id]: e.target.checked
    })
  }

  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.id]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    if (Object.values(task).some((t) => t)) {
      toast.success('Added new task')
      addTask(task)
      setTask({
        title: '',
        category: '',
        description: '',
        important: false
      })
      clearErrors()
    } else {
      returnErrors('Please fill out the entire form', null, null)
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <h3 style={{ textAlign: 'center' }}>Create a Task</h3>
            </CardHeader>
            <CardBody>
              <Form>
                {error ? <Alert color='danger'>{error}</Alert> : null}
                <FormGroup>
                  <Label for='title'>Title</Label>
                  <Input
                    type='text'
                    id='title'
                    value={task.title}
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='category'>Category</Label>
                  <Input
                    type='select'
                    id='category'
                    value={task.category}
                    onChange={onChange}
                  >
                    <option hidden defaultValue>
                      Select
                    </option>
                    {categories.map((e) => {
                      return (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      )
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for='description'>Description</Label>
                  <Input
                    type='textarea'
                    id='description'
                    value={task.description}
                    onChange={onChange}
                  />
                  <FormText color='muted'>
                    The more important provided, the better assistance I can
                    give.
                  </FormText>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='checkbox'
                      id='important'
                      checked={task.important}
                      onChange={onChangeImportant}
                    />{' '}
                    Important
                  </Label>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                className='col-12 col-sm-4 offset-sm-4'
                color='success'
                onClick={onSubmit}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

CreateTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error.msg
})

const mapDispatchToProps = {
  addTask,
  returnErrors,
  clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)
