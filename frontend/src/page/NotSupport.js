import React from 'react'
import { Alert, AlertHeading } from 'react-bootstrap'

function NotSupport() {
    return (
        <div>
            <Alert variant='warning' className='mt-3'>
                <AlertHeading>404 Page Not Support</AlertHeading>
                <p>This website does not support screens smaller than 350px. Please use a larger screen.</p>
            </Alert>
        </div>
    )
}

export default NotSupport