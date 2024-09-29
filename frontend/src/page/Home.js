import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Products from '../Products/Products'
import ModalItem from '../component/ModalItem'
import CustomineAxios from '../CustomineAxios/Axios'
import AxiosNotAuthen from '../CustomineAxios/AxiosNotAuthen'
import { UserContext } from '../Context/UseContext'
import { Warning } from '../Utils/Notification'
import Cart from './Cart'
import FavoritedItems from '../Products/FavoritedItems'

function Home() {
  const [newData, setNewData] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [idItem, setIDItem] = useState({})
  const [selectedItem, setSelectedItem] = useState({})
  const [favoritedItems, setFavoritedItems] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //getItem
          console.log("get item")
          const res = await AxiosNotAuthen.get(`/${idItem}`)
          setSelectedItem(res.data[0])
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    if (idItem !== undefined) {
      fetchData()
    }
  }, [idItem])

  useEffect(() => {
    const fetchData = async () => {
      try {
        //getListItems
        console.log("get list items")
        const response = await AxiosNotAuthen.get()
        setNewData(response.data)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [])
  
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

  useEffect(() => {
    //search Items
    const fetchData = setTimeout(async () => {
        if (search !== '') {
          console.log("get items")
          await CustomineAxios.get(`items/${search}`)
          .then(res => {
            if (res.success) {
              setNewData(res.data)
            } else {
              Warning(res.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          await CustomineAxios.get()
          .then(res => {
            if (res.success) {
              setNewData(res.data)
            }
          })
          .catch(err => {
            console.log(err)
          })
        }
    }, 500)
    return () => clearTimeout(fetchData)
  }, [search])

  return (
    <div>
        <Navigation setSearch={setSearch} setNewData={setNewData}/>
        <Products Data={newData} setShow={setShow} setSelectedItem={setSelectedItem}/>
        <ModalItem show={show} setShow={setShow} selectedItem={selectedItem} setIDItem={setIDItem} favoritedItems={favoritedItems} setFavoritedItems={setFavoritedItems}/>
    </div>
  )
}

export default Home