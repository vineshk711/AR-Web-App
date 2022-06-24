import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import ImageHelper from "../core/helper/imageHelper"
import "./styles.css"
import "./cart.css"
import { loadCartItems, removeItemFromCart } from "../core/helper/cartHelper"

const Cart = () => {
  const [products, setProducts] = useState([])
  

  const getTotalPrice = () => {
    let total = 0
    products.map((product) => {
      total = total + product.price
    })
    return total
  }

  const removeItem = (id) => {
    setProducts(removeItemFromCart(id))
  }


  useEffect(async () => {
    await setProducts(loadCartItems())
  }, [])

  return (
    <Base title='Cart Page'>
      <div>
        {products.length > 0 && (
          <div className='small-container cart-page'>
            <table>
              <tbody>
                <tr className='tablehead'>
                  <th>Product</th>
                  <th></th>
                  <th>Subtotal</th>
                </tr>
                {products.map((product, idx) => {
                  return (
                    <tr id={idx}>
                      <td>
                        <div className='cart-info'>
                          <ImageHelper product={product} />
                          <div className='details'>
                            <p>{product.name}</p>
                            <small>Price: ${product.price}</small>
                            <br />
                          </div>
                        </div>
                      </td>
                      <td>
                        <button className="btn" onClick={() => removeItem(product._id)}>
                          Remove
                        </button>
                      </td>
                      <td>$ {product.price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='total-price'>
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>$ {getTotalPrice().toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td>5%</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>
                      ${(getTotalPrice() + 0.05 * getTotalPrice()).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        className='btn'
                        style={{ background: "green"}}
                      >
                        {" "}
                        Check Out
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {products.length == 0 && (<h3 style={{padding: "200px", textAlign:"center"}}>Cart is Empty!</h3>)}
      </div>
    </Base>
  )
}

export default Cart
