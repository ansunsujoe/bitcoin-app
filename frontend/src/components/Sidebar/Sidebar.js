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
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { connect } from "react-redux"
import { logout } from "Reducers/Users/actions";
import { useHistory } from "react-router-dom";


import logo from "logo.svg";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  const history = useHistory()

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href="https://www.creative-tim.com"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a
          href="https://github.com/ansunsujoe/bitcoin-app"
          className="simple-text logo-normal"
        >
          Bitcoin App
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return ((prop.traderOnly === props.isTrader || prop.traderOnly === false) && (prop.managerOnly === props.isManager || prop.managerOnly === false) && (prop.clientOnly === props.isClient || prop.clientOnly === false)) ? (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            ) : null
          })}
          <li onClick = {()=>{
            props.logout()
            history.push("/")
          }}>
            <div
              className="nav-link"
              activeClassName="active"
            >
              <i className="nc-icon nc-single-02" />
              <p style={{color:"rgba(255, 255, 255, 0.5)"}}>LOGOUT</p>
            </div>
          </li>
        </Nav>
      </div>
    </div>
  );
}


const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(null, mapDispatchToProps)(Sidebar);
