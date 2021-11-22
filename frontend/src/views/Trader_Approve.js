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
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Trader_Approve(props) {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">BTC Buys</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    {props.isTrader ? (
                      <tr className="text-success">
                        <th>Time</th>
                        <th>Client</th>
                        <th>Commission</th>
                        <th>Status</th>
                        <th className="text-right">Value</th>
                        <th className="text-right">Complete</th>
                        <th className="text-right">Cancel</th>
                      </tr>
                      ) : (
                        <tr className="text-success">
                          <th>Time</th>
                          <th>Client</th>
                          <th>Commission</th>
                          <th>Status</th>
                          <th className="text-right">Value</th>
                        </tr>
                      )
                    }
                    
                  </thead>
                  <tbody>
                    {transactionData.map((t) => (
                      props.isTrader ? (
                      <tr>
                        <td>{t.time}</td>
                        <td>{t.client}</td>
                        <td>{t.commission}</td>
                        <td>{t.status}</td>
                        <td className="text-right">{t.value} &#8383;</td>
                        <td className="text-right"><Button color="success" type="submit" size="sm" disabled={t.status === "Complete"}>Complete</Button></td>
                        <td className="text-right"><Button color="success" type="submit" size="sm" disabled={t.status === "Complete"}>Cancel</Button></td>
                      </tr>
                      ) : (
                        <tr>
                          <td>{t.time}</td>
                          <td>{t.client}</td>
                          <td>{t.commission}</td>
                          <td>{t.status}</td>
                          <td className="text-right">{t.value} &#8383;</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">BTC Sells</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                  {props.isTrader ? (
                      <tr className="text-danger">
                        <th>Time</th>
                        <th>Client</th>
                        <th>Commission</th>
                        <th>Status</th>
                        <th className="text-right">Value</th>
                        <th className="text-right">Complete</th>
                        <th className="text-right">Cancel</th>
                      </tr>
                      ) : (
                        <tr className="text-danger">
                          <th>Time</th>
                          <th>Client</th>
                          <th>Commission</th>
                          <th>Status</th>
                          <th className="text-right">Value</th>
                        </tr>
                      )
                    }
                  </thead>
                  <tbody>
                    {transactionData.map((t) => (
                      props.isTrader ? (
                      <tr>
                        <td>{t.time}</td>
                        <td>{t.client}</td>
                        <td>{t.commission}</td>
                        <td>{t.status}</td>
                        <td className="text-right">{t.value} &#8383;</td>
                        <td className="text-right"><Button color="danger" type="submit" size="sm" disabled={t.status === "Complete"}>Complete</Button></td>
                        <td className="text-right"><Button color="danger" type="submit" size="sm" disabled={t.status === "Complete"}>Cancel</Button></td>
                      </tr>
                      ) : (
                        <tr>
                          <td>{t.time}</td>
                          <td>{t.client}</td>
                          <td>{t.commission}</td>
                          <td>{t.status}</td>
                          <td className="text-right">{t.value} &#8383;</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Trader;
