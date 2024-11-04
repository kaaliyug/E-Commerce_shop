import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";



const SimilarProducts = ({start, end}) => {

    const [products, setProducts] = useState([]) 
    const [selectedCategory, setSelectedCategory] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const baseUrl = "http://localhost:5000/api/products";

    useEffect(() => {
        const fetchData = async() => {
          try {
               let url = baseUrl;
               if(selectedCategory) {
               url += `?category=${selectedCategory}`
              }
              const response = await fetch(url,
                {
                    method:"GET",
                })
              if(!response.ok) {
                throw new Error("Failed to get data")                    
              }
            const jsonData = await response.json();
            setProducts(jsonData);
            setIsLoading(false);
          } catch(error) {
            console.log(error);
            setError(`Error fetching data. Please try again later. ${error}`)
            setIsLoading(false)
          }
        }
        fetchData()
      },[selectedCategory])
    

  return (
    <>
      <div className="similar_products">
        { isLoading ? 
        (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {
              products.slice(start, end).map((item) => (
                <li key={item.id}>
                  <Link to={`/product/slug/${item.slug}`} className="product_link">
                    <figure>
                      <img src={item.imageUrl} alt={item.name} />
                    </figure>
                    <div className='content'>
                      <div className='cart_options'>
                        <NavLink className="action-plus-2" title="Add To Cart" href="#">
                          <HiMagnifyingGlassPlus />
                        </NavLink>
                        <NavLink className="action-plus-2" title="Add To Cart" href="#">
                          <TiShoppingCart />
                        </NavLink>
                        <NavLink className="action-plus-2" title="Add To Cart" href="#">
                          <FaHeart />
                        </NavLink>
                      </div>
                      <div className="description">
                        <p className="card_product_price"> Price: $ {item.price}</p>
                        <p className="card_product_name">{item.name}</p>
                      </div>
                    </div>
                  </Link>
                </li>
            ))}
          </ul>
        )}
      </div>  
    </>
  )
}

export default SimilarProducts