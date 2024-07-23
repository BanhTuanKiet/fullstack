import React from 'react'
import { Alert } from 'react-bootstrap'

export default function NotFound() {
  return (
    <div>
        <Alert variant='warning' className='mt-3'>
          <Alert.Heading>404 Page Not Found</Alert.Heading>
          <p>The page you are looking for does not exist.</p>
        </Alert>
    </div>
  )
}
