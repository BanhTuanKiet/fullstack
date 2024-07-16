import React from 'react'
import Category from './Category'
import Price from './Price'

function Sidebar() {
  return (
    <div className='sidebar-container'>
      <Category />
      <Price />
    </div>
  )
}

export default Sidebar