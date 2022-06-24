import React from "react"
import { Link, withRouter } from "react-router-dom"
import { signout, isAuthenticated } from "../auth/helper"
import "./homepage.css"
import Logo from "../images/logo-white.png"
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" }
  } else {
    return { color: "#FFFFFF" }
  }
}

const Menu = ({ history }) => (
  <div className='header'>
    <div className='container'>
      <div className='navbar'>
        <Link style={currentTab(history, "/")} to='/'>
          <div className='logo'>
            <img src={Logo} width='125px' />
          </div>
        </Link>

        <nav className='menu'>
          <ul id='MenuItems'>
            <li className='nav-item'>
              <Link
                style={currentTab(history, "/")}
                className='nav-link'
                to='/'
              >
                Home
              </Link>
            </li>
            {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className='nav-item'>
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className='nav-link'
                  to='/user/dashboard'
                >
                  Dashboard
                </Link>
              </li>
            )}             */}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className='nav-item'>
                <Link
                  style={currentTab(history, "/user/cart")}
                  className='nav-link'
                  to='/user/cart'
                >
                  Cart
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className='nav-item'>
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className='nav-link'
                  to='/admin/dashboard'
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <li className='nav-item'>
                <Link
                  style={currentTab(history, "/signin")}
                  className='nav-link'
                  to='/signin'
                >
                  Sign In
                </Link>
              </li>
            )}
            {isAuthenticated() && (
              <li className='nav-item'>
                <span
                  className='nav-link text-warning'
                  onClick={() =>
                    signout(() => {
                      history.push("/signin")
                    })
                  }
                >
                  Sign Out
                </span>
              </li>
            )}
          </ul>
        </nav>
        {/* <img src='images/cart.svg' width='30px' height='30px' />
        <img
          src='images/menu.svg'
          className='menu-icon'
          onclick='menutoggle()'
        /> */}
      </div>
    </div>
  </div>
)

export default withRouter(Menu)
  // <div className="header">
  //   <div className="container">
  //   <div className='navbar'>
  //     <div class="logo">
  //       <img src="images/logo.png" width="125px"/>
  //     </div>
  //     <nav className="menu">
  //       <ul className='nav fixed-top MenuItems'>
          // <li className='nav-item'>
          //   <Link style={currentTab(history, "/")} className='nav-link' to='/'>
          //     Home
          //   </Link>
          // </li>
          // {isAuthenticated() && isAuthenticated().user.role === 0 && (
          //   <li className='nav-item'>
          //     <Link
          //       style={currentTab(history, "/user/dashboard")}
          //       className='nav-link'
          //       to='/user/dashboard'
          //     >
          //       Dashboard
          //     </Link>
          //   </li>
          // )}
          // {isAuthenticated() && isAuthenticated().user.role === 0 && (
          //   <li className='nav-item'>
          //     <Link
          //       style={currentTab(history, "/user/cart")}
          //       className='nav-link'
          //       to='/user/cart'
          //     >
          //       Cart
          //     </Link>
          //   </li>
          // )}
          // {isAuthenticated() && isAuthenticated().user.role === 1 && (
          //   <li className='nav-item'>
          //     <Link
          //       style={currentTab(history, "/admin/dashboard")}
          //       className='nav-link'
          //       to='/admin/dashboard'
          //     >
          //       Admin Dashboard
          //     </Link>
          //   </li>
          // )}
  //         {/* {!isAuthenticated() && <li className="nav-item">
  //               <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">Sign Up</Link>
  //           </li>} */}
          // {!isAuthenticated() && (
          //   <li className='nav-item'>
          //     <Link
          //       style={currentTab(history, "/signin")}
          //       className='nav-link'
          //       to='/signin'
          //     >
          //       Sign In
          //     </Link>
          //   </li>
          // )}
          // {isAuthenticated() && (
          //   <li className='nav-item'>
          //     <span
          //       className='nav-link text-warning'
          //       onClick={() =>
          //         signout(() => {
          //           history.push("/signin")
          //         })
          //       }
          //     >
          //       Sign Out
          //     </span>
          //   </li>
          // )}
  //       </ul>
  //     </nav>
  //   </div>
  // </div>
  // </div>

