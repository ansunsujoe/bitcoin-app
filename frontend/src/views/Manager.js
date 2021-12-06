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
    const [dailyTransactions, setDailyTransactions] = useState(-1);
    const [weeklyTransactions, setWeeklyTransactions] = useState(-1);
    const [monthlyTransactions, setMonthlyTransactions] = useState(-1);

    const convertDateToString = (date) => {
        return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getTransactions(convertDateToString(startDate), convertDateToString(endDate));
        let startDateCopy = new Date(new Date(startDate).setDate(startDate.getDate() + 1));
        getDailyTransactions(convertDateToString(startDate), convertDateToString(startDateCopy));
        startDateCopy = new Date(new Date(startDate).setDate(startDate.getDate() + 7));
        getWeeklyTransactions(convertDateToString(startDate), convertDateToString(startDateCopy));
        startDateCopy = new Date(new Date(startDate).setDate(startDate.getDate() + 30));
        getMonthlyTranactions(convertDateToString(startDate), convertDateToString(startDateCopy));
        setShouldRedirect(!shouldRedirect);
    };

    const sumTransactions = (transactions) => {
        let sum = 0;
        transactions.forEach(transaction => {
            sum += parseFloat(transaction.value);
        });
        return sum;
    };

    const getTransactions = async (startDatetime, endDatetime) => {
        axios.get('http://localhost:5000/transactions/' + startDatetime + '/' + endDatetime).then(response => {
            setTransactions(response.data.results);
        }).catch(error => {
            console.log(error);
        })
    }

    const getDailyTransactions = (startDatetime, endDatetime) => {
        axios.get('http://localhost:5000/transactions/' + startDatetime + '/' + endDatetime).then(response => {
            setDailyTransactions(sumTransactions(response.data.results));
        }).catch(error => {
            console.log(error);
        })
    }

    const getWeeklyTransactions = (startDatetime, endDatetime) => {
        axios.get('http://localhost:5000/transactions/' + startDatetime + '/' + endDatetime).then(response => {
            setWeeklyTransactions(sumTransactions(response.data.results));
        }).catch(error => {
            console.log(error);
        })
    }

    const getMonthlyTranactions = (startDatetime, endDatetime) => {
        axios.get('http://localhost:5000/transactions/' + startDatetime + '/' + endDatetime).then(response => {
            setMonthlyTransactions(sumTransactions(response.data.results));
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
                        <Row>
                            <Col lg="3" md="6" sm="6">
                                <Card className="card-stats">
                                    <CardBody>
                                        <div className="numbers">
                                            <p className="card-category">Total for Day of {(startDate.toLocaleDateString())}</p>
                                            <CardTitle tag="p">&#8383; {(dailyTransactions)}</CardTitle>
                                            <p/>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="3" md="6" sm="6">
                                <Card className="card-stats">
                                    <CardBody>
                                        <div className="numbers">
                                            <p className="card-category">Total for Week of {(startDate.toLocaleDateString())}</p>
                                            <CardTitle tag="p">&#8383; {(weeklyTransactions)}</CardTitle>
                                            <p/>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="3" md="6" sm="6">
                                <Card className="card-stats">
                                    <CardBody>
                                        <div className="numbers">
                                            <p className="card-category">Total for Month of {(startDate.toLocaleDateString())}</p>
                                            <CardTitle tag="p">&#8383; {(monthlyTransactions)}</CardTitle>
                                            <p/>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Transactions</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Client</th>
                                        <th>Commission</th>
                                        <th>Status</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.time}</td>
                                            <td>{transaction.client}</td>
                                            <td>{transaction.commission}</td>
                                            <td>{transaction.status}</td>
                                            <td>{transaction.value}</td>
                                        </tr>
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
