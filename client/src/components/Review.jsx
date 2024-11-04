import React, { useEffect, useRef, useState } from 'react'
import { reviewSlider  } from '../constants/constant'


const Review = () => {

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
      targetSlide.classList.add("appear");      
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

        setImageIndex( index => {
          if(index === reviewSlider.length - 1) {
            return 0;
          } else {
            return index + 1;
          }
        })      
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

        setImageIndex(index => {
          if(index === 0)
          return reviewSlider.length - 1;
          return index - 1;
        })
    }

  return (
    <>
      <div className="wrapper">
        <div className="slider" style={{maxWidth:"1200px", width:"100%", margin:"0 auto", aspectRatio:"10/6"}}>
          <div style={{width:"100%", height:"100%", position:"relative"}} className='review_slider'>
            <h3>our clients review</h3>
            <ul style={{width:"100%", height:"100%", overflow:"hidden", display:"flex"}} className="image_slider" ref={pointer}>
              {reviewSlider.map(( review, alt ,index) => (
                <li style={{translate:`${-100 * imageIndex}%`}} className="img-slider-img img_slider_wrapper" key={review.id}>
                  <figure>
                    <img src={review.img} alt={alt} aria-hidden={imageIndex !== index}  />
                  </figure>
                  <div className="description">
                    <p><span className='bold'>{review.bold}</span>{review.content}</p>
                    <h5>{review.name}</h5>
                    <span className='subtitle'>{review.subTitle}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className='slider_btns'>
              <button onClick={shouldPrevImage} className="img-slider-btn" aria-label="View Previous Image">
                PRE
              </button>
              <button onClick={shouldNextImage} className='img-slider-btn' aria-label="View Next Image">
                NEXT
              </button>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default Review