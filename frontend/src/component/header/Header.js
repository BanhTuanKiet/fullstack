import React from 'react'

function Header() {
  return (
    <div>
        <input
            className=''
            placeholder='Type something...'
        ></input>
        <br />
        
        <button
            className='btn btn-info me-1'
            name='all'
        >
            All
        </button>
        <button
            className='btn btn-info me-1'
            name='nike'
        >
            Nike
        </button>
        <button
            className='btn btn-info me-1'        
            name='adidas'
        >
            Adidas
        </button>
        <button
            className='btn btn-info me-1'        
            name='puma'
        >
            Puma
        </button>
        <button
            className='btn btn-info'        
            name='vans'
        >
            Vans
        </button>
    </div>
  )
}

export default Header