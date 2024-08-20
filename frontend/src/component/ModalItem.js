import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Modal } from 'react-bootstrap'
import { UserContext } from '../Context/UseContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function ModalItem({ show, setShow, selectedItem, favoritedItems }) {
    const { id, name, star, price, company, color, category, quantity, img } = selectedItem
    let shoe_name = favoritedItems.map((item) => {
        return item.shoe_name
    })
    const handleClose = () => setShow(false)

    // const handleAddToCart = () => {
    //     if (user.email === '') {
    //         toast.warning("You must log in to continue.")
    //     } else {
    //         axios.get(`http://localhost:3000/${user.email}/${selectedItem}`)
    //         .then(res => {
    //             if (res.data.success) {
    //                 axios.delete(`http://localhost:3000/${user.email}/${selectedItem}`)
    //                 .then(result => {
    //                     console.log(result.data.message)
    //                 })
    //             } else {
    //                 axios.post('http://localhost:3000', { email: user.email, shoe: selectedItem })
    //                 .then(result => {
    //                     console.log(result.data.message)
    //                 })
    //             }
    //         })
    //     }
    // }

    // const handleBuy = () => {
    //     if (user.email === '') {
    //         toast.warning("You must log in to continue!")
    //     }
    // }

    return (
        <>
          <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body
                className='p-0'
            >
                <Card className="m-0 border-0 d-flex flex-row" key={id}>
                    <div className='d-flex justify-content-center flex-shrink-0 w-50 m-auto'>
                        <CardImg
                            className='w-75'
                            src={img}
                            alt={name}
                            style={name === 'Flat Slip On Pumps' ? { marginTop: '36px' } : {}}
                        />
                    </div>
                    <CardBody className="p-2 w-50">
                        <CardTitle className="card-title">{name}</CardTitle>
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
            </Modal.Body>
            <Modal.Footer>
                {shoe_name.includes(name) ? <Button>Added to cart</Button>: <Button variant='white' className='btn-outline-primary'>Add to cart</Button>}
                <Button variant='white' className="btn-outline-primary">Buy Now</Button>
            </Modal.Footer>
          </Modal>
        </>
    )
}

export default ModalItem