import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Card from '../component/Card'

function FavoritedItems({ favoritedItems }) {
    return (
        <Container>
            <Row>
                {favoritedItems.map((item) => (
                    <Col key={item.id} xs={12}>
                        <Card
                            item={item}
                        />
                    </Col>
                ))}
            </Row>            
        </Container>
    )
}

export default FavoritedItems