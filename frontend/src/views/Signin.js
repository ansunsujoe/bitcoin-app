import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import { loginUser } from "Reducers/Users/actions";
import { useHistory } from "react-router-dom";


import {
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import { CreateDiv } from "../styles/login";


const Signin = ({ updateView, error, loginInit, path = "/", loading }) => {
  const [signInStates, updateSignIn] = useState({
    username: "",
    password: ""
  })

  const [errorStates, updateErrors] = useState({
    username: false,
    password: false
  })

  useEffect(()=>{
    if(!loading && localStorage.getItem("user"))
    {
      if(path.length>1)
        history.push(path)
      history.push("/admin")
    }
  },[loading])

  const history = useHistory()

  const updateForm = (e) => {
    updateSignIn({
      ...signInStates,
      [e.target.name]: e.target.value
    })
  }

  const loginUser = async () => {
    loginInit(signInStates)
  }

  const submitForm = (e) => {
    e.preventDefault()
    let errors = {
      username : false,
      password : false
    }
    let errorPresent = false
    if(signInStates.username.length == 0){
      errors.username = true
      errorPresent = true
    }
    if(signInStates.password.length == 0){
      errors.password = true
      errorPresent = true
    }
    if(errorPresent){
      updateErrors({
        ...errors
      })
    }
    else {
      loginUser()
    }  
  }
  return (
    <div>

      <CardHeader>
        <div style={{ textAlign: "center" }}>
          <CardTitle tag="h5">Sign In</CardTitle>
        </div>
      </CardHeader>
      <Form onSubmit={submitForm}>
      <CardBody>
        <Row>
          <Col className="pr-3" md="12">
            <FormGroup>
              <label>Username</label>
              <Input
                placeholder="Username"
                type="text"
                name="username"
                onChange={updateForm}
                className = {(errorStates && errorStates.username)?"is-invalid":""}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="pr-3" md="12">
            <FormGroup>
              <label>Password</label>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                onChange={updateForm}
                className = {(errorStates && errorStates.password)?"is-invalid":""}
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="button-container">
          <button type="submit" className="btn btn-lg btn-success text-capitalize" disabled = {loading}>Sign in</button>
          {error && <div style = {{color : "red"}}>{error}</div>}
        </div>
        </CardBody>
      </Form>
      <CreateDiv>
        Don't have an account yet ? <span onClick={() => { updateView("create") }}>Create account</span>
        <div>
          <span onClick={() => { updateView("forgot") }}>Forgot Password ?</span>
        </div>
      </CreateDiv>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading : state.user.loading,
    error : state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginInit: data => {
      dispatch(loginUser(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin)