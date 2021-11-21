import React, { useState } from "react";

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


const Signin = ({ updateView }) => {
  const [signInStates, updateSignIn] = useState({
    username: "",
    password: ""
  })

  const [errorStates, updateErrors] = useState({
    username: false,
    password: false
  })

  const updateForm = (e) => {
    updateSignIn({
      ...signInStates,
      [e.target.name]: e.target.value
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
    let errors = {
      username : false,
      password : false
    }
    if(signInStates.username.length == 0){
      errors.username = true
    }
    if(signInStates.password.length == 0){
      errors.password = true
    }
      updateErrors({
        ...errors
      })
    
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
          <button type="submit" className="btn btn-lg btn-success text-capitalize">Sign in</button>
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

export default Signin