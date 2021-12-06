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
import React, {useState, useEffect} from "react";
import { transactionData } from "variables/sampleData";
import axios from 'axios';
import { connect } from "react-redux";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables(props) {
  const [userBuys, setUserBuys] = useState([]);
  const [userSells, setUserSells] = useState([]);
  const [traderBuys, setTraderBuys] = useState([]);
  const [traderSells, setTraderSells] = useState([]);
  const [btcRate, setBtcRate] = useState(50000.0);
  const [viewMode, setViewMode] = useState("client");
  const [userData, setUserData] = useState({});
  axios.defaults.withCredentials = true;

  // Get current Bitcoin price
  const getCurrentBTC = () => {
    axios.get('http://localhost:5000/btc-rate')
      .then(response => {
        console.log(response.data);
        setBtcRate(response.data.results);
      }).catch(error => {
        console.log(error);
      })
  }

  // Get User Information
  const getUserData = () => {
    axios.get('http://localhost:5000/users/' + props.userID)
      .then(response => {
        setUserData(response.data);
        if (!response.data.isClient) {
          setViewMode("trader");
        }
        else {
          setViewMode("client");
        }
      }).catch(error => {
        console.log(error);
      })
  }

  const getClientBuys = () => {
    axios.get('http://localhost:5000/users/' + props.userID + '/transactions/buys').then(response => {
      setUserBuys(response.data.results);
    }).catch(error => {
      console.log(error);
    })
  }

  const getTraderBuys = () => {
    axios.get('http://localhost:5000/users/traders/' + props.userID + '/transactions/buys').then(response => {
      console.log(response.data.results);
      setTraderBuys(response.data.results);
    }).catch(error => {
      console.log(error);
    })
  }

  const getClientSells = () => {
    axios.get('http://localhost:5000/users/' + props.userID + '/transactions/sells').then(response => {
      setUserSells(response.data.results);
    }).catch(error => {
      console.log(error);
    })
  }

  const getTraderSells = () => {
    axios.get('http://localhost:5000/users/traders/' + props.userID + '/transactions/sells').then(response => {
      setTraderSells(response.data.results);
    }).catch(error => {
      console.log(error);
    })
  }

  // Get User Data
  useEffect(() => {
    getCurrentBTC();
    getUserData();
    getTraderBuys();
    getTraderSells();
    getClientBuys();
    getClientSells();
  }, []);

  // Get current bitcoin price every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentBTC();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const acceptTransaction = (tid, action, viewMode) => {
    const data = {
      "btcRate": btcRate 
    }
    axios.put('http://localhost:5000/transactions/' + tid + '/accept', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (viewMode === "trader") {
        if (action === "buy") {
          getTraderBuys();
        }
        else {
          getTraderSells();
        }
      }
      else {
        if (action === "buy") {
          getClientBuys();
        }
        else {
          getClientSells();
        }
      }
    }).catch(error => {
      console.log(error);
    })
    console.log(tid);
  }

  const cancelTransaction = (tid, action, viewMode) => {
    console.log(tid);
    axios.delete('http://localhost:5000/transactions/' + tid).then(response => {
      if (viewMode === "trader") {
        if (action === "buy") {
          getTraderBuys();
        }
        else {
          getTraderSells();
        }
      }
      else {
        if (action === "buy") {
          getClientBuys();
        }
        else {
          getClientSells();
        }
      }
    });
  }
  
  return (
    <>
      <div className="content">
        <Row>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md={9}>
                    <CardTitle tag="h4">BTC Buys</CardTitle>
                  </Col>
                  <Col md={3}>
                  <FormGroup>
                    <label>View Mode</label>
                    <Input type="select" name="viewMode" id="viewMode"
                    value={viewMode} onChange={e => setViewMode(e.currentTarget.value)}>
                      {userData.isClient ? (
                        <option key="client" value="client">Client</option>
                      ): null}
                      {userData.isTrader ? (
                        <option key="trader" value="trader">Trader</option>
                      ): null}
                    </Input>
                  </FormGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    {viewMode === "trader" ? (
                      <tr className="text-success">
                        <th>Time</th>
                        <th>{viewMode === "client" ? "Trader" : "Client"}</th>
                        <th>Commission</th>
                        <th>Status</th>
                        <th className="text-right">Value</th>
                        <th className="text-right">Fiat Value</th>
                        <th className="text-right">Complete</th>
                        <th className="text-right">Cancel</th>
                      </tr>
                      ) : (
                        <tr className="text-success">
                          <th>Time</th>
                          <th>{viewMode === "client" ? "Trader" : "Client"}</th>
                          <th>Commission</th>
                          <th>Status</th>
                          <th className="text-right">Value</th>
                          <th className="text-right">Fiat Value</th>
                        </tr>
                      )
                    }
                    
                  </thead>
                  <tbody>
                    {(viewMode === "trader" ? traderBuys : userBuys).map((t) => (
                      viewMode === "trader" ? (
                      <tr>
                        <td>{t.time}</td>
                        <td>{t.name}</td>
                        <td>{t.commission}</td>
                        <td>{t.status}</td>
                        <td className="text-right">{t.value} &#8383;</td>
                        <td className="text-right">${t.fiatValue}</td>
                        <td className="text-right">
                          <Button color="success" type="submit" size="sm" disabled={!t.isValid}
                          onClick={() => acceptTransaction(t.tid, "buy", viewMode)}>Complete</Button>
                        </td>
                        <td className="text-right">
                          <Button color="danger" type="submit" size="sm" disabled={false}
                          onClick={() => cancelTransaction(t.tid, "buy", viewMode)}>Cancel</Button>
                        </td>
                      </tr>
                      ) : (
                        <tr>
                          <td>{t.time}</td>
                          <td>{t.name}</td>
                          <td>{t.commission}</td>
                          <td>{t.status}</td>
                          <td className="text-right">{t.value} &#8383;</td>
                          <td className="text-right">${t.fiatValue}</td>
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
                  {viewMode === "trader" ? (
                      <tr className="text-danger">
                        <th>Time</th>
                        <th>{viewMode === "client" ? "Trader" : "Client"}</th>
                        <th>Commission</th>
                        <th>Status</th>
                        <th className="text-right">Value</th>
                        <th className="text-right">Fiat Value</th>
                        <th className="text-right">Complete</th>
                        <th className="text-right">Cancel</th>
                      </tr>
                      ) : (
                        <tr className="text-danger">
                          <th>Time</th>
                          <th>{viewMode === "client" ? "Trader" : "Client"}</th>
                          <th>Commission</th>
                          <th>Status</th>
                          <th className="text-right">Value</th>
                          <th className="text-right">Fiat Value</th>
                        </tr>
                      )
                    }
                  </thead>
                  <tbody>
                    {(viewMode === "trader" ? traderSells : userSells).map((t) => (
                      viewMode === "trader" ? (
                      <tr>
                        <td>{t.time}</td>
                        <td>{t.name}</td>
                        <td>{t.commission}</td>
                        <td>{t.status}</td>
                        <td className="text-right">{t.value} &#8383;</td>
                        <td className="text-right">${t.fiatValue}</td>
                        <td className="text-right">
                          <Button color="success" type="submit" size="sm" disabled={!t.isValid}
                          onClick={() => acceptTransaction(t.tid, "sell", viewMode)}>Complete</Button>
                        </td>
                        <td className="text-right">
                          <Button color="danger" type="submit" size="sm" disabled={false}
                          onClick={() => cancelTransaction(t.tid, "sell", viewMode)}>Cancel</Button>
                        </td>
                      </tr>
                      ) : (
                        <tr>
                          <td>{t.time}</td>
                          <td>{t.name}</td>
                          <td>{t.commission}</td>
                          <td>{t.status}</td>
                          <td className="text-right">{t.value} &#8383;</td>
                          <td className="text-right">${t.fiatValue}</td>
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

const mapStateToProps = state => {
  return {
    userID: state.user.userId,
  }
}

export default connect(mapStateToProps, null)(Tables);
