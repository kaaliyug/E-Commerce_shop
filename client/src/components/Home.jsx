import React, { useEffect, useState } from 'react'
import Intro from './Intro';
import Review from './Review';
import { Testimonal } from './Testimonal';
import Accessories from './Accessories';
import Hero from './Hero';



const Home = () => {
  return (
    <>
      <section className='hero-banner'>
        <Hero />
      </section>
      <section className='intro'>
        <Intro />
      </section>
      <section className="accessories">
        <Accessories />
      </section>
      <section className='testimonals'>
        <Testimonal />
      </section>
      <section className="review">
        <Review />
      </section>
    </>
  )
}

export default Home