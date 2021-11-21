import React, { useState } from "react";

// reactstrap components
import {
  Card,
  Row,
  Col,
} from "reactstrap";


import Footer from "components/Footer/Footer.js";


import Switch from '@mui/material/Switch';

import SignIn from "views/Signin"
import Create from "views/Create";
import ForgotPassword  from "views/ForgotPassword";


function Login() {

  const [view, updateView] =  useState("signin")
  const [signInStates, updateSignIn] = useState({
      username : "",
      password : ""
  })


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
              {view == "forgot" && <ForgotPassword updateView = {updateView} />}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
