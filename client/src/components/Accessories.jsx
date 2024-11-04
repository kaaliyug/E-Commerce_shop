import React from 'react'
import SimilarProducts from '../pages/Store/SimilarProducts';

export default function Accessories() {
  return (
    <>
      <div className="wrapper">
        <h2>ACCESSORIES</h2>
        <p><span className='bold'>OSWAN</span> the most latgest bike store in the wold can serve you latest qulity of motorcycle also you can sell here your motorcycle</p>
        <div className='accessories_items'>
          <SimilarProducts start={4} end={7} />
        </div>
      </div>  
    </>
  )
}
