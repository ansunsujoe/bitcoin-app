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
import React, { useEffect, useState } from "react";
import axios from 'axios';

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
  Table
} from "reactstrap";



function Clients(props) {

  const [clientsList, setClientsList] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    getClientsListAll();
    setSearchToggle(false);
  }, []);

  const getClientsListAll = () => {
    axios.get('http://localhost:5000/users/clients/all')
      .then(response => {
        setClientsList(response.data.results);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setSearchToggle(true);

  }

  const resetSearchToggle = () => {
    setSearchToggle(false);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Form >
                  <Row>
                    <Col className="px-3" md="8">
                      <FormGroup>
                        <label>Search Name, Address, Email or Cell Number:</label>
                        <Input
                          //value={transferAmount}
                          type="text"
                          defaultValue=""
                          onChange={handleSearchChange}
                        />
                        <Button color="danger" type="reset" size="sm" disabled={false}
                          onClick={() => resetSearchToggle()}>RESET</Button>
                      </FormGroup>
                    </Col>
                    {/* <Col className="px-3" md="74">
                      <FormGroup>
                      <label></label>
                      <Button color="danger" type="reset" size="sm" disabled={false}
                          onClick={() => resetSearchToggle()}>RESET</Button>
                      </FormGroup>
                    </Col> */}
                  </Row>

                  <Row>
                    <Col md="12">
                      <Card>
                        <CardHeader>
                          <CardTitle tag="h4">Clients</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <Table responsive>
                            <thead className="text-primary">
                              <tr className="text-danger">
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Cell</th>
                              </tr>
                            </thead>
                            <tbody>
                              {clientsList.map((t) => (searchToggle ? (
                                (t.name.toLowerCase().indexOf(searchQuery.toLowerCase())!=-1 ||
                                  t.address.toLowerCase().indexOf(searchQuery.toLowerCase())!=-1 ||
                                  t.email.toLowerCase().indexOf(searchQuery.toLowerCase())!=-1 ||
                                  t.cell.replaceAll('-','').indexOf(searchQuery)!=-1) &&
                                <tr>
                                  <td>{t.name}</td>
                                  <td>{t.address}</td>
                                  <td>{t.email}</td>
                                  <td>{t.cell}</td>
                                </tr>
                              ) : (
                                <tr>
                                  <td>{t.name}</td>
                                  <td>{t.address}</td>
                                  <td>{t.email}</td>
                                  <td>{t.cell}</td>
                                </tr>
                              )))}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
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

export default Clients;
