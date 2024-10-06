import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UseContext'
import NotService from './NotServe'
import AxiosAuth from '../CustomineAxios/Axios'
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
              const res = await AxiosAuth.get(`favorite/${user.email}`)
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
            <div className='col-lg-5 col-md-6 col-12'>
                <FavoritedItems favoritedItems={favoritedItems} /> 
            </div>
        </div>
    )
}

export default Cart
