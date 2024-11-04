import React, { useState } from 'react'
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import Price from '../../components/Price';



const Products = ({ foods }) => {

  const [pageNumber, setPageNumber]=useState(0)
  const productPerPage = 9
  const pagesVisited = pageNumber * productPerPage  


  return (
    <>
      <div className="godown">
        <ul>
           {foods.slice(pagesVisited, pagesVisited + productPerPage).map((item) => (
            <li key={item.id}>
              <Link to={`/product/${item.id}`} className="godown_link" style={{display:"grid"}}>
                 <figure>
                    <img src={item.imageUrl} alt={item.name} />
                 </figure>
                 <div className="description">
                  <p className="card_product_name">{item.name}</p>
                  <div className="card_product_price"><Price price={item.price} /></div>
                 </div>
              </Link>
            </li>
          ))}  
        </ul>
      </div>

      <div className='pagination'>
        <Pagination productPerPage={productPerPage} setPageNumber={setPageNumber} products={ foods } />
      </div>
    </>
  )
}


export default Products