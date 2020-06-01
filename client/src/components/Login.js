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
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'

const Login = (props) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value,
        })
    }

    const onSubmit = async () => {
        props.login(user)
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardHeader>
                            <h3 style={{ textAlign: 'center' }}>Login</h3>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                {props.error.msg.msg ? (
                                    <Alert color='danger'>
                                        {props.error.msg.msg}
                                    </Alert>
                                ) : null}
                                <FormGroup>
                                    <Label for='username'>Username</Label>
                                    <Input
                                        type='text'
                                        id='username'
                                        value={user.username}
                                        onChange={onChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='password'>Password</Label>
                                    <Input
                                        type='text'
                                        id='password'
                                        value={user.password}
                                        onChange={onChange}
                                    />
                                </FormGroup>
                            </Form>
                            <FormText color='muted'>
                                Do not have an account?{' '}
                                <Link to='/createUser'>Register today!</Link>
                            </FormText>
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

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
})

export default connect(mapStateToProps, { login })(Login)
