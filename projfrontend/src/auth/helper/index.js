import { response } from "express"
import {API} from "../../backend" // this is address of bakend http://localhost/5000/api

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "ContentType": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err =>  console.log(err))
}

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "ContentType": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err =>  console.log(err))
}

export const authenticate = (data, next) => {
    if(typeof window != "undefined"){
        localStorage.setItem("jwt", json.stringify(data))
    }
    next()
}

export const signout = next => {
    if(typeof window != "undefined"){
        localStorage.setItem("jwt", json.stringify(data))
    }
    next()

    return fetch(`${API}/signout`, {
        method: 'GET'
    })
    .then(response => console.log("signout success"))
    .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}