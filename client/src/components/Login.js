import React, { useState } from 'react'
import {
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
import axios from 'axios'

const Login = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const [alert, setAlert] = useState({
        display: false,
        msg: '',
        color: ''
    })

    const onChangeUsername = e => {
        setUser({ ...user, username: e.target.value})
    }

    const onChangePassword = e => {
        setUser({ ...user, password: e.target.value})
    }

    const onSubmit = async () => {
        if(user.some(field => field)) {
            setAlert({ 
                display: true,
                msg: 'Invalid user or password. Please try again.',
                color: 'danger'
            })
        }

        try {
            const response = await axios({
                url: 'http://localhost:5000/api/account',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                data: {
                    username: user.username,
                    password: user.password
                }
            })
        } catch(err) {
            setAlert({ 
                display: true,
                msg: 'Invalid user or password. Please try again.',
                color: 'danger'
            })
        }
    }

    return (
        <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
            <Card>
                <CardHeader>
                    <h3 style={{ textAlign: 'center' }}>Login</h3>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Alert isOpen={alert.display} color={alert.color}>{alert.msg}</Alert>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" id="username" value={user.username}
                                onChange={onChangeUsername} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="text" id="password" value={user.password}
                                onChange={onChangePassword} />
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

export default Login