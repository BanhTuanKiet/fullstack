import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Products from '../Products/Products'
// import Data from '../Data/Data'
import FilterData from '../Service/FilterData'
import ModalItem from '../component/ModalItem'
import axios from 'axios'
import { UserContext } from '../Context/UseContext'

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
        const response = await axios.get('http://localhost:3000/')
        setNewData(response.data.data)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.email !== '') {
          const res = await axios.get(`http://localhost:3000/item/${user.email}`)
          console.log(res.data.data)
          setFavoritedItems(res.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   const filteredData = FilterData(Data, selectedBrand)
  //   setNewData(filteredData)
  // }, [selectedBrand])

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     const data = Data.filter(item => 
  //       item.title.toLowerCase().includes(search.toLocaleLowerCase())
  //     )
  //     setNewData(data)
  //   }, 1000)

  //   return () => clearTimeout(timeout)
  // }, [search])

  return (
    <div>
        <Navigation setSelectedBrand={setSelectedBrand} setSearch={setSearch}/>
        <Products Data={newData} setShow={setShow} setSelectedItem={setSelectedItem}/>
        <ModalItem show={show} setShow={setShow} selectedItem={selectedItem} favoritedItems={favoritedItems}/>
    </div>
  )
}

export default Home