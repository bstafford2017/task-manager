import React, { useEffect, useState } from 'react'
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
  CardFooter
} from 'reactstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateUser, deleteUser } from '../Auth/authActions'
import { clearErrors, setErrors } from '../Error/errorActions'
import { toast } from 'react-toastify'
import { LOGIN_URL } from '../Routes'

const Settings = ({
  user: loadedUser,
  deleteUser,
  updateUser,
  clearErrors,
  setErrors,
  ...props
}) => {
  const history = useHistory()
  const [user, setUser] = useState({
    _id: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    admin: false
  })

  useEffect(() => {
    if (Object.keys(loadedUser).length !== 0) {
      setUser({
        _id: loadedUser._id,
        username: loadedUser.username,
        password: loadedUser.password,
        confirmPassword: loadedUser.password,
        firstName: loadedUser.firstName,
        lastName: loadedUser.lastName,
        email: loadedUser.email,
        admin: loadedUser.admin
      })
    }
  }, [loadedUser])

  const {
    _id,
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    email,
    admin
  } = user

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const onChangeCheckbox = (e) => {
    setUser({
      ...user,
      admin: !admin
    })
  }

  const onUpdateUser = (e) => {
    if (Object.values(user).some((u) => u)) {
      if (password !== confirmPassword) {
        setErrors('Passwords do not match.', null, null)
      } else {
        toast.success('Updated user!')
        updateUser(user)
        clearErrors()
      }
    } else {
      setErrors('Please fill out the entire form', null, null)
    }
  }

  const onDeleteUser = (e) => {
    toast.success('Deleted user!')
    deleteUser(_id)
    history.push(LOGIN_URL)
  }

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
                    {props.error.message.message ? (
                      <Alert color='danger'>
                        {props.error.message.message}
                      </Alert>
                    ) : null}
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
                <Row>
                  <Col xs={12}>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type='checkbox'
                          checked={admin}
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
                    color='success'
                    onClick={onUpdateUser}
                  >
                    Update
                  </Button>
                </Col>
                <Col xs={12}>
                  <Button
                    className='col-12 m-2'
                    color='success'
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
  user: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  updateUser,
  deleteUser,
  clearErrors,
  setErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
