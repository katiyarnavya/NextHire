import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='notfound'>
      <div className="content">
        <h1>404 Not Found</h1>
        <p>Page not found</p>
        <Link to = {'/'} className='btn'>Back to Home page</Link>
      </div>
      
    </section>
  )
}

export default NotFound
