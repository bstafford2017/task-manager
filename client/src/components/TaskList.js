import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Container } from 'reactstrap'
import { connect } from 'react-redux'
import Task from './Task'
import { getTasks } from '../actions/taskActions'

const TaskList = (props) => {
    const { getTasks } = props
    useEffect(() => {
        getTasks()
    }, [getTasks])

    return (
        <Container fluid>
            <h3 style={{ textAlign: 'center' }}>Task List</h3>
            <Table dark>
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Important</th>
                        <th>Date</th>
                        <th>Time</th>
                        {props.isAdmin ? (
                            <>
                                <th>Edit</th>
                                <th>Delete</th>
                            </>
                        ) : null}
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {props.tasks.map((task) => (
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
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    tasks: state.tasks.tasks,
    isAdmin: state.auth.user.admin,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { getTasks })(TaskList)
