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
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Slider from '@mui/material/Slider';
import { getCurrentBTC, getCommission } from '../utilities/transaction';
import axios from 'axios';

function NewTransaction(props) {
  const [buyTrader, setBuyTrader] = useState("trader-1");
  const [sellTrader, setSellTrader] = useState("trader-2");
  const [buyCommissionType, setBuyCommissionType] = useState("USD");
  const [sellCommissionType, setSellCommissionType] = useState("USD");
  const [buyCommission, setBuyCommission] = useState("0");
  const [sellCommission, setSellCommission] = useState("0");
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        console.log("SUCCESS", response);
        setBuyCommission(response.data)
      }).catch(error => {
        console.log(error);
      })
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Commission Type</label>
                        <Input type="select" name="commissionType" id="commissionType"
                        value={buyCommissionType} onChange={e => setBuyCommissionType(e.currentTarget.value)}>
                          <option>USD</option>
                          <option>BTC</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Commission
                        </label>
                        <Input placeholder={buyCommission} disabled />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Assign Trader</label>
                        <Input type="select" name="transactionType" id="transactionType"
                        value={buyTrader} onChange={e => setBuyTrader(e.currentTarget.value)}>
                          <option key="trader-1" value="trader-1">Rick Carney</option>
                          <option key="trader-2" value="trader-2">Bill Keane</option>
                          <option key="trader-3" value="trader-3">Stuart Foley</option>
                          <option key="trader-4" value="trader-4">Manohar Gaspar</option>
                        </Input>
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
                            step={1}
                            marks
                            min={0}
                            max={30}
                            valueLabelDisplay="on"
                            color="success"
                            // onChange={handleBuyChange}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        color="success"
                        type="submit"
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
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Commission Type</label>
                        <Input type="select" name="commissionType" id="commissionType"
                        value={sellCommissionType} onChange={e => setSellCommissionType(e.currentTarget.value)}>
                          <option>USD</option>
                          <option>BTC</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Commission
                        </label>
                        <Input placeholder={sellCommission} disabled />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Assign Trader</label>
                        <Input type="select" name="transactionType" id="transactionType" 
                        value={sellTrader} onChange={e => setSellTrader(e.currentTarget.value)}>
                          <option key="trader-1" value="trader-1">Rick Carney</option>
                          <option key="trader-2" value="trader-2">Bill Keane</option>
                          <option key="trader-3" value="trader-3">Stuart Foley</option>
                        </Input>
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
                          step={1}
                          marks
                          min={0}
                          max={30}
                          valueLabelDisplay="on"
                          color="error"
                          // onChange={handleBuyChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        color="danger"
                        type="submit"
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
