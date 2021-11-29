import React, { useState, useEffect } from "react";
import { connect } from "react-redux"
import { createUser } from "Reducers/Users/actions";
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


const Create = ({ updateView, createInit, loading, error }) => {
    const [createStates, updateSignIn] = useState({
        username: "",
        password: "",
        confirm: "",
        name: "",
        telephone: "",
        cell: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    })

    const history = useHistory()


    const [errorStates, updateErrors] = useState({
        username: false,
        password: false,
        confirm: false,
        name: false,
        telephone: false,
        cell: false,
        email: false,
        address: false,
        city: false,
        state: false,
        zip: false

    })
    

    useEffect(()=>{
        if(!loading && localStorage.getItem("user"))
        {
          history.push("/admin")
        }
      },[loading])
    
    const createUser = async () => {
        createInit(createStates)
      }

    const updateForm = (e) => {
        updateSignIn({
            ...createStates,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        const errors = {
            username: false,
            password: false,
            confirm: false,
            name: false,
            telephone: false,
            cell: false,
            email: false,
            address: false,
            city: false,
            state: false,
            zip: false
        }
        let errorPresent = false
        if(createStates.name.length == 0){
            errors.name = true
            errorPresent = true
        }
        if(createStates.telephone.length == 0){
            errors.telephone = true
            errorPresent = true
        }
        if(createStates.cell.length == 0){
            errors.cell = true
            errorPresent = true

        }
        if(createStates.email.length == 0){
            errors.email = true
            errorPresent = true

        }
        if(createStates.address.length == 0){
            errors.address = true
            errorPresent = true

        }
        if(createStates.city.length == 0){
            errors.city = true
            errorPresent = true

        }
        if(createStates.state.length == 0){
            errors.state = true
            errorPresent = true

        }
        
        if(createStates.zip.length == 0){
            errors.zip = true
            errorPresent = true

        }
        if(createStates.password.length == 0){
            errors.password = true
            errorPresent = true

        }
        if(createStates.confirm.length == 0){
            errors.confirm = true
            errorPresent = true

        }
        if(createStates.password !== createStates.confirm){
            errors.password = true
            errors.confirm = true
            errorPresent = true

        }
        if(errorPresent){
            updateErrors({
                ...errors
            })
        }
        else {
            createUser()
        }
    }

    return (
        <div>
            <CardHeader>
                <div style={{ textAlign: "center" }}>
                    <CardTitle tag="h5">Create Account </CardTitle>
                </div>
            </CardHeader>
            <Form onSubmit={submitForm}>
                <CardBody>
                    <Row>
                        <Col className="pr-3" md="12">
                            <FormGroup>
                                <label>Full Name</label>
                                <Input
                                    placeholder="Full Name"
                                    type="text"
                                    name="name"
                                    onChange={updateForm}
                                    className={(errorStates && errorStates.name) ? "is-invalid" : ""}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="4">
                            <FormGroup>
                                <label>Telephone</label>
                                <Input
                                    placeholder="Telephone"
                                    type="text"
                                    name="telephone"
                                    onChange={updateForm}
                                    className={(errorStates && errorStates.telephone) ? "is-invalid" : ""}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                            <FormGroup>
                                <label>Cell</label>
                                <Input
                                    placeholder="Username"
                                    type="text"
                                    name="cell"
                                    onChange={updateForm}
                                    className={(errorStates && errorStates.cell) ? "is-invalid" : ""}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                            <FormGroup>
                                <label htmlFor="exampleInputEmail1">
                                    Email address
                                </label>
                                <Input placeholder="Email" type="email" name="email" onChange={updateForm}
                                    required
                                    className={(errorStates && errorStates.email) ? "is-invalid" : ""}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>Address</label>
                                <Input
                                    placeholder="Home Address"
                                    type="text"
                                    name="address"
                                    onChange={updateForm}
                                    className={(errorStates && errorStates.address) ? "is-invalid" : ""}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="4">
                            <FormGroup>
                                <label>City</label>
                                <Input
                                    placeholder="City"
                                    type="text"
                                    name="city"
                                    onChange={updateForm}
                                    className={(errorStates && errorStates.city) ? "is-invalid" : ""}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="4">
                            <FormGroup>
                                <label>State</label>
                                <Input
                                    placeholder="State"
                                    type="text"
                                    name="state"
                                    onChange={updateForm}
                                    className={(errorStates && errorStates.state) ? "is-invalid" : ""}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                            <FormGroup>
                                <label>Postal Code</label>
                                <Input placeholder="ZIP Code" type="text" name="zip" onChange={updateForm}
                                required
                                    className={(errorStates && errorStates.zip) ? "is-invalid" : ""}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-3" md="12">
                            <FormGroup>
                                <label>Username</label>
                                <Input
                                    placeholder="Username"
                                    type="text"
                                    name="username"
                                    onChange={updateForm}
                                    className={(errorStates && errorStates.username) ? "is-invalid" : ""}
                                    required
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
                                    className={(errorStates && errorStates.password) ? "is-invalid" : ""}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-3" md="12">
                            <FormGroup>
                                <label>Password</label>
                                <Input
                                    placeholder="Confirm password"
                                    type="password"
                                    name="confirm"
                                    onChange={updateForm}
                                    className={(errorStates && errorStates.confirm) ? "is-invalid" : ""}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="button-container">
                        <button type="submit" className="btn btn-lg btn-success text-capitalize" disabled = {loading}>Create Account</button>
                        {error && <div style = {{color : "red"}}>{error}</div>}
                    </div>
                </CardBody>
            </Form>
            <CreateDiv>
                Have an account? <span onClick={() => { updateView("signin") }}>Sign In</span>
                <div>
                    <span onClick={() => { updateView("forgot") }}>Forgot Password ?</span>
                </div>
            </CreateDiv>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      loading : state.user.createloading,
      error : state.user.createError
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      createInit: data => {
        dispatch(createUser(data));
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Create)

