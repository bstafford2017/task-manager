import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    Table,
    Container
} from 'reactstrap'
import { connect } from 'react-redux'
import Task from './Task'
import { getTasks } from '../actions/taskActions'

const TaskList = (props) => {

	useEffect(() => {
        props.getTasks()
    }, [])

    return (
        <Container>
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
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {props.tasks.tasks.map(task =>
                        <Task task={task} />
                    )}
                </tbody>
            </Table>
        </Container>
    )
}

TaskList.propTypes = {
    getTasks: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    tasks: state.tasks
})

export default connect(mapStateToProps, { getTasks })(TaskList)