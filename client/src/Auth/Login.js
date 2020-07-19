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
  CardFooter
} from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from './authActions'
import { HOME_URL } from '../Routes'

const Login = ({ login, ...props }) => {
  const history = useHistory()
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    await login(user)
    history.push(HOME_URL)
  }

  const { username, password } = user

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
                  <Alert color='danger'>{props.error.msg.msg}</Alert>
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
                <FormGroup>
                  <Label for='password'>Password</Label>
                  <Input
                    type='password'
                    id='password'
                    value={password}
                    onChange={onChange}
                  />
                </FormGroup>
              </Form>
              <FormText color='muted'>
                Do not have an account?{' '}
                <Link to='/register' className='text-success'>
                  Register today!
                </Link>
              </FormText>
            </CardBody>
            <CardFooter>
              <Button
                className='col-12 col-sm-4 offset-sm-4'
                color='success'
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
  error: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  error: state.error
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
