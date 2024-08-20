import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Card from '../component/Card'

function Products({ Data, setShow, setSelectedItem }) {
    return (
        <Container>
            <Row>
                {Data.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            item={item}
                            setShow={setShow}
                            setSelectedItem={setSelectedItem}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Products
