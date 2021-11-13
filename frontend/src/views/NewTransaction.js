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

function NewTransaction(props) {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Transaction Form</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-3" md="12">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input type="select" name="transactionType" id="transactionType">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Transaction Type</label>
                        <Input type="select" name="transactionType" id="transactionType">
                          <option>Buy</option>
                          <option>Sell</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Commission Type</label>
                        <Input type="select" name="transactionType" id="transactionType">
                          <option>USD</option>
                          <option>BTC</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
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
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>State</label>
                        <Input
                          defaultValue="Texas"
                          placeholder="State"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        color="info"
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
