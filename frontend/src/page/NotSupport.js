import React, { useEffect, useState } from 'react'
import { Alert, AlertHeading } from 'react-bootstrap'

function NotSupport({ widthScreen, setWidthScreen }) {
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
    }, [widthScreen])

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