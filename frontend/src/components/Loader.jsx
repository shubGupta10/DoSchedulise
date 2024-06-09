import React from 'react'
import "./Loader.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="worm"></div>
        <div className="circleMiddle"></div>
      </div>
    </div>
  )
}

export default Loader
