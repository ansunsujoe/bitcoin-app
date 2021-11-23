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
import React from "react";

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

function NewTransaction(props) {
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
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Commission Type</label>
                        <Input type="select" name="transactionType" id="transactionType">
                          <option>USD</option>
                          <option>BTC</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Commission
                        </label>
                        <Input placeholder="Commission" disabled />
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
                        Submit Transaction
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
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Commission Type</label>
                        <Input type="select" name="transactionType" id="transactionType">
                          <option>USD</option>
                          <option>BTC</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Commission
                        </label>
                        <Input placeholder="Commission" disabled />
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
                        Submit Transaction
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
