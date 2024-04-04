import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const CartPage = (props) => {
  const [updated, setupdated] = useState(false);
  // const [uploade, setuploade] = useState(true);
  let arr = JSON.parse(localStorage.getItem("cartItems")) || []
  // console.log(arr)
  let navigate = useNavigate()
  let sum = 0;
  arr.forEach((element) => {
    sum = sum + element.price
  });
  console.log(sum)

  const handleIncrement = (ans) => {
    console.log(ans)
    let obj = {
      ...ans,
      quantity: ans.quantity + 1,
      price: ans.price + (ans.price / ans.quantity)
    }
    let Index = arr.findIndex((ele) => ele.id === ans.id)
    arr[Index] = obj
    localStorage.setItem('cartItems', JSON.stringify(arr))
    setupdated(!updated)
  }
  const handleDicrement = (ans) => {
    console.log(ans)
    let obj = {
      ...ans,
      quantity: ans.quantity > 1 ? ans.quantity - 1 : ans.quantity,
      price: ans.quantity > 1 ? ans.price - (ans.price / ans.quantity) : ans.price
    }
    let Index = arr.findIndex((ele) => ele.id === ans.id)
    arr[Index] = obj
    localStorage.setItem('cartItems', JSON.stringify(arr))
    setupdated(!updated)
  }
  const handledelete = (ans) => {
    console.log(ans)
    let ansArr = arr.filter((ele) => ele.id !== ans.id)
    // console.log(arr)
    // console.log(ansArr)
    localStorage.setItem('cartItems', JSON.stringify(ansArr))
    setupdated(!updated)
    props.setuploade(!props.uploade)
  }

  return (
    <div className='container m-5 '>
      {arr.map((obj) => {
        return <div style={{ justifyContent: 'space-between', gridTemplateRows: 'auto' }}
          className='d-flex align-items-center gap-4 mb-3'>
          <img style={{ height: '80px', width: "80px" }} src={obj.thumbnail} />
          <h5 className='w-25'>{obj.price}</h5>
          <h5 className='w-25'>{obj.title}</h5>
          <div className='d-flex align-items-center gap-3'>
            <button className='btn btn-warning' onClick={() => { handleIncrement(obj) }}>+</button>
            <p style={{ marginTop: '10px' }}>{obj.quantity}</p>
            <button className='btn btn-warning' onClick={() => { handleDicrement(obj) }}>-</button>
          </div>
          <button style={{ height: '38px' }} type="button" class="btn btn-danger"
            onClick={() => { handledelete(obj) }}>Delete</button>
        </div>
      })}
      {/* yha samjhna h */}
      {!arr.length && <h3 className='text-center bg-dark text-white'>You don't have any items in the Cart</h3>}
      {arr.length > 0 && <>
        <h3 className='text-center'>Total={sum}</h3>
        <div className='cantainer d-flex justify-content-center'>
          <button onClick={() => { navigate('/Confirmbooking') }} className='btn btn-success text-center w-20'>Continue</button>
        </div>
      </>}
    </div>
  )
}

export default CartPage
