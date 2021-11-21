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
    const [signInStates, updateSignIn] = useState({
        username: "",
        password: "",
        confirm : "",
        name : "",
        telephone : "",
        cell : "",
        email : "",
        address : "",
        city : "",
        state : "",
        zip : ""

    })

    const updateForm = (e) => {
        updateSignIn({
            ...signInStates,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        console.log(signInStates)
        e.preventDefault()
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
                                        name = "name"
                                        onChange={updateForm}
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
                                        name = "telephone"
                                        onChange={updateForm}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="px-1" md="4">
                                <FormGroup>
                                    <label>Cell</label>
                                    <Input
                                        placeholder="Username"
                                        type="text"
                                        name = "cell"
                                        onChange={updateForm}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pl-1" md="4">
                                <FormGroup>
                                    <label htmlFor="exampleInputEmail1">
                                        Email address
                                    </label>
                                    <Input placeholder="Email" type="email" name = "email" onChange={updateForm}/>
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
                                        name = "address"
                                        onChange={updateForm}
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
                                        name = "city"
                                        onChange={updateForm}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="px-1" md="4">
                                <FormGroup>
                                    <label>State</label>
                                    <Input
                                        placeholder="State"
                                        type="text"
                                        name = "state"
                                        onChange={updateForm}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pl-1" md="4">
                                <FormGroup>
                                    <label>Postal Code</label>
                                    <Input placeholder="ZIP Code" type="text" name = "zip" onChange={updateForm} />
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