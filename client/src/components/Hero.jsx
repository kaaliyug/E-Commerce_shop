import React from 'react'
import home_1 from "../assets/home_1.jpg"
import home_2 from "../assets/home_2.jpg"
import home_3 from "../assets/home_3.jpg"
import home_4 from "../assets/home_4.jpg"
import home_5 from "../assets/home_5.jpg"
import { ImageSlider } from './ImageSlider'


const IMAGES = [
  {url: home_1, alt:"sale_one"},
  {url: home_2, alt:"sale_two"}, 
  {url: home_3, alt:"sale_three"}, 
  {url: home_4, alt:"sale_four"}, 
  {url: home_5, alt:"sale_five"}
]


const Hero = () => {
  return (
    <div>
      <div className="hero-banner_image">
        <div style={{ width:"100%", height:"500px", margin:"0 auto", aspectRatio:"10/6"}} className='banner-slider'>
          <ImageSlider images={IMAGES} />
        </div>
      </div>
    </div>
  )
}


export default Hero