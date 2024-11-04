import React, { useState } from 'react'
import {ChevronLeft, Circle, CircleDot} from "lucide-react"
import {ChevronRight} from "lucide-react"

export const ImageSlider = ({ images }) => {
    const [imageIndex, setImageIndex]=useState(0)

    function shouldNextImage(){
        setImageIndex(index=>{
            if(index === images.length - 1)
            return 0
            return index + 1
        })
    }
    
    function shouldPrevImage(){
        setImageIndex(index=>{
            if(index === 0)
            return images.length - 1
            return index - 1
        })
    }

  return (
    <>
      <section aria-label="Image Carousel" style={{width:"100%", height:"100%", position:"relative"}}>
        <div style={{width:"100%", height:"100%", overflow:"hidden", display:"flex"}}>
          {images.map(({ url, alt}, index) => (
            <img key={url} src={url} alt={alt} aria-hidden={imageIndex !== index} className="img-slider-img" style={{translate:`${-100 * imageIndex}%`}} />
            ))
          }                
        </div>
        <button onClick={shouldPrevImage} className="img-slider-btn" style={{left:0}} aria-label="View Previous Image">
          <ChevronLeft aria-hidden />
        </button>
        <button onClick={shouldNextImage} className='img-slider-btn' style={{right:0}} aria-label="View Next Image">
          <ChevronRight aria-hidden />
        </button>
        <div style={{position:"absolute", bottom:".5rem", left:"50%", translate:"-50%", display:"flex", gap:".25rem"}}>
          {images.map((_, index) => (
            <button key={index} className="img-slider-dot-btn" onClick={()=>setImageIndex(index)} aria-label={`View Image ${index + 1}`}>
              {index === imageIndex ? <CircleDot aria-hidden /> : <Circle />}
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
    