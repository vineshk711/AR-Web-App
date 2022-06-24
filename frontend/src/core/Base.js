import React from "react";
import Menu from "./Menu";
// import './homepage.css'
import Logo from '../images/logo-white.png'


const Base = ({
  title = "My Title",
  description = "My desription",
  children,
}) => (
  <div>
    <Menu />
    {/* <div className="container-fluid">
      <div className="jumbotron text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
    </div> */}
    <p> </p>
    <div>{children}</div>
    <div className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='footer-col-1'>
            <h3>AR Works with mobile devices</h3>
            <p>
              Use AR Core supported devices to show products in Arugmented
              Reality
            </p>
            <div className='app-logo'>
              <p><a href='https://developers.google.com/ar/devices'>
                List of supported devices
              </a></p>
            </div>
          </div>
          <div className='footer-col-2'>
            <img src={Logo} />
            <p>
              Our Objective is to make online shopping even easier than it
              already is.
            </p>
          </div>
          <div className='footer-col-3'>
            <h3>Follow Us</h3>
            <ul>
              <li>
                <a href='https://www.facebook.com/mistaa.vee.7'>
                  <i className='fa fa-facebook-square' /> Facebook
                </a>
              </li>
              <li>
                <a href='https://twitter.com/realmistaavee'>
                  <i className='fa fa-twitter' /> Twitter
                </a>
              </li>
              <li>
                <a href='https://instagram.com/mistaavee'>
                  <i className='fa fa-instagram' aria-hidden='true' /> Instagram
                </a>
              </li>
              <li>
                <a href='https://www.youtube.com/channel/UCruH_2U_bfTj2NyTJbhz77Q'>
                  <i className='fa fa-youtube-play' aria-hidden='true' />{" "}
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <p className='copyright'>Copyright 2022 - Major Project</p>
      </div>
    </div>
  </div>
)

export default Base;
