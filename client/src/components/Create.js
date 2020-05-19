import React, { useState } from 'react'
import {
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
import { addTask } from '../actions/taskActions'

const Create = (props) => {

    // Array destructuring
    const [task, setTask] = useState({
        title: '',
        category: '',
        description: '',
        important: false
    })
    const [alert, setAlert] = useState({
        display: false,
        msg: '',
        color: ''
    })

    const onDismiss = () => setAlert({ ...alert, display: false});

    const onChangeTitle = e => {
        setTask({ ...task, title: e.target.value })
    }

    const onChangeCategory = e => {
        setTask({ ...task, category: e.target.value })
    }

    const onChangeDescription = e => {
        setTask({ ...task, description: e.target.value })
    }

    const onChangeImportant = e => {
        setTask({ ...task, important: e.target.checked })
    }

    const onChangeFile = e => {
        setTask({ ...task, file: e.target.value })
    }

    const onSubmit = async e => {
        if(Object.keys(task)
            .filter(taskKey => taskKey !== 'important')
            .some(taskKey => !task[taskKey])) {
            setAlert({ 
                display: true,
                msg: 'Please fill out the entire form with valid entries.',
                color: 'danger'
            })
        } else {
            props.addTask(task)
            setAlert({ 
                display: true,
                msg: 'Successfully submitted task!',
                color: 'success'
            })
            setTask({
                title: '',
                category: '',
                description: '',
                important: false
            })
        }
    }

    return (
        <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
            <Card>
                <CardHeader>
                    <h3 style={{ textAlign: 'center' }}>Create a Task</h3>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Alert
                            isOpen={alert.display}
                            toggle={onDismiss}
                            color={alert.color}>{alert.msg}</Alert>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" id="title" value={task.title}
                                onChange={onChangeTitle} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <Input type="select" id="category" value={task.category}
                                onChange={onChangeCategory}>
                                <option hidden defaultValue>Select</option>
                                <option>Printing</option>
                                <option>Updating</option>
                                <option>Networking/Internet</option>
                                <option>Other</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" id="description" value={task.description}
                                onChange={onChangeDescription} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="file">Image</Label>
                            <Input type="file" id="file" onChange={onChangeFile} /> 
                            <FormText color="muted">
                            This is optional
                            </FormText>      
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" checked={task.important}
                                    onChange={onChangeImportant} />{' '}
                                Important
                            </Label>
                        </FormGroup>
                    </Form>
                </CardBody>
                <CardFooter>
                    <Button className="col-12 col-sm-4 offset-sm-4" onClick={onSubmit}>Submit</Button>
                </CardFooter>
            </Card>
        </Col>
    )
}

Create.propTypes = {
    addTask: PropTypes.func.isRequired
}

export default connect(null, { addTask })(Create)