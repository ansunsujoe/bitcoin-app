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
import Slider from '@mui/material/Slider';
import { getCommission, roundDecimal } from '../utilities/transaction';
import axios from 'axios';

function ClientTransaction(props) {
  const [buyClient, setBuyClient] = useState("trader-1");
  const [sellClient, setSellClient] = useState("trader-2");
  const [buyingPower, setBuyingPower] = useState(0.0);
  const [buyCommissionType, setBuyCommissionType] = useState("USD");
  const [sellCommissionType, setSellCommissionType] = useState("USD");
  const [buyCommission, setBuyCommission] = useState("0");
  const [sellCommission, setSellCommission] = useState("0");
  const [buyCost, setBuyCost] = useState(0.0);
  const [sellCost, setSellCost] = useState(0.0);
  const [buyDisabled, setBuyDisabled] = useState(true);
  const [sellDisabled, setSellDisabled] = useState(true);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [btcRate, setBtcRate] = useState(50000.0);
  const [traderList, setTraderList] = useState([]);
  const [clientProperties, setClientProperties] = useState({});

  axios.defaults.withCredentials = true;

  // Get current Bitcoin price
  const getCurrentBTC = () => {
    axios.get('http://localhost:5000/btc-rate')
      .then(response => {
        console.log(response.data);
        setBtcRate(response.data.results);
      }).catch(error => {
        console.log(error);
      })
  }

  // Get trader list
  const getClientList = () => {
    axios.get('http://localhost:5000/users/clients')
    .then(response => {
      setTraderList(response.data.results);
      setBuyClient(response.data.results[0].id);
      setSellClient(response.data.results[0].id);
      console.log(response.data.results[0].id);
    }).catch(error => {
      console.log(error);
    })
  }

  // Get Buying power
  const getBuyingPower = () => {
    axios.get('http://localhost:5000/users/clients/' + buyClient + '/buying-power')
    .then(response => {
      setBuyingPower(parseFloat(response.data.results));
      console.log(parseFloat(response.data.results));
    }).catch(error => {
      console.log(error);
    })
  }

  // Get Client Data
  const getUserData = () => {
    axios.get('http://localhost:5000/users/' + buyClient)
    .then(response => {
      console.log(response.data);
      getClientList();
      setClientProperties(response.data);
      getBuyingPower();
      getCurrentBTC();
    }).catch(error => {
      console.log(error);
    })
  }

  // Get current bitcoin price immediately
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserData();
  }, [buyClient]);

  // Get current bitcoin price every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentBTC();
      getBuyingPower();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Change other variables when BTC rate changes
  useEffect(() => {
    setBuyCommission(getCommission(btcRate, buyAmount, buyCommissionType, "silver"));
    setSellCommission(getCommission(btcRate, sellAmount, sellCommissionType, "silver"));
    setBuyCost(buyAmount > 0 ? btcRate * buyAmount + buyCommission : 0.00);
    setSellCost(sellAmount > 0 ? btcRate * sellAmount - sellCommission : 0.00);
  }, [btcRate, buyAmount, sellAmount]);

  // Handler functions for buy slider
  const handleBuyChange = (e, val) => {
    setBuyAmount(val);
    if (val === 0) {
      setBuyDisabled(true);
    }
    else {
      setBuyDisabled(false);
    }
  }

  // Handler functions for sell slider
  const handleSellChange = (e, val) => {
    setSellAmount(val);
    if (val === 0) {
      setSellDisabled(true);
    }
    else {
      setSellDisabled(false);
    }
  }

  // Buy/Sell Axios Request
  const transactionSubmit = (data) => {
    axios.post('http://localhost:5000/users/' + buyClient + '/transactions', data, {
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
  const handleBuySubmit = (e) => {
    console.log(buyClient);
    const data = {
      commission_type: buyCommissionType,
      amount: buyAmount,
      traderId: buyClient,
      action: "buy"
    };
    transactionSubmit(data);
  }

  // Handler function for submitting sell
  const handleSellSubmit = (e) => {
    const data = {
      commission_type: sellCommissionType,
      amount: sellAmount,
      traderId: sellClient,
      action: "sell"
    };
    transactionSubmit(data);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Buy Transaction Form</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleBuySubmit}>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Commission Type</label>
                        <Input type="select" name="commissionType" id="commissionType"
                        value={buyCommissionType} onChange={e => setBuyCommissionType(e.currentTarget.value)}>
                          <option>USD</option>
                          {clientProperties.btcBalance > getCommission(btcRate, buyAmount, buyCommissionType, "silver") ? (
                            <option>BTC</option>
                          ) : null}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Assign Trader</label>
                        <Input type="select" name="transactionType" id="transactionType"
                        value={buyClient} onChange={e => setBuyClient(e.currentTarget.value)}>
                          {traderList.map((t) => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Commission
                        </label>
                        <Input placeholder={buyCommissionType === "BTC" ? buyCommission + " \u20BF" : "$" + buyCommission} disabled />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Current Cost
                        </label>
                        <Input placeholder={"$" + buyCost} disabled />
                      </FormGroup>
                    </Col> 
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup className="mt-4 ml-3 mr-1">
                        
                          <Slider
                            disabled={false}
                            defaultValue={0}
                            aria-labelledby="discrete-slider-always"
                            step={0.1}
                            marks
                            min={0}
                            max={(btcRate && buyingPower) ? roundDecimal(buyingPower, 1, true) : 0.0}
                            valueLabelDisplay="on"
                            color="success"
                            onChange={handleBuyChange}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        color="success"
                        type="submit"
                        disabled={buyDisabled}
                      >
                        Buy Bitcoin
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Sell Transaction Form</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSellSubmit}>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Commission Type</label>
                        <Input type="select" name="commissionType" id="commissionType"
                        value={sellCommissionType} onChange={e => setSellCommissionType(e.currentTarget.value)}>
                          {clientProperties.fiatBalance > getCommission(btcRate, buyAmount, "USD", "silver") ? (
                            <option>USD</option>
                          ) : null}
                          <option>BTC</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Assign Trader</label>
                        <Input type="select" name="transactionType" id="transactionType" 
                        value={sellClient} onChange={e => setSellClient(e.currentTarget.value)}>
                          {traderList.map((t) => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Commission
                        </label>
                        <Input placeholder={sellCommissionType === "BTC" ? sellCommission + " \u20BF" : "$" + sellCommission} disabled />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Current Cost
                        </label>
                        <Input placeholder={sellCost} disabled />
                      </FormGroup>
                    </Col> 
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup className="mt-4 ml-3 mr-1">
 
                        <Slider
                          disabled={false}
                          defaultValue={0}
                          aria-labelledby="discrete-slider-always"
                          step={0.1}
                          marks
                          min={0}
                          max={clientProperties.btcBalance ? clientProperties.btcBalance : 0}
                          valueLabelDisplay="on"
                          color="error"
                          onChange={handleSellChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        color="danger"
                        type="submit"
                        disabled={sellDisabled}
                      >
                        Sell Bitcoin
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

export default ClientTransaction;
