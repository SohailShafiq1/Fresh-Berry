import React from 'react'
import style from './Comitments.module.css'
import img from './image.png'
const s = style
export const Comitments = () => {
  return (
    <div className={s.container}>
        <div className={s.top}>
            <h1>
                Commitment to Quality
            </h1>
            <p> 
                Quality is our foundation. We partner with trusted farms 
                across regions known for their premium produce and adhere to rigorous standards in handling and 
                delivery. Our cold chain logistics maintain freshness and nutrition, while our quality control team performs
                 thorough inspections to guarantee you receive nothing but the best.
            </p>
        </div>
        <div className={s.imageContainer}>
            <img src={img} alt="Commitment to Quality" className={s.image} />
        </div>
    </div>
  )
}
