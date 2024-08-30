import React, { useContext } from 'react'
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Modal } from 'react-bootstrap'
import { UserContext } from '../Context/UseContext'
import { toast } from 'react-toastify'
import CustomineAxios from '../CustomineAxios/Axios'

function ModalItem({ show, setShow, selectedItem, favoritedItems, setFavoritedItems }) {
    const { user } = useContext(UserContext)
    const { id, name, star, price, company, color, category, quantity, img } = selectedItem

    let shoe_name = []
    if (user.email !== '') {
        shoe_name = favoritedItems.map((item) => {
            return item.shoe_name
        })
    }

    const handleClose = () => setShow(false)
    const handleCart = () => {
        if (user.email === '' || user.email === undefined) {
            return toast.warning("You must log in to continue.")
        }
        // deleteFavoriteItem
        if (shoe_name.includes(name)) {
            CustomineAxios.delete(`favorite?email=${user.email}&shoe=${name}`)
            .then(res => {
                if (res.success) {
                    const updatedFavorites = favoritedItems.filter(item => item.shoe_name !== name)
                    setFavoritedItems(updatedFavorites)
                }
            })
        // postFavoriteItem
        } else {
            CustomineAxios.post(`favorite`, { email: user.email, shoe: name })
            .then(res => {
                if (res.success) {
                    setFavoritedItems(prevItems => [...prevItems, { shoe_name: name }])
                }
            })
        }
        
    }
    // purchaseItem
    const handleBuy = () => {
        if (user.email === '' || user.email === undefined) {
            return toast.warning("You must log in to continue!")
        }
        const token = JSON.parse(localStorage.getItem('accessToken'))
        CustomineAxios.put(`/items/purchase?shoe_name=${name}&cus_email=${user.email}`, {}, {
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(res => {
            if (res.success) {
                console.log(res.message)
                // return toast.success(res.message)
            }
            else console.log(res.success)
            // toast.warning(res.message)
        })
        .catch(err => {
            console.log(err)
        })
    }

    
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
                {shoe_name.includes(name) ? <Button onClick={handleCart}>Added to cart</Button>: <Button onClick={handleCart} variant='white' className='btn-outline-primary'>Add to cart</Button>}
                <Button variant='white' className="btn-outline-primary" onClick={handleBuy}>Buy Now</Button>
            </Modal.Footer>
          </Modal>
        </>
    )
}

export default ModalItem