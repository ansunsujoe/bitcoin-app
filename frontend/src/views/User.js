/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useEffect} from "react";
import { connect } from "react-redux"
import { loginUser } from "Reducers/Users/actions";



// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import axios from 'axios';

axios.defaults.withCredentials = true;

function User({userId, userID, handleUserIdChange, loginInit}) {
  const [userData, setUserData] = useState({});

  // Get User Information - Important
  const getUserData = () => {
    axios.get('http://localhost:5000/users/' + userID)
      .then(response => {
        setUserData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  // User title
  const userTitle = () => {
    var titleArr = [];
    if (userData.isClient) {
      titleArr.push("Client");
    }
    if (userData.isTrader) {
      titleArr.push("Trader");
    }
    if (userData.isManager) {
      titleArr.push("Manager");
    }
    return titleArr.join("/");
  }

  // Get user data on start
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserData();
  }, [userID]);

  // Handle trader switch
  const handleTraderSwitch = (e) => {
   loginInit({password: "money",
   username: "amit@has"})
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/bitcoin-background.jpg").default}
                />
              </div>
              <CardBody>
                <div className="author">
                  <p>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/default-avatar.png").default}
                    />
                    <h5 className="title">{userData.name}</h5>
                    <small>{userTitle()}</small>
                  </p>
                </div>
              </CardBody>
              {userData.isClient ? (
                <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                      <h5>
                        {userData.btcBalance} &#8383;<br />
                        <small>Bitcoin</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                      <h5>
                        ${userData.fiatBalance} <br />
                        <small>USD</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
              ) : null}
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Profile Information</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-3" md="12">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input
                          defaultValue={userData.name}
                          placeholder="Company"
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Telephone</label>
                        <Input
                          defaultValue={userData.phoneNumber}
                          placeholder="Company"
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Cell</label>
                        <Input
                          defaultValue={userData.cell}
                          placeholder="Username"
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email"
                        defaultValue={userData.email} readOnly />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={userData.streetAddress}
                          placeholder="Home Address"
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue={userData.city}
                          placeholder="City"
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>State</label>
                        <Input
                          defaultValue={userData.state}
                          placeholder="State"
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number"
                        defaultValue={userData.zip} readOnly/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        color="info"
                        onClick={handleTraderSwitch}
                      >
                        Switch To Trader
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    userID: state.user.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginInit: data => {
      dispatch(loginUser(data));
    }
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(User);
