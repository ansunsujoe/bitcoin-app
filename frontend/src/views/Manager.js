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
import React, {useState} from "react";
import {transactionData} from "variables/sampleData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col, CardFooter, Form,
} from "reactstrap";
import {Line} from "react-chartjs-2";
import {dashboard24HoursPerformanceChart} from "../variables/charts";

function Manager(props) {
    const [startDate, handleStartDateChange] = useState(new Date());
    const [endDate, handleEndDateChange] = useState(new Date());

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(startDate + " " + endDate);
        setShouldRedirect(!shouldRedirect);
    };

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Search</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <div className="d-flex justify-content-center">
                                        <Row>
                                            <Col tag="h6">
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleStartDateChange}
                                                    showTimeSelect
                                                    dateFormat="Pp"
                                                />
                                            </Col>
                                            <p> to </p>
                                            <Col tag="h6">
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={handleEndDateChange}
                                                    showTimeSelect
                                                    dateFormat="Pp"
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                color="info"
                                                type="submit"
                                            >
                                                Get Data For Selected Rangesas
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Users Behavior</CardTitle>
                                <p className="card-category">24 Hours performance</p>
                            </CardHeader>
                            <CardBody>
                                <Line
                                    data={dashboard24HoursPerformanceChart.data}
                                    options={dashboard24HoursPerformanceChart.options}
                                    width={400}
                                    height={100}
                                />
                            </CardBody>
                            <CardFooter>
                                <hr/>
                                <div className="stats">
                                    <i className="fa fa-history"/> Updated 3 minutes ago
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">All Transactions</CardTitle>
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
                                                <td className="text-right"><Button color="success" type="submit"
                                                                                   size="sm"
                                                                                   disabled={t.status === "Complete"}>Complete</Button>
                                                </td>
                                                <td className="text-right"><Button color="success" type="submit"
                                                                                   size="sm"
                                                                                   disabled={t.status === "Complete"}>Cancel</Button>
                                                </td>
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

export default Manager;
