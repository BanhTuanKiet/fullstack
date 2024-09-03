import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Products from '../Products/Products'
import ModalItem from '../component/ModalItem'
import CustomineAxios from '../CustomineAxios/Axios'
import { UserContext } from '../Context/UseContext'
import { toast } from 'react-toastify'

function Home() {
  const [newData, setNewData] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [favoritedItems, setFavoritedItems] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //getListItems
        const response = await CustomineAxios.get()
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
    const fetchData = async () => {
      if (selectedBrand === '') {
        await CustomineAxios.get()
        .then(res => {
          if (res.success) {
            setNewData(res.data)
          }
        })
      }
      // getDataByCompany
      else {
        await CustomineAxios.get(`company/${selectedBrand}`)
        .then(res => {
          if (res.success) {
            setNewData(res.data)
          }
        })
      }
    }
    fetchData()
  }, [selectedBrand])

  useEffect(() => {
    //getItems
    const timeout = setTimeout(async () => {
        if (search !== '') {
          await CustomineAxios.get(`items/${search}`)
          .then(res => {
            if (res.success) {
              setNewData(res.data)
            } else {
              toast.warning(res.message)
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

    return () => clearTimeout(timeout)
  }, [search])

  return (
    <div>
        <Navigation setSelectedBrand={setSelectedBrand} setSearch={setSearch}/>
        <Products Data={newData} setShow={setShow} setSelectedItem={setSelectedItem}/>
        <ModalItem show={show} setShow={setShow} selectedItem={selectedItem} favoritedItems={favoritedItems} setFavoritedItems={setFavoritedItems}/>
    </div>
  )
}

export default Home