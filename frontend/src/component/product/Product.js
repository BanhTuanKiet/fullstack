import React from 'react'
import Card from './Card'

function Product({ data }) {

  return (
    <div className='d-flex flex-wrap justify-content-start'>
        {data.map((item) => (
            <Card 
                key={item.id}
                item={item}
            />
        ))}
    </div>
  )
}

export default Product