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


const ForgotPassword = ({ updateView }) => {
  const [email, updateEmail] = useState("")


  const submitForm = (e) => {
    console.log(email)
    e.preventDefault()
  }

  return (
    <div>
      <CardHeader>
        <div style={{ textAlign: "center" }}>
          <CardTitle tag="h5">Forgot Password ?</CardTitle>
        </div>
      </CardHeader>
      <Form onSubmit={submitForm}>
      <CardBody>
        <Row>
          <Col className="pr-3" md="12">
            <FormGroup>
              <label>Email</label>
              <Input
                placeholder="Email"
                type="text"
                name="email"
                onChange={(e)=>{updateEmail(e.target.value)}}
                value = {email}
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="button-container">
          <button type="submit" className="btn btn-lg btn-success text-capitalize">Send me a reset Link</button>
        </div>
        </CardBody>
      </Form>
      <CreateDiv>
        Don't have an account yet ? <span onClick={() => { updateView("create") }}>Create account</span>
        <div>
          Already have an account ? <span onClick={() => { updateView("signin") }}>Sign in</span>
        </div>
      </CreateDiv>
    </div>
  )
}

export default ForgotPassword