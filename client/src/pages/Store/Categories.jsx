import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {Product_Filters} from '../../constants/constant';
import Search from '../../components/Search';
import Price from '../../components/Price';



const Categories = ({ tags, forProductPage, updates, min, max, prices, setSelectedCategory }) => {


  return (
    <>
      <div className='search_products'>
        <h4 className='title'>by search products</h4>
        <Search  />        
      </div>
      
      <div className='categories'>
        {Product_Filters.map((list, id) => (
          <div key={list.title}>
            <h4 className="title">by {list.title}</h4>
            <ul>
              {list.links.map((link, id) => (
                <li key={link.id} className="container">
                  <label onChange={(e) => setSelectedCategory(e.target.value)}>
                    {link.name}
                    <input type="radio" name="radio" value={link.values} />
                    <span className="checkmark"></span>
                  </label>
                </li>                        
              ))}
            </ul>
          </div>
          ))}
      </div>
      
      <div className="price_range">
        <h4 className='title'>by price</h4>
        <input type="range" name="prices" min = {min} max = {max} value = {prices} onChange = {(e) => updates(e)} />
        <div className="price"> $0 <span>&#45;</span><Price price={prices} /></div>
      </div>

      <div className='product_tags'>
        <h4 className="title">product tags</h4>
        <div style={{ justifyContent: forProductPage ? "center" : "start" }}>
          {tags.map(tag => 
            <Link key={tag.name} to={`/tag/${tag.name}`}>
              {tag.name}
              {/* if forfood page is null or undefined show tag.count */}
              {!forProductPage && `(${tag.count})`}
            </Link>
          )}
        </div>
      </div>          
          
    </>
  )
}

export default Categories