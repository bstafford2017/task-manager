import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { deleteTask } from './taskActions'

const Task = (props) => {
    const [toggleEdit, setToggleEdit] = useState(false)

    const onDelete = (e) => {
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
            {props.isAdmin ? (
                <td>
                    <Button color='danger' size='sm' onClick={onDelete}>
                        &times;
                    </Button>
                </td>
            ) : null}
        </tr>
    )
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    isAdmin: state.auth.user.admin,
})

export default connect(mapStateToProps, { deleteTask })(Task)
