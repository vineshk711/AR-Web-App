import React from "react"
// import { API } from "../../backend"
const API = "http://localhost:8000/api"

const ImageHelper = ({ product }) => {
  const imageurl =`${API}/product/photo/${product._id}`
  return (
    <div className='rounded border border-success p-3'>
      <img
        src={imageurl}
        alt='photo'
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className='mb-3 rounded'
      />
    </div>
  )
}

export default ImageHelper
