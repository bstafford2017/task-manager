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
} from 'reactstrap'
import { connect } from 'react-redux'
import { register } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'

const Settings = (props) => {
    const loadedUser = props.user
    const [user, setUser] = useState({
        username: loadedUser?.username || '',
        password: 'password',
        confirmPassword: 'password',
        firstName: loadedUser?.firstName || '',
        lastName: loadedUser?.lastName || '',
        email: loadedUser?.email || '',
        admin: loadedUser?.admin || false,
    })

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        })
    }

    const onChangeCheckbox = (e) => {
        setUser({
            ...user,
            admin: !user.admin,
        })
    }

    const onUpdateUser = (e) => {
        if (user.password !== user.confirmPassword) {
            props.returnErrors('Passwords do not match.', null, null)
        } else {
            props.register(user)
            props.clearErrors()
        }
    }

    const onDeleteUser = (e) => {}

    return (
        <Container fluid>
            <Row>
                <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardHeader>
                            <h3 style={{ textAlign: 'center' }}>Settings</h3>
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
                                <Row>
                                    <Col xs={12}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type='checkbox'
                                                    checked={user.admin}
                                                    onChange={onChangeCheckbox}
                                                />{' '}
                                                Administrator
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col xs={12}>
                                    <Button
                                        className='col-12 m-2'
                                        onClick={onUpdateUser}
                                    >
                                        Update
                                    </Button>
                                </Col>
                                <Col xs={12}>
                                    <Button
                                        className='col-12 m-2'
                                        onClick={onDeleteUser}
                                    >
                                        Delete
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

Settings.propTypes = {
    user: PropTypes.object,
    error: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    error: state.error,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { register, clearErrors })(Settings)
