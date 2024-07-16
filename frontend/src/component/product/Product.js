import React from 'react'
import Data from '/workspace/fullstack/frontend/src/database/data'
import Card from './Card'

function Product() {

  return (
    <div className='d-flex flex-wrap justify-content-around'>
        {Data.map((item) => (
            <Card 
                key={item.id}
                item={item}
            />
        ))}
    </div>
  )
}

export default Product