import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import "./styles.css"

import { signin, signup, authenticate, isAuthenticated } from "../auth/helper"

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
    success: false,
  })

  const { name, email, password, error, loading, didRedirect, success } = values
  const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const onSignin = async (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    await signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false })
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              success: false,
            })
          })
        }
      })
      .catch(console.log("Error in signin"))
  }

  const onSignup = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false })
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false })
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          })
        }
      })
      .catch(console.log("Error in singup"))
  }

  const performRedirect = () => {
    //TODO: do a redirect here
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />
      } else {
        return <Redirect to='/' />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />
    }
  }

  const loadingMessage = () => {
    return (
      loading && (
        <div className='alert alert-info text-center'>
          <h6>Loading...</h6>
        </div>
      )
    )
  }

  const successMessage = () => {
    return (
      success && (
        <div className='alert alert-success text-center'>
          <h6>User created successfully!</h6>
        </div>
      )
    )
  }

  const errorMessage = () => {
    return (
      <div
        className='alert alert-danger text-center'
        style={{ display: error ? "" : "none" }}
        text-center
      >
        {error}
      </div>
    )
  }

  useEffect(() => {
    const loginText = document.querySelector(".title-text .login")
    const loginForm = document.querySelector("form.login")
    const loginBtn = document.querySelector("label.login")
    const signupBtn = document.querySelector("label.signup")
    const signupLink = document.querySelector("form .signup-link a")
    signupBtn.onclick = () => {
      loginForm.style.marginLeft = "-50%"
      loginText.style.marginLeft = "-50%"
    }
    loginBtn.onclick = () => {
      loginForm.style.marginLeft = "0%"
      loginText.style.marginLeft = "0%"
    }
    signupLink.onclick = () => {
      signupBtn.click()
      return false
    }
  })

  const signInForm = () => {
    return (
      <div className='signIn'>
        <div className='wrapper'>
          <div className='title-text'>
            <div className='title login'>Login</div>
            <div className='title signup'>Signup</div>
          </div>
          <div className='form-container'>
            <div className='slide-controls'>
              <input type='radio' name='slide' id='login' defaultChecked />
              <input type='radio' name='slide' id='signup' />
              <label htmlFor='login' className='slide login'>
                Login
              </label>
              <label htmlFor='signup' className='slide signup'>
                Signup
              </label>
              <div className='slider-tab' />
            </div>
            <div className='form-inner'>
              <form action='#' className='login'>
                <div className='field'>
                  <input
                    onChange={handleChange("email")}
                    value={email}
                    className='form-control'
                    placeholder='Email Address'
                    type='email'
                    required
                  />
                </div>
                <div className='field'>
                  <input
                    onChange={handleChange("password")}
                    value={password}
                    className='form-control'
                    placeholder='Password'
                    type='password'
                    required
                  />
                </div>
                <div className='field btn'>
                  <div className='btn-layer' />
                  <input
                    type='submit'
                    defaultValue='Login'
                    onClick={onSignin}
                  />
                </div>
                <div className='signup-link'>
                  Not a member? <a href>Signup now</a>
                </div>
              </form>
              <form action='#' className='signup'>
                <div className='field'>
                  <input
                    className='form-control'
                    onChange={handleChange("name")}
                    value={name}
                    placeholder='Name'
                    type='text'
                    required
                  />
                </div>
                <div className='field'>
                  <input
                    className='form-control'
                    onChange={handleChange("email")}
                    value={email}
                    placeholder='Email Address'
                    type='email'
                    required
                  />
                </div>
                <div className='field'>
                  <input
                    className='form-control'
                    onChange={handleChange("password")}
                    value={password}
                    placeholder='Password'
                    type='password'
                    required
                  />
                </div>
                <div className='field btn'>
                  <div className='btn-layer' />
                  <input
                    type='submit'
                    defaultValue='Signup'
                    onClick={onSignup}
                  />
                </div>
              </form>
            </div>
          </div>
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
    )
  }

  return (
    <Base>
      {signInForm()}
      {performRedirect()}
    </Base>
  )
}

export default Signin
