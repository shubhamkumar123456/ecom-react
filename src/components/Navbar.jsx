import React, { useContext } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import SearchContext from '../context/SearchContext';

const Navbar = (props) => {
  const ctx = useContext(SearchContext)
  let Navigate = useNavigate();
  let arr = JSON.parse(localStorage.getItem('cartItems')) || []
  const handleLogOut = () => {
    console.log("running")
    localStorage.removeItem('userDtail')
    props.setLogins(false)
    Navigate('/Login')
  }

  const handleInputChnage = (e) => {
    ctx.setsearchValue(e.target.value)
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light  bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand  text-white" to="/">Shoping</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex gap-2 m-auto" role="search">
  <input className="form-control m-auto" onChange={handleInputChnage} type="search" placeholder="Search Products..." aria-label="Search" />
  {/* <button className="btn btn-outline-warning" type="submit">Search</button> */}
</form>

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
                <Link className="nav-link  text-white"><span className='btn btn-primary'>Logout</span></Link>
              </li>}
              {props.Logins && <li className="nav-item">
                <Link className="nav-link  text-white" to='/CartPage'>Cart<MdOutlineShoppingCart style={{ fontSize: '30px' }} />
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
