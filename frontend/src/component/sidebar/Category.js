import React from 'react'

function Category() {
  return (
      <div>
        <h5>Category</h5>
        <label>
          <input
            type='radio'
            name='category'
          />
          All
        </label>
        <br/>
        <label>
          <input
            type='radio'
            name='category'
          />
          Nike
        </label>
        <br/>
        <label>
          <input
            type='radio'
            name='category'
          />
          Adidas
        </label>
        <br/>
        <label>
          <input
            type='radio'
            name='category'
          />
          Puma
        </label>
        <br/>
        <label>
          <input
            type='radio'
            name='category'
          />
          Vans
        </label>
      </div>
  )
}

export default Category