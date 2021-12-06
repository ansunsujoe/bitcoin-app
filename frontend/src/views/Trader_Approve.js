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

//import { transferData } from "variables/sampleTransferData";
import React, {useState, useEffect} from "react";
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

function Trader_Approve(props) {
  
  const [clientTransfers, setClientTransfers] = useState([]);
  //const [userSells, setUserSells] = useState([]);
  const [traderTransfers, setTraderTransfers] = useState([]);
  //const [traderSells, setTraderSells] = useState([]);
  //const [viewMode, setViewMode] = useState("client");
  const [userData, setUserData] = useState({});
  axios.defaults.withCredentials = true;

  // Get Trader and client Data
  useEffect(() => {
    getUserData();
    //getClientTransfers();
    getTraderTransfers();
    //getTraderSells();
    //getClientBuys();
    //getClientSells();
  }, []);

  // Get User Information
  const getUserData = () => {
    axios.get('http://localhost:5000/users/' + props.userID)
      .then(response => {
        setUserData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const getClientTransfers = () => {
    axios.get('http://localhost:5000/users/' + props.userID + '/transfers').then(response => {
      setClientTransfers(response.data.results);
    }).catch(error => {
      console.log(error);
    })
  }

  const getTraderTransfers = () => {
    axios.get('http://localhost:5000/users/traders/' + props.userID + '/transfers').then(response => {
      console.log(response.data.results);
      setTraderTransfers(response.data.results);
    }).catch(error => {
      console.log(error);
    })
  }

  const acceptTransfer = (tid) => {
    axios.put('http://localhost:5000/transfers/' + tid + '/accept').then(response => {
      getTraderTransfers();
    }).catch(error => {
      console.log(error);
    })
    console.log(tid);
  }

  const cancelTransfer = (tid) => {
    console.log(tid);
    axios.put('http://localhost:5000/transfers/' + tid).then(response => {
      getTraderTransfers();
    });
  }


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Current Transfers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                      <tr className="text-secondary">
                        <th>Time</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th className="text-right">ACCEPT</th>
                        <th className="text-right">CANCEL</th>
                      </tr>                    
                  </thead>
                  <tbody>
                    {traderTransfers.map((t) => ( !(t.status === "Cancelled") &&
                      <tr>
                        <td>{t.time}</td>
                        <td>{t.name}</td>
                        <td>{t.amount}</td>
                        <td>{t.status}</td>
                        <td className="text-right"><Button color="success" type="submit" size="sm" 
                          disabled={t.status === "Completed"} 
                          onClick={() => acceptTransfer(t.tid)}>ACCEPT</Button></td>
                        <td className="text-right"><Button color="danger" type="submit" size="sm" 
                          disabled={t.status === "Completed"} 
                          onClick={() => cancelTransfer(t.tid)}>CANCEL</Button></td>
                      </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cancelled Transfers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                      <tr className="text-danger">
                        <th>Time</th>
                        <th>Client</th>
                        <th>Amount</th>
                      </tr>                    
                  </thead>
                  <tbody>
                    {traderTransfers.map((t) => ( t.status === "Cancelled" &&
                      <tr>
                        <td>{t.time}</td>
                        <td>{t.name}</td>
                        <td>{t.amount}</td>
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

const mapStateToProps = state => {
  return {
    userID: state.user.userId,
  }
}

export default connect(mapStateToProps, null)(Trader_Approve);