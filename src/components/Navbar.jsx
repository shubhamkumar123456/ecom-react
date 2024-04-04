import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  let Navigate = useNavigate();
  let arr = JSON.parse(localStorage.getItem('cartItems')) || []
  const handleLogOut = () => {
    console.log("running")
    localStorage.removeItem('userDtail')
    props.setLogins(false)
    Navigate('/Login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light  bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand  text-white" href="#">Shoping</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {props.login && <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page" to='/'>Home</Link>
              </li>}
              {/* { props.Logins && <li className="nav-item">
                <Link className="nav-link  text-white" to='/Signup'>Signup</Link>
              </li>} */}
              {/* { props.Logins && <li className="nav-item">
                <Link className="nav-link  text-white" to='/Login'>Login</Link>
              </li>} */}
              {props.Logins && <li onClick={handleLogOut} className="nav-item">
                <Link className="nav-link  text-white">Logout</Link>
              </li>}
              {props.Logins && <li className="nav-item">
                <Link className="nav-link  text-white" to='/CartPage'><FaCartPlus style={{ fontSize: '30px' }} />
                  {arr.length}</Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>


    </div>
  )
}

export default Navbar
