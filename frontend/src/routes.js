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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import NewTransaction from "views/NewTransaction.js"
import UserPage from "views/User.js";
import Clients from "views/Clients.js"
import Manager from "./views/Manager";
import Trader_Approve from "./views/Trader_Approve";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-bar-32",
    component: Dashboard,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false
  },
  {
    path: "/transactions",
    name: "My Transactions",
    icon: "nc-icon nc-bank",
    component: TableList,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false
  },
  {
    path: "/all-transactions",
    name: "All Transactions",
    icon: "nc-icon nc-bullet-list-67",
    component: Manager,
    layout: "/admin",
    traderOnly: false,
    managerOnly: true
  },
  {
    path: "/tables",
    name: "New Transaction",
    icon: "nc-icon nc-cart-simple",
    component: NewTransaction,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "nc-icon nc-globe",
    component: Clients,
    layout: "/admin",
    traderOnly: true,
    managerOnly: false
  },
  {
    path: "/approve-transactions",
    name: "Approve Transactions",
    icon: "nc-icon nc-globe",
    component: Trader_Approve,
    layout: "/admin",
    traderOnly: true,
    managerOnly: false
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false
  },
];
export default routes;
