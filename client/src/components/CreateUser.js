import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    Button,
    CardFooter,
    FormText,
} from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { register } from '../actions/authActions'
import { returnErrors, clearErrors } from '../actions/errorActions'

const CreateUser = (props) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
    })

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        })
    }

    const onCreateUser = async (e) => {
        if (user.password !== user.confirmPassword) {
            props.returnErrors('Passwords do not match.', null, null)
        } else {
            props.register(user)
            props.clearErrors()
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardHeader>
                            <h3 style={{ textAlign: 'center' }}>Create User</h3>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row form>
                                    <Col xs={12}>
                                        {props.error.msg.msg ? (
                                            <Alert color='danger'>
                                                {props.error.msg.msg}
                                            </Alert>
                                        ) : null}
                                        <FormGroup>
                                            <Label for='username'>
                                                Username
                                            </Label>
                                            <Input
                                                type='text'
                                                id='username'
                                                value={user.username}
                                                onChange={onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for='password'>
                                                Password
                                            </Label>
                                            <Input
                                                type='password'
                                                id='password'
                                                value={user.password}
                                                onChange={onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for='confirmPassword'>
                                                Confirm Password
                                            </Label>
                                            <Input
                                                type='password'
                                                id='confirmPassword'
                                                value={user.confirmPassword}
                                                onChange={onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for='firstName'>
                                                First Name
                                            </Label>
                                            <Input
                                                type='text'
                                                id='firstName'
                                                value={user.firstName}
                                                onChange={onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormGroup>
                                            <Label for='lastName'>
                                                Last Name
                                            </Label>
                                            <Input
                                                type='text'
                                                id='lastName'
                                                value={user.lastName}
                                                onChange={onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <FormGroup>
                                            <Label for='email'>Email</Label>
                                            <Input
                                                type='text'
                                                id='email'
                                                value={user.email}
                                                onChange={onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <FormText color='muted'>
                                Have an account? <Link to='/'>Login here!</Link>
                            </FormText>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col xs={12}>
                                    <Button
                                        className='col-12 m-2'
                                        onClick={onCreateUser}
                                    >
                                        Create User
                                    </Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

CreateUser.propTypes = {
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
})

export default connect(mapStateToProps, {
    register,
    returnErrors,
    clearErrors,
})(CreateUser)
