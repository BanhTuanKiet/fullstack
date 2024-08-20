import React from 'react'
import { Alert, AlertHeading } from 'react-bootstrap'

function NotService() {
  return (
    <div>
        <Alert variant='danger' className='mt-3'>
            <AlertHeading>404 Page Not Service</AlertHeading>
            <p>You don't have permission access this page. You need login to use.</p>
        </Alert>
    </div>
  )
}

export default NotService