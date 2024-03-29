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
import categories from '../Categories'
import { AiOutlineClose } from 'react-icons/ai'
import { BsCheck, BsPencil } from 'react-icons/bs'
import { BsFillCaretRightFill, BsFillCaretUpFill } from 'react-icons/bs'

const Task = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const [task, setTask] = useState(props.task)
  const [comments] = useState(props.task.comments)
  const [comment, setComment] = useState('')
  const [hideComments, setHideComments] = useState(true)

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

  const generateComment = (comment) => (
    <CardFooter>
      <Row>
        <Col sm={3}>
          <Label style={bold}>{comment.user}</Label>
        </Col>
        <Col sm={9}>
          <Label style={{ color: '#222' }}>{comment.text}</Label>
        </Col>
      </Row>
      <Label style={{ fontStyle: 'italic', color: 'grey' }}>
        Posted on {new Date(comment.createdOn).toLocaleString()}
      </Label>
    </CardFooter>
  )

  return (
    <Col sm={12} md={6}>
      <Card className='m-3'>
        <CardHeader>
          <h3 style={{ display: 'inline' }}>{task.title}</h3>
          <Button
            style={{
              borderWidth: 1,
              borderColor: 'rgb(255,0,0)',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgb(255,0,0)',
              float: 'right'
            }}
            onClick={onDelete}
          >
            <AiOutlineClose />
          </Button>
        </CardHeader>
        <CardBody>
          <Form style={{ margin: '15px' }}>
            <FormGroup row>
              <Label style={bold}>ID: </Label>
              <Label>{task.id}</Label>
            </FormGroup>
            <FormGroup row>
              <Label style={bold}>Created by: </Label>
              <Label>{task.username || 'qwe'}</Label>
            </FormGroup>
            <FormGroup row>
              {toggleEdit ? (
                <Input
                  id='title'
                  type='text'
                  value={task.title}
                  onChange={onChange}
                />
              ) : (
                <>
                  <Label style={bold}>Title: </Label>
                  <Label>{task.title}</Label>
                </>
              )}
            </FormGroup>
            <FormGroup row>
              {toggleEdit ? (
                <Input
                  id='category'
                  type='select'
                  value={task.category}
                  onChange={onChange}
                >
                  {categories.map((c) => (
                    <option selected={c === task.category}>{c}</option>
                  ))}
                </Input>
              ) : (
                <>
                  <Label style={bold}>Category: </Label>
                  <Label>{task.category}</Label>
                </>
              )}
            </FormGroup>
            <FormGroup row>
              {toggleEdit ? (
                <Input
                  id='description'
                  type='text'
                  value={task.description}
                  onChange={onChange}
                />
              ) : (
                <>
                  <Label style={bold}>Description: </Label>
                  <Label>{task.description}</Label>
                </>
              )}
            </FormGroup>
            <FormGroup row>
              <Label style={bold}>Created on: </Label>
              <Label>{new Date(task.date).toLocaleString()}</Label>
            </FormGroup>
            {toggleEdit ? (
              <FormGroup check>
                <Input
                  id='important'
                  type='checkbox'
                  value={task.important}
                  onChange={onChange}
                />
                <Label style={bold} check>
                  Important:{' '}
                </Label>
              </FormGroup>
            ) : (
              <FormGroup row>
                <Label style={bold}>Important: </Label>
                <Label>{task.important ? 'Yes' : 'No'}</Label>
              </FormGroup>
            )}
            {toggleEdit ? (
              <FormGroup row>
                <Input
                  id='status'
                  type='select'
                  value={task.status}
                  onChange={onChange}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Complete</option>
                </Input>
              </FormGroup>
            ) : (
              <FormGroup row>
                <Label style={bold}>Status: </Label>
                <Label>{task.status || 'Pending'}</Label>
              </FormGroup>
            )}
            {toggleEdit ? (
              <FormGroup row>
                <Input
                  id='priority'
                  type='select'
                  value={task.priority}
                  onChange={onChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Input>
              </FormGroup>
            ) : (
              <FormGroup row>
                <Label style={bold}>Priority: </Label>
                <Label>{task.priority || 'Low'}</Label>
              </FormGroup>
            )}
          </Form>
          <Button
            sm={3}
            onClick={onToggle}
            style={{ float: 'right' }}
            color='success'
          >
            {toggleEdit ? <BsCheck /> : <BsPencil />}
          </Button>
        </CardBody>
        {hideComments
          ? comments.filter((_, i) => i === 0).map(generateComment)
          : comments.map(generateComment)}
        {hideComments ? (
          <CardFooter>
            <Label
              style={{
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underline'
              }}
              onClick={(e) => setHideComments(false)}
            >
              <BsFillCaretRightFill />
              Show Comments
            </Label>
          </CardFooter>
        ) : (
          <CardFooter>
            <Label
              style={{
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underline'
              }}
              onClick={(e) => setHideComments(true)}
            >
              <BsFillCaretUpFill />
              Hide Comments
            </Label>
          </CardFooter>
        )}
        <CardFooter>
          <Row>
            <Input type='textarea' value={comment} onChange={onChangeComment} />
          </Row>
          <Row>
            <Button className='col-sm-4 offset-sm-8' onClick={submitComment}>
              Comment
            </Button>
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
