import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import styled from "@emotion/styled";

import { DashboarPage } from "src/pages/dashboard/DashboardPage";
import { MerchantsPage } from "src/pages/merchants/MerchantsPage";
import { TransactionsPage } from "src/pages/transactions/TransactionsPage";
import { UsersPage } from "src/pages/users/UsersPage";

import { LangEnum, useLang } from "./AppContext";

/**
 * Styles
 */

const LayoutS = styled.div`
  display: grid;
  grid-row-gap: 24px;
  padding: 8px;
`;

const NavS = styled.nav`
  grid-row: 1;

  & > ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }

  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`;

const NavLinksS = styled.div`
  grid-row: 2;
`;

/**
 * Types
 */

export enum Routes {
  dashboard = "/",
  users = "/users",
  merchants = "/merchants",
  transactions = "/transactions",
}

/**
 * Components
 */

function AppRouter(): JSX.Element {
  const { lang } = useLang();

  return (
    <Router>
      <LayoutS>
        <NavS>
          <ul>
            <li>
              <Link to={Routes.dashboard}>
                {lang === LangEnum.English ? "Dashboard" : "Tablero"}
              </Link>
            </li>
            <li>
              <Link to={Routes.users}>{lang === LangEnum.English ? "Users" : "Usuarias"}</Link>
            </li>
            <li>
              <Link to={Routes.merchants}>
                {lang === LangEnum.English ? "Merchants" : "Comerciantes"}
              </Link>
            </li>
            <li>
              <Link to={Routes.transactions}>
                {lang === LangEnum.English ? "Transactions" : "Las actas"}
              </Link>
            </li>
          </ul>
        </NavS>
        <NavLinksS>
          <Route component={DashboarPage} exact path={Routes.dashboard} />
          <Route component={UsersPage} exact path={Routes.users} />
          <Route component={MerchantsPage} exact path={Routes.merchants} />
          <Route component={TransactionsPage} exact path={Routes.transactions} />
        </NavLinksS>
      </LayoutS>
    </Router>
  );
}

export default AppRouter;
