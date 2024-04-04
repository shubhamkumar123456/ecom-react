import React from 'react'
import { useNavigate } from 'react-router-dom'

const Confirmbooking = () => {
  let navigate = useNavigate()
  return (
    <div>
      <h1 className='text=center'> Order is confirm. thanks for ordering
      </h1>
      <button className='btn  btn-danger justify-content-center' onClick={() => {
        navigate
          ('/')
      }}>Home page</button>
    </div>
  )
}

export default Confirmbooking