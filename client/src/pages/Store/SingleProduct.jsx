import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/productServices';
import { useStateContext } from '../../context/stateContext';
import NotFound from '../../components/NotFound/NotFound';
import SimilarProducts from './SimilarProducts';
import { FaArrowCircleLeft } from "react-icons/fa";


const initialState = { product: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCTS_LOADED":

      return { ...state, product: action.payload };

    default:
      return state;
  }
}

const SingleProduct = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const { product } = state;  
  const {slug, id} = useParams()
  const urlSlug = useParams()
  const { addToCart } = useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    const loadedProducts = 
    id !== undefined
    ? getById(id)
    : slug !== undefined
    ? singleProduct(urlSlug)
    : "";

    loadedProducts.then((product) => {
      dispatch({ type: "PRODUCTS_LOADED", payload: product })
    })
  }, [ id, slug ])

   const singleProduct = async urlSlug => {
    const singleBaseUrl = "/api/products"
    try {
      let url = singleBaseUrl;
      if (urlSlug) {
        url += `/slug/${urlSlug.slug}`
      }
      const { data } = await axios.get(url)
      return data;
    } catch(error) {
        console.log(`Backened data error ${error}`)
    }
   }    

    const handleAddToCart = () => {
      addToCart(product)
      navigate("/cart")
    }



  return (
    <>
      <div className='back-button'><Link to={`/store`}><FaArrowCircleLeft className='icon' /><p>Back to Store Page</p></Link></div>

      <div className="singleProduct">
        {!product ? (<NotFound message="Product not Found!" linkText="Back to HomePage" />) :  
          ( 
            <section className="singleProduct_details">
              <figure>
                <img src={product.imageUrl} alt={product.name} width="900" height="400" />
              </figure>
              <div className='singleProduct_overview'>
                <h3 className="product_name">{product?.name}</h3>
                <p className='product_description'>
                  <span className="sub-title">Product Details :</span>
                  <span>{product?.description}</span>
                </p>
                <p className="product_stock">
                  <span className='sub-title'>Available : </span> 
                  <span className={`${product?.stock > 0 ? "inStock" : "outOfStock"}`}></span>
                </p>
                <p className='product_price'>
                  <span>${product?.price}</span>
                  <span>Inclusive of all taxes</span>
                </p>
                <p className="product_categories">
                  <span className='sub-title'>Categories</span> 
                  <span>{product?.category}</span>
                </p>
                <div className='product_button'>
                  <button className="button glow-effect" type="button" onClick={ handleAddToCart }> 
                    Add to cart 🛒
                    <svg className='glow-container'>
                      <rect pathLength="100" strokeLinecap="round" className='glow-blur'></rect>
                      <rect pathLength="100" strokeLinecap="round" className='glow-line'></rect>
                    </svg>
                  </button>
                </div>
              </div>
            </section> 
          )
        }
      </div>

      <div className="other_products">
        <h3>Latest Products</h3>
        <SimilarProducts start={9} end={12} />
      </div>
      
    </>
  )
}

export default SingleProduct