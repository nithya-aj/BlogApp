import React, { useState } from "react";
import * as Styles from './Styles'
import { Box } from "@mui/material";
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from "../store";
import { useNavigate } from "react-router-dom"

function Auth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    name: "", email: "", password: ""
  })
  const [isSignup, setIsSignup] = React.useState(false)
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err))
    const data = await res.data
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    if (isSignup) {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data))
    } else {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data))
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column', height: "100vh", background: 'linear-gradient(90deg, rgba(72,22,106,1) 0%, rgba(90,59,215,1) 50%, rgba(11,18,33,1) 100%)' }}>
      <Styles.Container>
        <Styles.SignUpContainer signinIn={isSignup}>
          <Styles.Form onSubmit={handleSubmit}>
            <Styles.Title>Create Account</Styles.Title>
            <Styles.Input onChange={handleChange} name="name" type='text' value={inputs.name} placeholder='Name' />
            <Styles.Input onChange={handleChange} name="email" type='email' value={inputs.email} placeholder='Email' />
            <Styles.Input onChange={handleChange} name="password" type='password' value={inputs.password} placeholder='Password' />
            <Styles.Button type="submit">Sign Up</Styles.Button>
          </Styles.Form>
        </Styles.SignUpContainer>

        <Styles.SignInContainer signinIn={isSignup}>
          <Styles.Form onSubmit={handleSubmit}>
            <Styles.Title>Sign in</Styles.Title>
            <Styles.Input onChange={handleChange} name="email" type='email' value={inputs.email} placeholder='Email' />
            <Styles.Input onChange={handleChange} name="password" type='password' value={inputs.password} placeholder='Password' />
            <Styles.Anchor href='#'>Forgot your password?</Styles.Anchor>
            <Styles.Button type="submit">Sign In</Styles.Button>
          </Styles.Form>
        </Styles.SignInContainer>

        <Styles.OverlayContainer signinIn={isSignup}>
          <Styles.Overlay signinIn={isSignup}>

            <Styles.LeftOverlayPanel signinIn={isSignup}>
              <Styles.Title>Hello, Friend!</Styles.Title>
              <Styles.Paragraph>
                Enter Your personal details and start journey with us
              </Styles.Paragraph>
              <h6 style={{ margin: "5px" }}>If you already have an account, sign in here.</h6>
              <Styles.GhostButton onClick={() => setIsSignup(true)}>
                Sign In
              </Styles.GhostButton>
            </Styles.LeftOverlayPanel>
            <Styles.RightOverlayPanel signinIn={isSignup}>
              <Styles.Title>Welcome Back!</Styles.Title>
              <Styles.Paragraph>
                To keep connected with us please login with your personal info
              </Styles.Paragraph>
              <h6 style={{ margin: "5px" }}>Don't have an account yet? Click here to register</h6>
              <Styles.GhostButton onClick={() => setIsSignup(false)}>
                Sign Up
              </Styles.GhostButton>
            </Styles.RightOverlayPanel>

          </Styles.Overlay>
        </Styles.OverlayContainer>

      </Styles.Container>
    </Box>
  )
}

export default Auth;