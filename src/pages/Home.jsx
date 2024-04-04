import React, { useEffect, useState } from 'react'


const Home = (props) => {

  const [Items, setItems] = useState([]);

  let fetchdata = async () => {
    // res ke jagha koi bhi name de sakte h ham
    // ye hmari get request bheji h
    let res = await fetch('https://dummyjson.com/products?skip=0&limit=99');
    let data = await res.json();
    setItems(data.products)
    // console.log(data.products)
  }


  useEffect(() => {
    fetchdata()
  }, [])

  console.log(Items)

  const handleAddtoCard = (ans) => {
    let arr = JSON.parse(localStorage.getItem('cartItems')) || []
    console.log(ans)
    let obj = { ...ans, quantity: 1 }
    arr.push(obj);
    localStorage.setItem('cartItems', JSON.stringify(arr))
    props.setupdate(!props.update)
  }
  return (
    <div className='row row-cols-md-3 row-cols-sm-2' style={{ justifyContent: 'center' }}>
      {Items.map((obj) => {
        return <div className='card' key={obj.id} style={{ width: '18rem', margin: '20px' }}>
          <img style={{ height: '200px' }} className='card-img-top mt-2' src={obj.thumbnail} alt="Card image cap" />
          <div className='card-body'>
            <h5 style={{ height: "58px" }} className='card-title'>{obj.title}</h5>

            <h6 className='card-text'>{obj.price}</h6>

            <br />
            {/* <h6 className='card-text'>{obj.category}</h6> */}
            {/* <p className='card-text'>{obj.description}</p> */}
            {/* <p >{obj.discountPercentage}</p> */}
            <button className='btn btn-danger' onClick={() => { handleAddtoCard(obj) }}>Add to Cart</button>

          </div>
        </div>
      })}
    </div>
  )
}

export default Home
