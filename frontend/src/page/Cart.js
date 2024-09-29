import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UseContext'
import NotService from './NotServe'
import CustomineAxios from '../CustomineAxios/Axios'
import { ListGroup } from 'react-bootstrap'
import FavoritedItems from '../Products/FavoritedItems'

function Cart() {
    const { user } = useContext(UserContext)
    const [favoritedItems, setFavoritedItems] = useState([])

    useEffect(() => {
        //getFavoriteItems
        const fetchData = async () => {
          try {
            if (user.email !== '' && user.email !== undefined) {
              console.log("get favorite items")
              const res = await CustomineAxios.get(`favorite/${user.email}`)
              if (res.success) {
                setFavoritedItems(res.data)        
              }
            }
          } catch (error) {
            console.error("Failed to fetch data:", error)
          }
        }
        fetchData()
      }, [user])

    if (user && !user.auth) {
        return <NotService />
    }

    return (
        <div className='d-flex justify-content-center'>
            <div className='col-lg-6 col-md-9 col-12'>
                {/* <ListGroup>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                </ListGroup> */}
                <FavoritedItems favoritedItems={favoritedItems} /> 
            </div>
        </div>
    )
}

export default Cart
