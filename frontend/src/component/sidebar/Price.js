import React from 'react'

function Price() {
  return (
        <div>
            <h5>Price</h5>
            <label>
                <input
                type='radio'
                name='price'
                />
                All
            </label>
            <br/>
            <label>
                <input
                type='radio'
                name='price'
                />
                ~50$
            </label>
            <br/>
            <label>
                <input
                type='radio'
                name='price'
                />
                ~100$
            </label>
            <br/>
            <label>
                <input
                type='radio'
                name='price'
                />
                ~150$
            </label>
            <br/>
            <label>
                <input
                type='radio'
                name='price'
                />
                ~200$
            </label>
        </div>
  )
}

export default Price