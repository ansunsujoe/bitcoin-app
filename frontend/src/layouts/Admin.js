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
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

var ps;

function Dashboard(props) {
  // Different variables
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const [isTrader, setIsTrader] = React.useState(false);
  const [isManager, setIsManager] = React.useState(false);
  const mainPanel = React.useRef();
  const location = useLocation();

  // Use effect
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  // Event handlers
  const handleTraderClick = (event) => {
    setIsTrader(event.target.checked);
  }
  const handleManagerClick = (event) => {
    setIsManager(event.target.checked);
  }

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        isTrader={isTrader}
        isManager={isManager}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                key={key}
                render={() => <prop.component isTrader={isTrader} 
                handleTraderClick={handleTraderClick}
                isManager={isManager} 
                handleManagerClick={handleManagerClick} />}
              />)
          })}
        </Switch>
        <Footer fluid />
      </div>
      {/* <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */}
    </div>
  );
}

export default Dashboard;
