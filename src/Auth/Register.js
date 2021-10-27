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
  FormText
} from 'reactstrap'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { register } from './authActions'
import { setErrors, clearErrors } from '../Error/errorActions'
import { LOGIN_URL } from '../Routes'

const Register = ({ register, error, setErrors, clearErrors, ...props }) => {
  const history = useHistory()
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: ''
  })

  const { username, password, confirmPassword, firstName, lastName, email } =
    user

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const onRegister = async (e) => {
    if (
      username &&
      password &&
      confirmPassword &&
      firstName &&
      lastName &&
      email
    ) {
      if (password !== confirmPassword) {
        setErrors('Passwords do not match', null, null)
      } else {
        register(user)
        clearErrors()
        history.push(LOGIN_URL)
      }
    } else {
      setErrors('Please fill out the entire form', null, null)
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <h3 style={{ textAlign: 'center' }}>Register</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <Row form>
                  <Col xs={12}>
                    {error ? <Alert color='danger'>{error}</Alert> : null}
                    <FormGroup>
                      <Label for='username'>Username</Label>
                      <Input
                        type='text'
                        id='username'
                        value={username}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label for='password'>Password</Label>
                      <Input
                        type='password'
                        id='password'
                        value={password}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label for='confirmPassword'>Confirm Password</Label>
                      <Input
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label for='firstName'>First Name</Label>
                      <Input
                        type='text'
                        id='firstName'
                        value={firstName}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <FormGroup>
                      <Label for='lastName'>Last Name</Label>
                      <Input
                        type='text'
                        id='lastName'
                        value={lastName}
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
                        value={email}
                        onChange={onChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <FormText color='muted'>
                Have an account?{' '}
                <Link to='/' className='text-success' tabIndex='-1'>
                  Login here!
                </Link>
              </FormText>
            </CardBody>
            <CardFooter>
              <Row>
                <Col xs={12}>
                  <Button
                    className='col-12 m-2'
                    color='success'
                    onClick={onRegister}
                  >
                    Register
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

Register.propTypes = {
  error: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  error: state.error.message
})

const mapDispatchToProps = {
  register,
  setErrors,
  clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
