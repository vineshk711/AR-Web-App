import React, {useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import {getProducts} from './helper/coreapicalls'
import { addItemToCart } from "./helper/cartHelper";
import Image1 from '../images/image1.png'
import User1 from "../images/users/user1.png"
import User2 from "../images/users/user2.png"
import User3 from "../images/users/user3.png"

export default function Home() {
  const [products, setProducts] = useState([])

  const loadAllProduct = () => {
    getProducts().then((data) => {
      setProducts(data)
    })
  }
  const addToCart = (product) => {
    addItemToCart(product)
  }

  useEffect(() => {
    loadAllProduct()
  }, [])

  return (
    <Base title='Home Page'>
      <div className='row'>
        <div className='col-4'>
          <h1>Experience shoping in Augmented Reality</h1>
          <p>
            AR help customers to not only better understand
            your products, but to see how they fit into their lives
          </p>
          <a href='#title' className='btn'>
            Explore Now →
          </a>
        </div>
        <div className='col-5'>
          <img src={Image1} alt='header image' />
        </div>
      </div>

      <div className='small-container'>
        <h2 id='title' className='title'>Featured Products</h2>
        <div className='row'>
          {products.map((product, index) => {
            return (
              <div key={index} className='col-6'>
                <model-viewer
                  style={{
                    width: "500px",
                    height: "450px",
                    marginLeft: "50px",
                    // background: "lightBlue",
                  }}
                  src={product.threeModelLink}
                  camera-controls
                  disable-zoom
                  ar
                ></model-viewer>
                <div
                  style={{ marginLeft: "50px", width: "500px" }}
                  className='row'
                >
                  <h4 className='col'>{product.name}</h4>

                  <div className="right">
                    <p className='col tag'>$ {product.price}</p>
                  </div>
                </div>
                <button
                  className='row button'
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className='offer'>
        <div className='small-container'>
          <div className='row'>
            <div className='col-2'>
              <model-viewer
                style={{
                  width: "600px",
                  height: "450px",
                  cornerRadius: "15px",
                }}
                src='https://try-before-you-buy-01.s3.ap-south-1.amazonaws.com/free_1972_datsun_240k_gt/scene.gltf'
                camera-controls
                disable-zoom
                ar
              ></model-viewer>
            </div>
            <div className='col-2'>
              <p>Exclusively Available on AR Store</p>
              <h1>Datsun 240K GT</h1>
              <small>
                This is a special model which was designed under C110. The C110
                generation was produced from September 1972 through August 1977.
                For export in the 1970s, the C110 and GC110 Skyline was sold as
                the Datsun K-series, with model Datsun 240K.
                <br />
              </small>
              <a href='#' className='btn'>
                Buy Now →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='testimonials'>
        <div className='small-container'>
          <div className='row'>
            <div className='col-3'>
              <i className='fa fa-quote-left' aria-hidden='true' />
              <p>
                With AR store, I can see which product will suit my 1 room
                apartment better and not make me look homeless.
              </p>
              <div className='rating'>
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star-half-o' aria-hidden='true' />
              </div>
              <img src={User1} />
              <h3>Peter Parker</h3>
            </div>
            <div className='col-3'>
              <i className='fa fa-quote-left' aria-hidden='true' />
              <p>
                Such a great innovation. I offered them $54 billions to let me
                buy their app, but they said all they need is 20 marks of
                internal.
              </p>
              <div className='rating'>
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star-half-o' aria-hidden='true' />
              </div>
              <img src={User2} />
              <h3>Elon Musk</h3>
            </div>
            <div className='col-3'>
              <i className='fa fa-quote-left' aria-hidden='true' />
              <p>Waku Waku</p>
              <div className='rating'>
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star' aria-hidden='true' />
                <i className='fa fa-star-half-o' aria-hidden='true' />
              </div>
              <img src={User3} />
              <h3>Anya Forger</h3>
            </div>
          </div>
        </div>
      </div>
    </Base>
  )
}
