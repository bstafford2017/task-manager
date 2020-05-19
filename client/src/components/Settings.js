import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Card, CardHeader, 
    CardBody, Form, FormGroup, Label, Input, Alert,
    Button, 
    CardFooter} from 'reactstrap'
import { connect } from 'react-redux'
import {
    getUser,
    updateUser
} from '../actions/userActions'

const Settings = (props) => {

    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    })
    const [alert, setAlert] = useState({
        msg: '',
        display: false,
        color: ''
    })

    const onChangeUsername = e => {
        setUser({ ...user, username: e.target.value })
    }

    const onChangePassword = e => {
        setUser({ ...user, password: e.target.value })
    }

    const onChangeConfirmPassword = e => {
        setUser({ ...user, confirmPassword: e.target.value })
    }

    const onChangeFirstName = e => {
        setUser({ ...user, firstName: e.target.value })
    }

    const onChangeLastName = e => {
        setUser({ ...user, lastName: e.target.value })
    }

    const onUpdate = e => {
        if(user.some(field => !field)) {
            setAlert({ 
                display: true,
                msg: 'Please fill out the entire form with valid entries.',
                color: 'danger'
            })
        } else {
            if(user.password !== user.confirmPassword) {
                setAlert({ 
                    display: true,
                    msg: 'Password do not match.',
                    color: 'danger'
                })
            } else {
                
            }
        }
    }

    const onDelete = e => {
        
    }

    useEffect(() => {
        props.getUser()
    }, [])

    return (
        <Container>
            <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
                <Card>
                    <CardHeader>
                        <h3 style={{ textAlign: 'center' }}>Settings</h3>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row form>
                                <Col xs={12}>
                                    <Alert isOpen={alert.display} color={alert.color}>{alert.msg}</Alert>
                                    <FormGroup>
                                        <Label for="username">Username</Label>
                                        <Input type="text" id="username" value={user.username} 
                                            onChange={onChangeUsername} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col xs={12} md={6}>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" id="password" value={user.password}
                                            onChange={onChangePassword} />
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormGroup>
                                        <Label for="confirm-password">Confirm Password</Label>
                                        <Input type="password" id="confirm-password" value={user.confirmPassword}
                                            onChange={onChangeConfirmPassword} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col xs={12} md={6}>
                                    <FormGroup>
                                        <Label for="first-name">First Name</Label>
                                        <Input type="text" id="first-name" value={user.firstName}
                                            onChange={onChangeFirstName} />
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={6}>
                                    <FormGroup>
                                        <Label for="last-name">Last Name</Label>
                                        <Input type="text" id="last-name" value={user.lastName}
                                            onChange={onChangeLastName} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" />{' '}
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
                                    className="col-12 m-2"
                                    onClick={onUpdate}>Update</Button>
                            </Col>
                            <Col xs={12}>
                                <Button
                                    className="col-12 m-2"
                                    onClick={onDelete}>Delete</Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        </Container>
    )
}

Settings.propTypes = {
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { getUser, updateUser })(Settings)