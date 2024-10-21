import React, { useContext } from 'react'
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Modal } from 'react-bootstrap'
import { UserContext } from '../Context/UseContext'
import AxiosAuth from '../CustomineAxios/Axios'
import './MadalItem.css'
import { Success, Warning } from '../Utils/Notification'

function ModalItem({ show, setShow, selectedItem, setIDItem, favoritedItems, setFavoritedItems }) {
    const { user } = useContext(UserContext)
    const { id, name, star, price, company, color, category, quantity, img } = selectedItem ?? {}
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

    let shoe_id = []
    if (user.email !== '') {
        shoe_id = favoritedItems.map((item) => {
            return item.shoe_id
        })
    }

    const handleClose = () => setShow(false)

    const handleNext = () => {
        if (id !== undefined)
            id === 26 ? setIDItem(1) : setIDItem(id + 1)
    }

    const handleBack = () => {
        if (id !== undefined)
            id === 1 ? setIDItem(26) : setIDItem(id - 1)
    }
    
    const handleCart = async () => {
        if (user.email === '') {
            return Warning("You must log in to continue.")
        }
        // deleteFavoriteItem
        if (shoe_id.includes(id)) {
            await AxiosAuth.delete(`/favorite?shoe_id=${id}`, {
                headers: {
                    'Authorization': `${accessToken}`,
                }
            })
            .then(res => {
                if (res.success) {
                    const updatedFavorites = favoritedItems.filter(item => item.shoe_id !== id)
                    setFavoritedItems(updatedFavorites)
                }
            })
            .catch(err => {
                console.log(err)
            })
        // postFavoriteItem
        } else {
            await AxiosAuth.post(`/favorite?shoe_id=${id}`, { refreshToken }, {
                headers: {
                    'Authorization': `${accessToken}`
                }
            })
            .then(res => {
                if (res.success) {
                    setFavoritedItems(prevItems => [...prevItems, { shoe_id: id }])
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    // purchaseItem
    const handleBuy = async () => {
        if (user.email === '') {
            return Warning("You must log in to continue!")
        }
        console.log(name)
        
        await AxiosAuth.put(`/items/purchase?shoe_id=${id}`, { refreshToken }, {
            headers: {
                'Authorization': `${accessToken}`
            }
        })
        .then(res => {
            if (res.success) {
                Success(res.message)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='model-container d-flex justify-content-center align-items-center'>
          <Modal show={show} onHide={handleClose} backdrop="static" className='modal'>
            <Modal.Header closeButton>
              <Modal.Title >{name}</Modal.Title>
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
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <div className='d-flex justify-content-between' style={{ width: '46%' }}>
                    <i className="fa-solid fa-arrow-left" onClick={handleBack} />
                    <i className="fa-solid fa-arrow-right" onClick={handleNext} />
                </div>
                <div className='d-flex justify-content-between' style={{ width: '48%' }}>
                    {shoe_id.includes(id) ? <Button onClick={handleCart}>Added to cart</Button> : <Button onClick={handleCart} variant='white' className='btn-outline-primary'>Add to cart</Button>}
                    <Button variant='white' className="btn-outline-primary" onClick={handleBuy}>Buy Now</Button>
                </div>
            </Modal.Footer>
          </Modal>
        </div>
    )
}

export default ModalItem