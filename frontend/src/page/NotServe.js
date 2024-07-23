import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

function NotServe() {
    const [widthScreen, setWidthScreen] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 350) {
                setWidthScreen(false)
            } else {
                setWidthScreen(true)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

  return (
    <div>
        {!widthScreen && (
            <Alert variant='warning' className='mt-3'>
                <Alert.Heading>This website does not support screens smaller than 350px. Please use a larger screen.</Alert.Heading>
            </Alert>
        )}
    </div>
  )
}

export default NotServe