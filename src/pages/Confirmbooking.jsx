import React from 'react'
import { useNavigate } from 'react-router-dom'

const Confirmbooking = () => {
  let navigate = useNavigate()
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column",height:"60vh",gap:"10px"}}>
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