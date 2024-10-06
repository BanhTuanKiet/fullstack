import React, { useContext, useEffect, useState } from 'react'
import { Container, ListGroup} from 'react-bootstrap'
import SwipeToDelete from 'react-swipe-to-delete-ios'
import './FavoritedItems.css'
import CartItem from '../component/CartItem'
import CustomineAxios from '../CustomineAxios/Axios'
import { UserContext } from '../Context/UseContext'

function FavoritedItems({ favoritedItems }) {
    const { user } = useContext(UserContext)
    const [items, setItems] = useState([])
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))

    useEffect(() => {
        setItems(favoritedItems)
    }, [favoritedItems])



    const handleDelete = async (name) => {
        console.log(name)
        await CustomineAxios.delete(`/auth/favorite?email=${user.email}&shoe=${name}`, {
            headers: {
                'Authorization': `${accessToken}`,
            }
        })
        .then(res => {
            console.log(res)
        })
        setItems(items.filter(item => item.name !== name))
    }

    return (
        <Container style={{ marginTop: "48px"}}>
            <ListGroup>
                {items.map((item) => (
                    // <ListGroup.Item className='m-6 p-0' style={{ height: ' 130px'}}>
                    <div className='my-2'>
                        <SwipeToDelete
                            className='rounded'
                            key={item.id}
                            onDelete={() => handleDelete(item.name)}
                            height={125.5}
                            transitionDuration={300}
                            deleteWidth={75}
                            deleteThreshold={75}
                            showDeleteAction={true}
                            deleteColor="rgba(252, 58, 48, 1.00)"
                            deleteText="Delete"
                            disabled={false} 
                            rtl={false}
                            onDeleteConfirm={(onSuccess, onCancel) => {
                                if (window.confirm("Do you really want to delete this item ?")) {
                                    onSuccess()
                                } else {
                                    onCancel()
                                }
                            }}
                        >
                            <CartItem 
                                item={item}
                            />
                        </SwipeToDelete>
                    </div>
                    // </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}

export default FavoritedItems