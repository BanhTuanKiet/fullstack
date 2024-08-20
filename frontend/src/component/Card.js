import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './Card.css'

function CustomCard({ item, setShow, setSelectedItem }) {
    const { id, name, star, price, company, color, category, quantity, img } = item

    const handleShowItem = () => {
        setSelectedItem(item)
        setShow(true)
    }

    return (
        <Card className="custom-card">
            <div className='card-img d-flex justify-content-center'>
                <Card.Img
                    variant="top"
                    src={img}
                    alt={name}
                    style={name === 'Flat Slip On Pumps' ? { marginTop: '36px' } : {}}
                />
            </div>
            <Card.Body className="p-2">
                <Card.Title>{name}</Card.Title>
                <Card.Text className="text-muted my-1">{price}</Card.Text>
                <div className="d-flex justify-content-between ms-0">
                    <div className='d-flex flex-column'>
                        <div>
                            <span>
                                {'⭐'.repeat(star)}{'☆'.repeat(5 - star)}
                            </span>
                        </div>
                        <div className='review-count'>
                            <span className="text-muted">100 reviews</span>
                        </div>
                    </div>
                    <div className='container-btn'>
                        <Button variant="outline-primary" className="btn-buy" onClick={handleShowItem}>Details</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CustomCard
