import React, { useContext } from "react";
import { TransactionCard } from "./TransactionCard";
import { getCurrentMonthEnEspanol } from "../../util/getCurrentDate";

import { GlobalContext } from "../../context/GlobalState";
import { Container } from "react-bootstrap";

export const TransactionList = () => {
  const { transactions, currentMonth } = useContext(GlobalContext);
  let todayTransactions = [];
  let yesterdayTransactions = [];
  let olderTransactions = [];
  let monthTransactions = [];
  if (currentMonth === getCurrentMonthEnEspanol()) {
    todayTransactions = transactions[currentMonth].filter(
      (transaction) => transaction.date === new Date().getDate()
    );

    yesterdayTransactions = transactions[currentMonth].filter(
      (transaction) => transaction.date === new Date().getDate() - 1
    );

    olderTransactions = transactions[currentMonth].filter(
      (transaction) => transaction.date < new Date().getDate() - 1
    );
  } else {
    monthTransactions = transactions[currentMonth];
  }
  function groupByDay(transactions) {
    const grouped = {};

    transactions.forEach((transaction) => {
      const day = transaction.date; // Reemplaza 'date' con el nombre del campo que contiene la fecha
      if (!grouped[day]) {
        grouped[day] = {
          day,
          transactions: [],
        };
      }
      grouped[day].transactions.push(transaction);
    });

    return Object.values(grouped);
  }
  return (
    <Container
      className="mt-2 p-0"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {monthTransactions.length > 0 ? (
        <>

          {groupByDay(monthTransactions).map((group) => (
            <div key={group.day}>
              <p className="pt-2 h6"><strong>{currentMonth} - Día {group.day}</strong></p>
              {group.transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ))}
        </>
      ) : (
        ""
      )}

      {todayTransactions.length > 0 ? (
        <>
          <b className="mt-3">
            Hoy - {new Date().getDate()} {currentMonth.slice(0, 3)}.
          </b>
          {todayTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </>
      ) : (
        ""
      )}

      {yesterdayTransactions.length > 0 ? (
        <>
          <b className="mt-3">
            Ayer - {new Date().getDate() - 1} {currentMonth.slice(0, 3)}.
          </b>
          {yesterdayTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </>
      ) : (
        ""
      )}
      {olderTransactions.length > 0 ? (
        <>
          {groupByDay(olderTransactions).map((group) => (
            <div key={group.day}>
              <p className="pt-2 h6" ><strong>Día {group.day}</strong></p>
              {group.transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </Container>
  );
};
