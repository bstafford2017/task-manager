import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { addComment, deleteTask, updateTask } from './taskActions'
import { toast } from 'react-toastify'

const Task = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const [task, setTask] = useState(props.task)
  const [comments] = useState(props.task.comments)
  const [comment, setComment] = useState('')

  const bold = {
    fontWeight: 'bold'
  }

  const noPadding = {
    paddingLeft: 0,
    paddingRight: 0
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

  const onChangeComment = (e) => setComment(e.target.value)

  const submitComment = async (e) => {
    e.preventDefault()
    await props.addComment(task.id, {
      user: props.username,
      text: comment
    })
    comments.push({
      user: props.username,
      text: comment,
      createdOn: new Date()
    })
    setComment('')
  }

  return (
    <Col sm={12} md={6}>
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
          <Form style={{ margin: '15px' }}>
            <FormGroup row>
              <Label style={bold}>ID: </Label>
              <Label>{task.id}</Label>
            </FormGroup>
            <FormGroup row>
              <Label style={bold}>Title: </Label>
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
            </FormGroup>
            <FormGroup row>
              <Label style={bold}>Category: </Label>
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
            </FormGroup>
            <FormGroup row>
              <Label style={bold}>Description: </Label>
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
            </FormGroup>
            <FormGroup row>
              <Label style={bold}>Created on: </Label>
              <Label>{new Date(task.date).toLocaleString()}</Label>
            </FormGroup>
            <FormGroup row>
              <Label style={bold}>Important: </Label>
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
        {comments.map((c) => (
          <CardFooter>
            <Row>
              <Col sm={3}>
                <Label style={bold}>{c.user}</Label>
              </Col>
              <Col sm={9}>
                <Label style={{ color: '#222' }}>{c.text}</Label>
              </Col>
            </Row>
            <Label style={{ fontStyle: 'italic', color: 'grey' }}>
              Posted on {new Date(c.createdOn).toLocaleString()}
            </Label>
          </CardFooter>
        ))}
        <CardFooter>
          <Row>
            <Col sm={9} style={noPadding}>
              <Input type='text' value={comment} onChange={onChangeComment} />
            </Col>
            <Col sm={3} style={noPadding}>
              <Button onClick={submitComment}>Comment</Button>
            </Col>
          </Row>
        </CardFooter>
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
  isAdmin: state.auth.user.admin,
  username: state.auth.user.username
})

const mapDispatchToProps = {
  deleteTask,
  updateTask,
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
