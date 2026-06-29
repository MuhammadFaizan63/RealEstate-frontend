import { useState } from 'react'
import './Slider.scss'

const Slider = ({images}) => {
  const [imageIndex, setImageIndex] = useState(null)

  const openSlider = (index) => {
    setImageIndex(index)
  }

  const closeSlider = () => {
    setImageIndex(null)
  }

  const prevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className='slider'>
      <div className="bigImage">
        <img 
          src={images[0]} 
          alt="" 
          onClick={() => openSlider(0)}
        />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img 
            src={image} 
            key={index} 
            alt="" 
            onClick={() => openSlider(index + 1)}
          />
        ))}
      </div>

      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={prevImage}>
            <img src="/arrow.png" alt="" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={nextImage}>
            <img className='right' src="/arrow.png" alt="" />
          </div>
          <div className="close" onClick={closeSlider}>X</div>
        </div>
      )}
    </div>
  )
}

export default Slider