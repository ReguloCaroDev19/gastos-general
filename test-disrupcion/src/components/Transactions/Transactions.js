import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";
import { Container } from "react-bootstrap";

export const Transactions = () => {
  return (
    <Container className="transactions-container p-0">
      <TransactionList />
      <AddTransaction />
    </Container>
  );
};
