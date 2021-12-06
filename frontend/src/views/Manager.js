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
import axios from "axios";

function Manager(props) {
    const [startDate, handleStartDateChange] = useState(new Date());
    const [endDate, handleEndDateChange] = useState(new Date());
    const [transactions, setTransactions] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const convertDateToString = (date) => {
        return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getTransactions(convertDateToString(startDate), convertDateToString(endDate));
        setShouldRedirect(!shouldRedirect);
    };

    const getTransactions = (startDatetime, endDatetime) => {
        axios.get('http://localhost:5000/transactions/' + startDatetime + '/' + endDatetime).then(response => {
            setTransactions(response.data.results);
        }).catch(error => {
            console.log(error);
        })
    }

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
                                                Get Data For Selected Ranges
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
                                <CardTitle tag="h4">All Transactions</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr className="text-success">
                                        <th>Time</th>
                                        <th>Client</th>
                                        <th>Commission</th>
                                        <th>Status</th>
                                        <th className="text-right">Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.map((t) => (
                                        (
                                            <tr key={t.tid + " " + t.name}>
                                                <td>{t.time}</td>
                                                <td>{t.name}</td>
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
