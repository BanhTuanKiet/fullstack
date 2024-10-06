import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'react-bootstrap'

function CartItem({ item }) {
    const { id, name, star, price, img} = item ?? {}

    return (
        <Card className="m-auto d-flex flex-row" key={id}>
            <div className='d-flex justify-content-center w-50 m-auto'>
                <CardImg
                    className='w-75'
                    src={img}
                    alt={name}
                    style={name === 'Flat Slip On Pumps' ? { marginTop: '36px' } : {}}
                />
            </div>
            <CardBody className="p-2 w-50">
                <CardTitle className="card-title" style={name === 'DREAM PAIRS Court Shoes' ? { fontSize: '19px' } : {}}>{name}</CardTitle>
                <CardText className="card-text text-muted my-1">{price}</CardText>
                <div className="review-section d-flex justify-content-between ms-0">
                    <div className='d-flex flex-column'>
                        <div>
                            <span className="review-stars">
                                {'⭐'.repeat(star)}{'☆'.repeat(5 - star)}
                            </span>
                        </div>
                        <div className='review-count'>
                            <span className="text-muted">(100 reviews)</span>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CartItem