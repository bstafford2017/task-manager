import React, { useState } from 'react'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import categories from '../Categories'
import { deleteTask, updateTask } from './taskActions'
import { toast } from 'react-toastify'

const Task = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const [task, setTask] = useState(props.task)

  const onToggle = (e) => {
    if (toggleEdit) {
      onUpdate(e)
    }
    setToggleEdit(!toggleEdit)
  }

  const onDelete = (e) => {
    toast.success(`Deleted task ${task._id}`)
    props.deleteTask(task._id)
  }

  const onUpdate = (e) => {
    toast.success(`Updated task ${task._id}`)
    props.updateTask(task)
  }

  const onChangeImportant = (e) =>
    setTask({ ...task, [e.target.id]: e.target.value === 'Yes' ? true : false })

  const onChange = (e) => setTask({ ...task, [e.target.id]: e.target.value })

  return toggleEdit ? (
    <tr>
      <td>{props.task._id}</td>
      <td>
        <Input id='title' type='text' value={task.title} onChange={onChange} />
      </td>
      <td>
        <Input id='category' type='select' onChange={onChange}>
          <option defaultValue>{task.category}</option>
          {categories.map((e) => {
            return <option value={e}>{e}</option>
          })}
        </Input>
      </td>
      <td>
        <Input id='important' type='select' onChange={onChangeImportant}>
          <option defaultValue>{task.important ? 'Yes' : 'No'}</option>
          <option>{task.important ? 'No' : 'Yes'}</option>
        </Input>
      </td>
      <td>{new Date(task.date).toLocaleDateString()}</td>
      <td>{new Date(task.date).toLocaleTimeString()}</td>
      {props.isAdmin ? (
        <>
          <td>
            <Button
              outline={toggleEdit ? false : true}
              color={toggleEdit ? 'success' : 'secondary'}
              size='sm'
              onClick={onToggle}
            >
              {toggleEdit ? 'Done' : 'Edit'}
            </Button>
          </td>
          <td>
            <Button color='danger' size='sm' onClick={onDelete}>
              &times;
            </Button>
          </td>
        </>
      ) : null}
    </tr>
  ) : (
    <tr>
      <td>{props.task._id}</td>
      <td>{props.task.title}</td>
      <td>{props.task.category}</td>
      <td>{props.task.important ? 'Yes' : 'No'}</td>
      <td>{new Date(props.task.date).toLocaleDateString()}</td>
      <td>{new Date(props.task.date).toLocaleTimeString()}</td>
      {props.isAdmin ? (
        <>
          <td>
            <Button
              outline={toggleEdit ? true : null}
              color='success'
              size='sm'
              onClick={onToggle}
            >
              {toggleEdit ? 'Done' : 'Edit'}
            </Button>
          </td>
          <td>
            <Button color='danger' size='sm' onClick={onDelete}>
              &times;
            </Button>
          </td>
        </>
      ) : null}
    </tr>
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
