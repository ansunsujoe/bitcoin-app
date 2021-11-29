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
axios.defaults.withCredentials = true;

function NewTransfer(props) {
    const [transferTrader, setTransferTrader] = useState("trader-1");
    const [transferDisabled, setTransferDisabled] = useState(true);
    const [transferAmount, setTransferAmount] = useState(0);
    const [traderList, setTraderList] = useState([]);
    const [clientProperties, setClientProperties] = useState({});

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

    // Get Client Data
    const getUserData = () => {
        axios.get('http://localhost:5000/users/' + props.userId)
            .then(response => {
                console.log(response.data);
                setClientProperties(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    // Get trader and user list
    useEffect(() => {
        //getCurrentBTC();
        getTraderList();
        getUserData();
    }, []);

    // Handler functions for transfer slider
    const handleTransferChange = (e, val) => {
        setTransferAmount(val);
        if (val === 0) {
            setTransferDisabled(true);
        }
        else {
            setTransferDisabled(false);
        }
    }

    // Buy/Sell Axios Request
    const transferSubmit = (data) => {
        axios.post('http://localhost:5000/users/' + props.userId + '/transfers', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("SUCCESS", response);
        }).catch(error => {
            console.log(error);
        })
    }

    // Handler function for submitting buy
    const handleTransferSubmit = (e) => {
        const data = {
            //commission_type: buyCommissionType,
            amount: transferAmount,
            traderId: transferTrader,
            action: "buy"
        };
        transferSubmit(data);
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
                            <CardBody>
                                <Form onSubmit={handleTransferSubmit}>
                                    <Row>
                                        <Col className="px-1" md="4">
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
                                        <Col className="px-1" md="4">
                                            <FormGroup>
                                                <label>Enter Amount:</label>
                                                <Input
                                                    defaultValue={0}
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
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default NewTransfer;