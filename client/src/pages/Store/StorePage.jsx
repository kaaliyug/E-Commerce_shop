import React, { useEffect, useReducer, useState } from 'react'
import {  getAll, getAllByTag, getAllTags, search } from '../../services/productServices';
import { useParams } from 'react-router-dom';
import Categories from './Categories';
import Products from './Products';
import NotFound from '../../components/NotFound/NotFound';
import useProductCustom from '../../context/useProductCustom';


const initialState = { products: [], referProducts:[] ,tags: [], filter:{min: 0, prices: 0, max: 0 } };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":

      let priceArr = action.payload.map((currElement) => currElement.price)
      let maxPrice = Math.max(...priceArr)

      return { ...state, products: action.payload, referProducts: [...action.payload], filter:{ ...state.filter, max: maxPrice, prices: maxPrice } };
    
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };

    case "UPDATE_FILTER_VALUES":

      const { name, value } = action.payload;
      return { ...state, filter: {...state.filter, [name]: value } }

    case "UPDATE_SEARCH_VALUES" :  

      const { searchValue, searchName } = action.payload;
      return {...state, filter: {...state.filter,  [searchName]: searchValue } }
    
    case "FILTER_PRODUCTS":

      var { referProducts } = state;
      var tempFilterProduct = [...referProducts];
      const { prices } = state.filter;      

      if(prices === 0) {
        tempFilterProduct = tempFilterProduct.filter((currElement) => 
        currElement.price === prices
      )}else{
        tempFilterProduct = tempFilterProduct.filter((currElement) => 
          currElement.price <= prices
      )}

      return { ...state, products: tempFilterProduct }
    
    default:
      return state;
  }
}

const Store = () => {

  const [selectedCategory, setSelectedCategory] = useState("")   
  const [term, setTerm] = useState("")
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, tags } = state;
  const { prices, min, max } = state.filter;
  const { searchTerm, tag } = useParams()
  const { getAllByCategory } = useProductCustom(selectedCategory)


  const updates = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    return dispatch({type:"UPDATE_FILTER_VALUES", payload: {name, value}});  
  }

  useEffect( () => {
    getAllTags().then(tags => dispatch({ type: "TAGS_LOADED", payload: tags }))
    
    const loadedProducts = tag 
    ? getAllByTag(tag) 
    : searchTerm 
    ? search(searchTerm)
    : selectedCategory
    ? getAllByCategory(selectedCategory)
    : getAll();

    loadedProducts.then( (products) => {
      dispatch({ type: "FOODS_LOADED", payload: products })
     }
    );
  }, [ searchTerm, tag, selectedCategory ])

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" })
  },[state.filter])  
  

  return (
    <>
      <section className="store">
        <div className="store_wrapper">

          <div className='sidebar'>
            <Categories tags={tags} foods={products} prices={prices} min={min} max={max} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>

          {products.length === 0 && <NotFound linkText="Reset Search" linkRoute="/store" />}

          <div className='products'>
            <Products foods={products}  />
          </div>
        </div>
      </section>
    </>
  )
}

export default Store