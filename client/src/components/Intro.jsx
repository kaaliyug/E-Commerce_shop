import React from 'react'
import bike from "../assets/bike.webp"
import { PiPhoneCall } from 'react-icons/pi'


const Intro = () => {

  function rotateElement(event, element){
    element=event.target;
    const x=event.clientX;
    const y=event.clientY;

    const middleX=window.innerWidth/2;
    const middleY=window.innerHeight/2;

    const offsetX=((x-middleX) / middleX) * 45;
    const offsetY=((y-middleY) / middleY) * 45;
    
    element.style.setProperty("--rotateY", -1 * offsetY + "deg");
    element.style.setProperty("--rotateX", offsetX + "deg");
  }

  return (
    <div className="wrapper">
      <div className="description">
        <h2><span>OSWAN</span> WORLD MOST <br/>LATGEST <span>MOTORCYCLE STORE</span></h2>
        <p><span className='bold'>OSWAN</span> the most latgest bike store in the wold can serve you latest qulity of motorcycle also you can sell here your motorcycle it quo minus iduod maxie placeat facere possimus, omnis voluptas assumenda est, omnis dolor llendus. Temporibus autem quibusdam</p>
        <p>HAVE ANY QUESTION?</p>
        <div className="inquiry">
          <div><PiPhoneCall className='icons' /></div>
          <div><h6>01245 658 698</h6></div>
        </div>
      </div>
      <figure>
        <img src={bike} alt="bike" className="bike" onPointerMove={rotateElement} />
      </figure>
    </div>
  )
}

export default Intro