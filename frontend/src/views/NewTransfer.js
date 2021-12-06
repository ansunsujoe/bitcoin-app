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
import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
// import Slider from '@mui/material/Slider';
// import { getCommission, roundDecimal } from '../utilities/transaction';
import axios from 'axios';
import { connect } from "react-redux";


function NewTransfer(props) {
    const [transferTrader, setTransferTrader] = useState("trader-1");
    const [transferClient, setTransferClient] = useState("client-1");
    const [transferDisabled, setTransferDisabled] = useState(true);
    const [transferAmount, setTransferAmount] = useState(0);
    const [traderList, setTraderList] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [userProperties, setUserProperties] = useState({});

    axios.defaults.withCredentials = true;

    // Get trader list
    const getTraderList = () => {
        axios.get('http://localhost:5000/users/traders')
            .then(response => {
                setTraderList(response.data.results);
                setTransferTrader(response.data.results[0].id);
                //setSellTrader(response.data.results[0].id);
            }).catch(error => {
                console.log(error);
            })
    }

    // Get client list
    const getClientList = () => {
        axios.get('http://localhost:5000/users/clients')
            .then(response => {
                setClientList(response.data.results);
                setTransferClient(response.data.results[0].id);
                //setSellTrader(response.data.results[0].id);
            }).catch(error => {
                console.log(error);
            })
    }

    // Get User Data
    const getUserData = () => {
        axios.get('http://localhost:5000/users/' + props.userID)
            .then(response => {
                console.log(response.data);
                setUserProperties(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // Get trader and client list
    useEffect(() => {
        getClientList();
        getTraderList();
        getUserData();
    }, []);

    // Handler functions for transfer number field
    const handleTransferChange = (e) => {
        setTransferAmount(e.target.value);
        if (e.target.value === 0) {
            setTransferDisabled(true);
        }
        else {
            setTransferDisabled(false);
            //setTransferAmount(e.target.value);
        }
    }

    // Transfer Axios Request
    const transferSubmit = (data) => {
        axios.post('http://localhost:5000/users/' + props.userID + '/transfers', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("SUCCESS", response);
        }).catch(error => {
            console.log(error);
        })
    }

    // Trader Transfer Axios Request
    const traderTransferSubmit = (data) => {
        axios.post('http://localhost:5000/users/traders/' + props.userID + '/transfers', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("SUCCESS", response);
        }).catch(error => {
            console.log(error);
        })
    }

    // Handler function for submitting Transfers
    const handleTransferSubmit = (e) => {
        const data = {
            amount: transferAmount,
            traderId: transferTrader,
        };
        transferSubmit(data);
    }

    // Handler function for submitting Transfers
    const handleTraderTransferSubmit = (e) => {
        const data = {
            amount: transferAmount,
            clientId: transferClient,
        };
        traderTransferSubmit(data);
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Transfer Money</CardTitle>
                            </CardHeader>
                            { userProperties.isTrader ? (
                                <CardBody>
                                <Form onSubmit={handleTraderTransferSubmit}>
                                    <Row>
                                        <Col className="px-3" md="5">
                                            <FormGroup>
                                                <label>Select Client</label>
                                                <Input type="select" name="transactionType" id="transactionType"
                                                    value={transferClient} onChange={e => setTransferClient(e.currentTarget.value)}>
                                                    {clientList.map((t) => (
                                                        <option key={t.id} value={t.id}>{t.name}</option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-3" md="7">
                                            <FormGroup>
                                                <label>Enter Amount:</label>
                                                <Input
                                                    defaultValue={0}
                                                    //value={transferAmount}
                                                    type="number"
                                                    step={0.01}
                                                    min={0}
                                                    onChange={handleTransferChange}
                                            />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                color="success"
                                                type="submit"
                                                disabled={transferDisabled}
                                            >
                                                Transfer Money
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            </CardBody>

                            ):(
                            
                            <CardBody>
                                <Form onSubmit={handleTransferSubmit}>
                                    <Row>
                                        <Col className="px-3" md="5">
                                            <FormGroup>
                                                <label>Assign Trader</label>
                                                <Input type="select" name="transactionType" id="transactionType"
                                                    value={transferTrader} onChange={e => setTransferTrader(e.currentTarget.value)}>
                                                    {traderList.map((t) => (
                                                        <option key={t.id} value={t.id}>{t.name}</option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-3" md="7">
                                            <FormGroup>
                                                <label>Enter Amount:</label>
                                                <Input
                                                    defaultValue={0}
                                                    //value={transferAmount}
                                                    placeholder={"$" + transferAmount}
                                                    type="number"
                                                    step={0.01}
                                                    min={0}
                                                    onChange={handleTransferChange}
                                            />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                color="success"
                                                type="submit"
                                                disabled={transferDisabled}
                                            >
                                                Transfer Money
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            </CardBody>
                            )}
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
  
  export default connect(mapStateToProps, null)(NewTransfer);