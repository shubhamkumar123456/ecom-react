import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";



const Login = (props) => {
  const [error, seterror] = useState("");
  // let Navigate = useNavigate();
  let arr = [1, 2, 3, 4, 5]
  console.log(arr)

  let emailRef = useRef();
  let passwordRef = useRef();

  let handleLogin = (e) => {
    e.preventDefault();
    let arr = JSON.parse(localStorage.getItem('sign')) || []
    console.log("running");



    let obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    if (!obj.email || !obj.password) {
      seterror("please fill all the fields")
      return
    }
    console.log(obj);

    let checkUser = () => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].email === obj.email) {
          if (arr[i].password === obj.password) {
            // console.log('Welcome To Home Page')
            // Navigate('/')
            return true;
          }
        }
      }
      seterror('Wrong credentials')
      return false;
    }
    let details = checkUser()
    if (!details) {
      console.log("something went wrong")

    } else {

      localStorage.setItem('userDtail', JSON.stringify(obj.email))
      props.setLogins(true)
    }
    setTimeout(() => {
      seterror("")
    }, 3000)
  }
  return (
    <div>
      <p className="text-danger text-center">{error}</p>
      <form className='w-50 m-auto py-5'>
        <h1 style={{ textAlign: 'center' }}>Login Form</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            ref={emailRef} placeholder='Email' />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password'
            ref={passwordRef} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-danger" onClick={handleLogin}>Submit</button>
        <p>
          Dont have a account? <Link to={'/Signup'}>Signin</Link>
        </p>
      </form>

    </div>
  )
}

export default Login
