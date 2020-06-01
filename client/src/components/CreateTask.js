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
    CardFooter,
} from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTask } from '../actions/taskActions'

const CreateTask = (props) => {
    // Array destructuring
    const [task, setTask] = useState({
        title: '',
        category: '',
        description: '',
        important: false,
    })

    const onChange = (e) => {
        setTask({
            ...task,
            [e.target.id]: e.target.checked || e.target.value,
        })
    }

    const onSubmit = async (e) => {
        console.log(task)
        props.addTask(task)
        setTask({
            title: '',
            category: '',
            description: '',
            important: false,
        })
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardHeader>
                            <h3 style={{ textAlign: 'center' }}>
                                Create a Task
                            </h3>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                {props.error.msg.msg ? (
                                    <Alert color='danger'>
                                        {props.error.msg.msg}
                                    </Alert>
                                ) : null}
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
                                        <option>Printing</option>
                                        <option>Updating</option>
                                        <option>Networking/Internet</option>
                                        <option>Other</option>
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
                                        The more important provided, the better
                                        assistance I can give.
                                    </FormText>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type='checkbox'
                                            id='important'
                                            checked={task.important}
                                            onChange={onChange}
                                        />{' '}
                                        Important
                                    </Label>
                                </FormGroup>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button
                                className='col-12 col-sm-4 offset-sm-4'
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
    error: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    error: state.error,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { addTask })(CreateTask)
