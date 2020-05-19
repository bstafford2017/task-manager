import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { deleteTask } from '../actions/taskActions'

const Task = (props) => {

    const onDelete = e => {
        props.deleteTask(props.task._id)
    }

    return (
        <tr>
            <td>{props.task._id}</td>
            <td>{props.task.title}</td>
            <td>{props.task.category}</td>
            <td>{props.task.important ? 'Yes' : 'No'}</td>
            <td>{new Date(props.task.date).toLocaleDateString()}</td>
            <td>{new Date(props.task.date).toLocaleTimeString()}</td>
            <td><Button
                    color="danger"
                    size="sm"
                    onClick={onDelete}>&times;</Button></td>
        </tr>
    )
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired
}

export default connect(null, { deleteTask })(Task)