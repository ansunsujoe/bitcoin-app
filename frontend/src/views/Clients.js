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
import { transactionData } from "variables/sampleData";

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

function Clients(props) {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
          <Card>
              <CardBody>
                <ul className="list-unstyled team-members">
                {transactionData.map((t) => (
                                        props.isTrader ? (
                  <li>
                    <Row>
                      <Col md="7" xs="7">
                        {t.client}
                      </Col>
                      <Col  md="7" xs="7">
                        Status: 
                        <span className="text-danger">
                          <small>{t.status}</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                                        ) :(<li><span className="text-danger"><h3>Access Denied</h3></span></li>)))}
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Clients;
