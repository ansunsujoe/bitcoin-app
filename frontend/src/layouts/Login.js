import React, { useState } from "react";

// reactstrap components
import {
  Card,
  Row,
  Col,
} from "reactstrap";


import SignIn from "views/Signin"
import Create from "views/Create";


function Login() {

  const [view, updateView] =  useState("signin")


  return (
    <>
      <div className="content" style={{height:"100vh", paddingTop : "20px", paddingBottom : "20px"}}>
        <Row className="justify-content-center h-100 align-items-center">
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/bitcoin-background.jpg").default}
                />
              </div>
              {view == "create" && <Create updateView = {updateView} />}
              {view == "signin" && <SignIn updateView = {updateView} />}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
