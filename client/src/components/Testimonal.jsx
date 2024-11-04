import React, { useEffect, useRef, useState } from 'react'
import testimonal_1 from "../assets/testimonal_1.webp"
import testimonal_2 from "../assets/testimonal_2.webp"

const Images = [
  { url: testimonal_1, alt:"bike_one" },
  { url: testimonal_2, alt:"bike_two" }
]

export const Testimonal = () => {

  const [imageIndex, setImageIndex] = useState(0)

  const pointer = useRef();

  useEffect(() => {
    const slides = Array.from(pointer.current.children)      
    const firstSlide = slides.at(0);
    firstSlide.classList.add("appear");
    return () => {
      firstSlide.classList.add("appear");
    }
  },[])

  const moveToSlide = (currentSlide, targetSlide) => {    
    currentSlide.classList.remove('appear');
    currentSlide.classList.remove("appearInactive");     
    currentSlide.classList.add('disappear');
    targetSlide.classList.add("appearInactive"); 
    targetSlide.classList.remove('disappearInactive');   
  } 
  

  function shouldNextImage() {
    const slides = [...pointer.current.children];
    const currentSlide = pointer.current.querySelector(".appear");
    const safelyMap = () => {
      if (currentSlide.nextElementSibling) {
        return currentSlide.nextElementSibling;
      } else {
        return slides.at(0);
      }
    }
    let target = safelyMap()
    moveToSlide(currentSlide, safelyMap())

    window.setTimeout(function() {
      currentSlide.classList.remove('disappear');
      currentSlide.classList.add('disappearInactive');
      target.classList.add("appear");
      setImageIndex( index => {
        if(index === Images.length - 1) {
          return 0;
        } else {
          return index + 1;
        }
      })      
    }, 4000);
  }
  
  function shouldPrevImage() {
    const slides = [...pointer.current.children];
    const currentSlide = pointer.current.querySelector(".appear");
    const safelyMap = () => {
      if (currentSlide.previousElementSibling) {
        return currentSlide.previousElementSibling;
      } else {
        return slides.at(slides.length-1);
      }
    }
    let target = safelyMap()
    moveToSlide(currentSlide, safelyMap());

    window.setTimeout(function() {
      currentSlide.classList.remove('disappear');
      currentSlide.classList.add('disappearInactive');
      target.classList.add("appear");
      setImageIndex(index => {
        if(index === 0)
        return Images.length - 1;
        return index - 1;
      })
    }, 4000);
  }

  return (
    <>
      <div className="wrapper">

        <div style={{maxWidth:"1200px", width:"100%", margin:"0 auto", aspectRatio:"10/6"}} className="testimonal_slider">
          <div style={{width:"100%", height:"100%", position:"relative"}} className='slider'>
            <ul style={{overflow:"hidden", display: "flex"}} className="image_slider" ref={pointer}>
              {Images.map(({ url, alt }, index) => (
                <li className="img-slider-img img_slider_wrapper" style={{translate:`${-100 * imageIndex}%`}} key={alt}>
                  <figure>
                    <img key={url} src={url} alt={alt} id='pops' aria-hidden={imageIndex !== index} />
                  </figure>
                  <div className="description">
                    <h2>LATEST OFFER <br/>FOR POPULAR BIKES</h2>
                    <p><span className='bold'>OSWAN</span> the most latgest bike store in the wold can serve you latest quality of motorcycle also you can sell here your motorcycle it quo minus iduod maxie placeat facere possimus, omnis voluptas assumenda est, omnis dolor llendus. Temporibus autem quibusdam </p>
                    <div className='price_discount'>
                      <p className="latest-price">NOW AT<span> $1250</span></p>
                      <span className="discount">35% DISCOUNT</span>
                    </div>
                    <button>SELECT A BIKE</button>
                  </div>
                </li>
              ))} 
            </ul>
            <div className='slider_btns'>
              <button onClick = {(e) => {
                e.preventDefault();
                shouldPrevImage()
              }} className="img-slider-btn" style={{ gridColumn:"1/2" }}
                aria-label="View Previous Image">
                PRE
              </button>
              <button onClick = {shouldNextImage} className='img-slider-btn' style={{ gridColumn:"2/3" }}
                aria-label="View Next Image">
                NEXT
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
