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
import axios from 'axios';
import { connect } from "react-redux"
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

axios.defaults.withCredentials = true;

function Dashboard(props) {

  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [currency, setCurrency] = useState(null);
  //const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [series, setSeries] = useState(null);
  const [btcBal, setBtcBal] = useState("");
  const [usdBal, setUsdBal] = useState("");
  const [status, setStatus] = useState("");
  const [isClient, setIsClient] = useState(true);

  const getUserData = () => {
    axios.get('http://localhost:5000/users/' + props.userID)
      .then(response => {
        if (response.data.isClient) {
          setBtcBal(response.data.btcBalance.toString());
          setUsdBal(response.data.fiatBalance.toString());
          setStatus(response.data.classification.toString());
        }else{
          setIsClient(false);
        }
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getUserData();
    async function fetchPrices() {
      const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      const data = await res.json();
      setCurrency(data.bpi.USD.code);
      setPriceData(data.bpi);
      getChartData();
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

  if (!isClient){
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
                    <Col md="2" xs="4">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="10" xs="8">
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
          </Row>
          <Row> 
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
  }else{
    return (
      <>
        <div className="content">
        {((btcBal === undefined)||(usdBal === undefined)||(status === undefined)||loading) ? (
          <div>
          </div>
        ) : (
            <>
              <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="2" xs="4">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="10" xs="8">
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
                    <Col md="2" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bold text-success" />
                      </div>
                    </Col>
                    <Col md="10" xs="7">
                      <div className="numbers">
                        <p className="card-category">BTC Balance</p>
                        <CardTitle tag="p">&#8383; {btcBal}</CardTitle>
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
                    <Col md="2" xs="5">
                      <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="10" xs="7">
                      <div className="numbers">
                        <p className="card-category">USD Balance</p>
                        <CardTitle tag="p">${(usdBal).substring(0, 2)}{(usdBal).substring(2, 8)}</CardTitle>
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
                        <CardTitle tag="p">{(status).charAt(0).toUpperCase()}{(status).slice(1)}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            
          </Row>
  
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">BTC Price Over Time</CardTitle>
                  <p className="card-category">Past Month</p>
                </CardHeader>
                <CardBody>
  
                <div>
                <Chart
                  options={chartData}
                  series={series}
                  type="line"
                  height="400"
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
}

const mapStateToProps = state => {
  return {
    userID: state.user.userId,
  }
}

export default connect(mapStateToProps,null)(Dashboard);
