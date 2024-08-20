import React from 'react'
import { Alert, AlertHeading } from 'react-bootstrap'

function NotFound() {
  return (
    <div>
        <Alert variant='warning' className='mt-3'>
            <AlertHeading>404 Page Not Found!</AlertHeading>
            <p>The page you are looking for does not exist.</p>
        </Alert>
    </div>
  )
}

export default NotFound