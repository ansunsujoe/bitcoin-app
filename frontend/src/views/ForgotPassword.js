import React, { useState } from "react";
import { connect } from "react-redux"
import { forgetPass } from "Reducers/Users/actions";
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


const ForgotPassword = ({ updateView , loading, error, success, forgotPassword}) => {
  const [email, updateEmail] = useState("")


  const submitForm = (e) => {
    forgotPassword(email)
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
                type="email"
                name="email"
                onChange={(e)=>{updateEmail(e.target.value)}}
                value = {email}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="button-container">
          <button type="submit" className="btn btn-lg btn-success text-capitalize" disabled = {loading}>Send me a reset Link</button>
          {error && <div style = {{color : "red"}}>{error}</div>}
          {success && <div style = {{color : "green"}}>Link has been sent to your id, retrieve and login</div>}
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

const mapStateToProps = state => {
  return {
    loading : state.user.forgotLoading,
    error : state.user.forgotError,
    success : state.user.forgotSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: data => {
      dispatch(forgetPass(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

