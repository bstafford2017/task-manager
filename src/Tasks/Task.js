import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { deleteTask, updateTask } from './taskActions'
import { toast } from 'react-toastify'

const Task = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const [task, setTask] = useState(props.task)

  const bold = {
    fontWeight: 'bold'
  }

  const onToggle = (e) => {
    if (toggleEdit) {
      onUpdate(e)
    }
    setToggleEdit(!toggleEdit)
  }

  const onDelete = (e) => {
    toast.success(`Deleted task ${task.id}`)
    props.deleteTask(task.id)
  }

  const onUpdate = (e) => {
    // toast.success(`Updated task ${task.id}`)
    // props.updateTask(task)
  }

  const onChange = (e) => setTask({ ...task, [e.target.id]: e.target.value })

  return (
    <Col sm={12} md={6} xl={3}>
      <Card style={{ maxWidth: '450px', margin: '15px' }}>
        <CardHeader>
          <h3 style={{ display: 'inline' }}>{task.title}</h3>
          <Button
            style={{
              borderWidth: 1,
              borderColor: 'rgb(255,0,0)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              backgroundColor: 'rgb(255,0,0)',
              borderRadius: 50,
              float: 'right'
            }}
            onClick={onDelete}
          >
            x
          </Button>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Col sm={4}>
                <Label style={bold}>ID: </Label>
              </Col>
              <Col sm={8}>
                <Label>{task.id}</Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label style={bold}>Title: </Label>
              </Col>
              <Col sm={8}>
                {toggleEdit ? (
                  <Input
                    id='title'
                    type='text'
                    value={task.title}
                    onChange={onChange}
                  />
                ) : (
                  <Label>{task.title}</Label>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label style={bold}>Category: </Label>
              </Col>
              <Col sm={8}>
                {toggleEdit ? (
                  <Input
                    id='category'
                    type='text'
                    value={task.category}
                    onChange={onChange}
                  />
                ) : (
                  <Label>{task.category}</Label>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label style={bold}>Description: </Label>
              </Col>
              <Col sm={8}>
                {toggleEdit ? (
                  <Input
                    id='description'
                    type='text'
                    value={task.description}
                    onChange={onChange}
                  />
                ) : (
                  <Label>{task.description}</Label>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label style={bold}>Created on: </Label>
              </Col>
              <Col sm={8}>
                <Label>{new Date(task.date).toUTCString()}</Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={4}>
                <Label style={bold}>Important: </Label>
              </Col>
              <Col sm={8}>
                {toggleEdit ? (
                  <Input
                    id='important'
                    type='checkbox'
                    value={task.important}
                    onChange={onChange}
                  />
                ) : (
                  <Label>{task.important ? 'Yes' : 'No'}</Label>
                )}
              </Col>
            </FormGroup>
          </Form>
          <Button
            sm={3}
            onClick={onToggle}
            style={{ float: 'right' }}
            color='success'
          >
            Edit
          </Button>
        </CardBody>
      </Card>
    </Col>
  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.user.admin
})

const mapDispatchToProps = {
  deleteTask,
  updateTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
