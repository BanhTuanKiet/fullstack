import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Products from '../Products/Products'
import ModalItem from '../component/ModalItem'
import AxiosNotAuth from '../CustomineAxios/AxiosNotAuth'
import AxiosAuth from '../CustomineAxios/Axios'
import { UserContext } from '../Context/UseContext'
import { Warning } from '../Utils/Notification'

function Home() {
  const [block, setBlock] = useState(true)
  const [newData, setNewData] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [idItem, setIDItem] = useState()
  const [selectedItem, setSelectedItem] = useState({})
  const [favoritedItems, setFavoritedItems] = useState([])
  const { user } = useContext(UserContext)
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        //getItem
          console.log("get item")
          const res = await AxiosNotAuth.get(`/${idItem}`)
          setSelectedItem(res.data[0])
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    if (idItem) {
      fetchData()
    }
  }, [idItem])

  useEffect(() => {
    const fetchData = async () => {
      try {
        //getListItems
        console.log("get list items")
        const response = await AxiosNotAuth.get()
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
        if (user.email !== '') {
          console.log("get favorite items")
          const res = await AxiosAuth.get(`/favorite`)
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
          setBlock(false)
          console.log("get items")
          await AxiosNotAuth.get(`items/${search}`)
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
          if (!block) {
            await AxiosNotAuth.get()
            .then(res => {
              if (res.success) {
                setNewData(res.data)
              }
            })
            .catch(err => {
              console.log(err)
            })
          }
        }
    }, 300)
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