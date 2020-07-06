import React from './node_modules/react'
import { Container, Row, Col } from './node_modules/reactstrap'

const NotFound = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} sm={{ size: 6, offset: 3 }}>
                    <h3 style={{ textAlign: 'center' }}>Page Not Found</h3>
                    <p>
                        It seems that you entered an invalid web page. Please
                        use the back arrow to go back to a valid web page
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound
