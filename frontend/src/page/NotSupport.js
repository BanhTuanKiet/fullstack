import React, { useEffect, useState } from 'react'
import { Alert, AlertHeading } from 'react-bootstrap'

function NotSupport({ widthScreen, setWidthScreen }) {
    const [width, setWidth] = useState()

    useEffect(() => {
        const handleResize = () => {
            const currentWidth = window.innerWidth
            setWidth(currentWidth)
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
    }, [width, widthScreen, setWidthScreen])

  return (
    <div>
        {!widthScreen && (
            <Alert variant='warning' className='mt-3'>
                <AlertHeading>404 Page Not Support</AlertHeading>
                <p>This website does not support screens smaller than 350px. Please use a larger screen.</p>
            </Alert>
        )}
    </div>
  )
}

export default NotSupport