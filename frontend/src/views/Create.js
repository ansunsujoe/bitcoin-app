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


const Create = ({ updateView }) => {
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

    const updateForm = (e) => {
        updateSignIn({
            ...createStates,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        console.log(createStates)
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
        if(createStates.name.length == 0){
            errors.name = true
        }
        if(createStates.telephone.length == 0){
            errors.telephone = true
        }
        if(createStates.cell.length == 0){
            errors.cell = true
        }
        if(createStates.email.length == 0){
            errors.email = true
        }
        if(createStates.address.length == 0){
            errors.address = true
        }
        if(createStates.city.length == 0){
            errors.city = true
        }
        if(createStates.state.length == 0){
            errors.state = true
        }
        if(createStates.zip.length == 0){
            errors.zip = true
        }
        if(createStates.password.length == 0){
            errors.password = true
        }
        if(createStates.confirm.length == 0){
            errors.confirm = true
        }
        if(createStates.password !== createStates.confirm){
            errors.password = true
            errors.confirm = true
        }
        updateErrors({
            ...errors
        })
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
                        <button type="submit" className="btn btn-lg btn-success text-capitalize">Create Account</button>
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

export default Create