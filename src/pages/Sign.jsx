import React, { useRef, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom';

const Sign = () => {
  const [error, seterror] = useState("");
  let Navigate = useNavigate()

  let nameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let addressRef = useRef();

  let handleSign = (e) => {
    e.preventDefault()
    console.log("running")
    let arr = JSON.parse(localStorage.getItem('sign')) || []
    let obj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      address: addressRef.current.value
    }
    if (!obj.email || !obj.password || !obj.name || !obj.address) {
      seterror("please fill all the fields")
      return
    }
    console.log(obj)
    let checkUser = () => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].email === obj.email) {
          seterror("user already exists! please login")
          return
        }
      }
      arr.push(obj);
      localStorage.setItem("sign", JSON.stringify(arr))
      Navigate('/Login')
    }
    checkUser();
    setTimeout(() => {
      seterror("")
    }, 3000)
  }
  return (
    <div>
      <p className='text-danger text-center'>{error}</p>
      <form className='w-50 m-auto py-4'>
        <div className="mb-3">
          <h1 style={{ textAlign: "center" }}>Sign up </h1>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
            <input type="Name" className="form-control" id="exampleInputName1" placeholder='Name' ref={nameRef} />
          </div>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            placeholder='Email' ref={emailRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
            placeholder='Password' ref={passwordRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
          <input type="Addres" className="form-control" id="exampleInputAddress1"
            placeholder='Address' ref={addressRef} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-danger" onClick={handleSign}>Submit</button>
        <p>
          Already a user <Link to={"/Login"}>login</Link>
        </p>
      </form>

    </div>
  )
}

export default Sign
