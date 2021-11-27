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

function NewTransaction(props) {
  const [buyTrader, setBuyTrader] = useState("trader-1");
  const [sellTrader, setSellTrader] = useState("trader-2");
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
  const [btcRate, setBtcRate] = useState(0.0)
  const [traderList, setTraderList] = useState([]);
  const [clientProperties, setClientProperties] = useState({});

  axios.defaults.withCredentials = true;

  // Get current Bitcoin price
  const getCurrentBTC = () => {
    axios.get('http://localhost:5000/btc-rate')
      .then(response => {
        console.log(response.data);
        setBtcRate(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  // Get trader list
  const getTraderList = () => {
    axios.get('http://localhost:5000/users/traders')
    .then(response => {
      setTraderList(response.data.results);
      setBuyTrader(response.data.results[0].id);
      setSellTrader(response.data.results[0].id);
    }).catch(error => {
      console.log(error);
    })
  }

  // Get Client Data
  const getUserData = () => {
    axios.get('http://localhost:5000/users/clients/' + props.userId)
    .then(response => {
      console.log(response.data);
      setClientProperties(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  // Get current bitcoin price immediately
  useEffect(() => {
    getCurrentBTC();
    getTraderList();
    getUserData();
  }, []);

  // Get current bitcoin price every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentBTC();
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
    axios.post('http://localhost:5000/users/' + props.userId + '/transactions', data, {
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
    const data = {
      commission_type: buyCommissionType,
      amount: buyAmount,
      traderId: buyTrader,
      action: "buy"
    };
    transactionSubmit(data);
  }

  // Handler function for submitting sell
  const handleSellSubmit = (e) => {
    const data = {
      commission_type: sellCommissionType,
      amount: sellAmount,
      traderId: sellTrader,
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
                          <option>BTC</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Assign Trader</label>
                        <Input type="select" name="transactionType" id="transactionType"
                        value={buyTrader} onChange={e => setBuyTrader(e.currentTarget.value)}>
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
                        <Input placeholder={buyCommission} disabled />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Current Cost
                        </label>
                        <Input placeholder={buyCost} disabled />
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
                            max={btcRate > 0 ? roundDecimal(clientProperties.fiatBalance / btcRate, 1, true) : 0.0}
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
                          <option>USD</option>
                          <option>BTC</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Assign Trader</label>
                        <Input type="select" name="transactionType" id="transactionType" 
                        value={sellTrader} onChange={e => setSellTrader(e.currentTarget.value)}>
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
                        <Input placeholder={sellCommission} disabled />
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
                          max={clientProperties.btcBalance}
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

export default NewTransaction;
