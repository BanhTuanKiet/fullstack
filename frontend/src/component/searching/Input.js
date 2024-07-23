import React, { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'

function Input({ data, setData }) {
    const [text, setText] = useState('')

    const debouncedFilter = useCallback(
        debounce((value) => {
            setData(data.filter(item => (
                item.title.indexOf(value) > -1
            )))
        }, 2000),
        [data, setData]
    )

    const handleInput = (event) => {
        const filter = event.target.value
        setText(filter)
        debouncedFilter(filter)
    }

    return (
        <div className='w-100'>
            <input 
                className="form-control me-2 mb-lg-0" 
                type="search" 
                placeholder="Type something" 
                aria-label="Search"
                value={text}
                onChange={handleInput}
            />
        </div>
    )
}

export default Input
