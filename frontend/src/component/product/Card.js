import React from 'react'

function Card({ item }) {
    const { img, title, reviews, newPrice } = item

    return (
        <div className='card-shoe'>
            <section className='card-img'>
            <img
                src={img}
                key={title}
                alt='shoe'
                loading='lazy'
                style={title === 'Flat Slip On Pumps' ? { marginTop: '36px' } : {}}
            />
            </section>
        <div className='card-describe'>
            <h3 className='card-title'>{title}</h3>
            <section className='card-reviews'>
                <span className='reviews'>{reviews}</span>
            </section>
            <section className='card-price'>
                <span>{newPrice}$</span>
                </section>
            </div>
        </div>
    )
}

export default Card