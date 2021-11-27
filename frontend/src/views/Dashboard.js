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
import { React, useState, useEffect } from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import Chart from "react-apexcharts";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";
import axios from 'axios';

function Dashboard(props) {

  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [series, setSeries] = useState(null);

  // Get User Information
  axios.defaults.withCredentials = true;

  const getUserData = () => {
    axios.get('http://localhost:5000/users/clients/' + props.userId)
      .then(response => {
        console.log(response.data);
        setUserData(response.data.json());
      }).catch(error => {
        console.log(error);
      })
  }

  const options = [
    { value: 'USD', text: 'USD' },
    { value: 'EUR', text: 'EUR' },
    { value: 'GBP', text: 'GPB' }
  ];

  useEffect(() => {
    async function fetchPrices() {
      const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      const data = await res.json();
      setCurrency(data.bpi.USD.code);
      setPriceData(data.bpi);
      //setLoading(false);
      getChartData();
      getUserData();
    }
    fetchPrices();
  }, []);

  const getChartData = async () => {
    const res = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?`)
    const data = await res.json();
    const categories = Object.keys(data.bpi);
    const series = Object.values(data.bpi);
    setChartData({
      xaxis: {
        categories: categories
      }
    })
    setSeries([
      {
        name: "Bitcoin Price",
        data: series
      }
    ])
    setLoading(false);
  }

//testing
  console.log(userData);
  //console.log(userData['btcBalance']);

  return (
    <>
      <div className="content">
      {loading ? (
        <div>
        </div>
      ) : (
          <>
            <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="3" xs="4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="9" xs="8">
                    <div className="numbers">
                      <p className="card-category">BTC to USD</p>
                      <CardTitle>${(priceData[currency].rate).substring(0, 9)} </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-bold text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">BTC Balance</p>
                      <CardTitle tag="p">${(userData.btcBalance).substring(0, 9)}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">USD Balance</p>
                      <CardTitle tag="p">${(userData.fiatBalance).substring(0, 9)}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Account Status</p>
                      <CardTitle tag="p">{(userData.classification)}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Total Account Balance</CardTitle>
                <p className="card-category">Yearly performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">BTC Price Over Time</CardTitle>
                <p className="card-category">Past Month</p>
              </CardHeader>
              <CardBody>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Chart
                options={chartData}
                series={series}
                type="line"
                width="1100"
                height="300"
              />
            </div>

              </CardBody>
            </Card>
          </Col>
        </Row>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
