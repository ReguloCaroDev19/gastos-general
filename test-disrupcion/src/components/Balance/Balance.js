import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { IncomeExpenses } from "./IncomeExpenses";
import { Container } from "react-bootstrap";

import "./index.css";

const moneyFormatter = (num) => {
  let p = num.toFixed(2).split(".");
  return (
    "$" +
    (p[0].split("")[0] === "-" ? "-" : "") +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "" : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const Balance = () => {
  const { transactions, currentMonth } = useContext(GlobalContext);

  const amounts = transactions[currentMonth].map(
    (transaction) => transaction.amount
  );

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <Container className="balance rounded-4 shadow">
      <h4 className="title">Balance del mes</h4>
      <h1 className="month-balance">{moneyFormatter(total)}</h1>
      <IncomeExpenses />
      <div className="analytics ">
        <p className="m-0 p-0 h6 text-black-50">Ver analiticas</p>
        <div className="text-center m-0 p-0 h6">
          <svg xmlns="http://www.w3.org/2000/svg" height="0.625em" style={{ fill: "#d1d3d6" }} viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
        </div>
      </div>
    </Container>
  );
};
