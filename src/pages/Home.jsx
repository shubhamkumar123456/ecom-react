import React, { useContext, useEffect, useState } from 'react'
import SearchContext from '../context/SearchContext';


const Home = (props) => {
const ctx = useContext(SearchContext)
console.log(ctx.searchValue)
  const [Items, setItems] = useState([]);
  const [clickedCategory, setclickedCategory] = useState(false);
  const [CategoryItems, setCategoryItems] = useState([]);
  const [category, setcategory] = useState(["All","smartphones","laptops","fragrances","skincare","groceries","home-decoration","furniture","tops","womens-dresses","womens-shoes","mens-shirts","mens-shoes","mens-watches","womens-watches","womens-bags","womens-jewellery","sunglasses","automotive","motorcycle","lighting"]);

  let fetchdata = async () => {
    // res ke jagha koi bhi name de sakte h ham
    // ye hmari get request bheji h
    let res = await fetch('https://dummyjson.com/products?skip=0&limit=99');
    let data = await res.json();
    setItems(data.products)
    setCategoryItems(data.products)
    // console.log(data.products)
  }

 
let filterProducts = Items.filter((ele)=>ele.title.toLowerCase().includes(ctx.searchValue))


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

  const handleCategoryClick=(ans)=>{
    console.log(ans)
    if(ans==='All'){
      setItems(CategoryItems)
    }
    else{

      filterProducts = CategoryItems.filter((ele)=>ele.category.toLowerCase()===ans)
      // console.log(filterProducts)
      setItems(filterProducts)
    }
    // console.log(clickedCategory)
  }
  return (
   <div className="row d-flex gap-4 ">
    <div className='col-2 mt-3  p-2 category'>
    <ul className="list-group " >
      <h3 className='text-center'>Categories</h3>

{category.map((ele)=>{
  return  <li onClick={()=>{handleCategoryClick(ele)}}  className="list-group-item text-center Li">{ele}</li>
})}
 
</ul>
    </div>

    <div className='col-md-9 '>
    <div className='row row-cols-md-3 row-cols-sm-2 ' style={{ justifyContent: 'center' }}>
      
      {filterProducts.map((obj) => {
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
    </div>
   </div>
  )
}

export default Home
