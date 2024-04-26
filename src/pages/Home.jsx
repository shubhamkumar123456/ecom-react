import React, { useContext, useEffect, useState } from 'react'
import SearchContext from '../context/SearchContext';


const Home = (props) => {
  const [currentPage, setcurrentPage] = useState(1);
  let itemPerPage = 9;
  let lastIndex = itemPerPage * currentPage;
  let firstIndex = lastIndex - itemPerPage;

const ctx = useContext(SearchContext)
console.log(ctx.searchValue)
  const [Items, setItems] = useState([]);

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

let sliceItems = filterProducts.slice(firstIndex,lastIndex)
let buttons = Math.ceil(Items.length /itemPerPage)
let ButtonArray = [...Array(buttons+1).keys()].slice(1)
console.log(ButtonArray)

  useEffect(() => {
    fetchdata()
  }, [])

  console.log(Items)

  const handleAddtoCard = (ans) => {
    let arr = JSON.parse(localStorage.getItem('cartItems')) || []
    console.log(ans)
    let obj = { ...ans, quantity: 1 }
    function checkItem(){
      for(let i =0 ; i<arr.length ; i++){
        if(arr[i].id===obj.id){
          return
        }
      }
      arr.push(obj);
      console.log(arr)
    localStorage.setItem('cartItems', JSON.stringify(arr))
    props.setupdate(!props.update)
   }
   checkItem()
    
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

  const handlePrevious = ()=>{
    if(currentPage>0){
      setcurrentPage(currentPage-1)
    }
  }

  const handleNext = ()=>{
    if(currentPage<Items.length-1){
      setcurrentPage(currentPage+1)
    }
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
    <div className='row row-cols-md-3 row-cols-sm-2' style={{ justifyContent: 'center' }}>
      
      {sliceItems.map((obj) => {
        return <div className='card'   key={obj.id} style={{ width: '18rem', margin: '20px' }}>
          <img style={{ height: '200px' }} className='card-img-top mt-2' src={obj.thumbnail} alt="Card image cap" />
          <div className='card-body'>
            <h5 style={{ height: "58px" }} className='card-title'>{obj.title}</h5>

            <h6 className='card-text'><span style={{fontWeight:"bolder"}}>Price:</span> {obj.price}$</h6>

            <br />
            {/* <h6 className='card-text'>{obj.category}</h6> */}
            {/* <p className='card-text'>{obj.description}</p> */}
            {/* <p >{obj.discountPercentage}</p> */}
            <button className='btn btn-danger' onClick={() => { handleAddtoCard(obj) }}>Add to Cart</button>

          </div>
        </div>
      })}
    </div>
   <div className="row">
   <div className='d-flex justify-content-center align-items-center'>
    <nav aria-label="Page navigation example">
  <ul class="pagination flex-wrap">
    <li onClick={handlePrevious} class="page-item"><a class="page-link" href="#">Previous</a></li>
   {ButtonArray.map((ele)=>{
    return  <li onClick={()=>setcurrentPage(ele)} class={ele===currentPage?'page-item active':'page-item'}><a class="page-link" href="#">{ele}</a></li>
   })}
    <li onClick={handleNext} class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
    </div>
   </div>
   
    </div>
   </div>
  )
}

export default Home
