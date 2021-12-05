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
import TableList from "views/Tables.js";
import NewTransaction from "views/NewTransaction.js"
import UserPage from "views/User.js";
import Clients from "views/Clients.js"
import Manager from "./views/Manager";
import Trader_Approve from "./views/Trader_Approve";
import NewTransfer from "views/NewTransfer";
import ClientTransaction from "./views/ClientTransaction"

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-bar-32",
    component: Dashboard,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false,
    clientOnly: false
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false,
    clientOnly: false
  },
  {
    path: "/transactions",
    name: "My Transactions",
    icon: "nc-icon nc-bank",
    component: TableList,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false,
    clientOnly: false
  },
  {
    path: "/all-transactions",
    name: "All Transactions",
    icon: "nc-icon nc-bullet-list-67",
    component: Manager,
    layout: "/admin",
    traderOnly: false,
    managerOnly: true,
    clientOnly: false
  },
  {
    path: "/new-transaction",
    name: "New Transaction",
    icon: "nc-icon nc-credit-card",
    component: NewTransaction,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false,
    clientOnly: true
  },
  {
    path: "/new-client-transaction",
    name: "Client Transaction",
    icon: "nc-icon nc-money-coins",
    component: ClientTransaction,
    layout: "/admin",
    traderOnly: true,
    managerOnly: false,
    clientOnly: false
  },
  {
    path: "/new-transfer",
    name: "New Transfer",
    icon: "nc-icon nc-cart-simple",
    component: NewTransfer,
    layout: "/admin",
    traderOnly: false,
    managerOnly: false,
    clientOnly: true
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "nc-icon nc-globe",
    component: Clients,
    layout: "/admin",
    traderOnly: true,
    managerOnly: false,
    clientOnly: false
  },
  {
    path: "/approve-transfers",
    name: "Approve Transfers",
    icon: "nc-icon nc-check-2",
    component: Trader_Approve,
    layout: "/admin",
    traderOnly: true,
    managerOnly: false,
    clientOnly: false
  }
];
export default routes;
