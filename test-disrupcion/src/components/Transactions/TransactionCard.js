import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Container, Modal, Button } from "react-bootstrap";
import "./index.css";

//Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "$" +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === "-" ? acc : num + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const TransactionCard = ({ transaction }) => {
  const { deleteTransaction, currentMonth } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const handleDelete = () => {
    deleteTransaction(transaction.id, currentMonth);
    setShowModal(false);
  };
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const sign = transaction.amount < 0 ? "-" : "+";


  return (
    <Container className={`transaction rounded shadow mt-2 p-2 ${isAccordionOpen ? 'active' : ''}`} onClick={toggleAccordion}>
      <div className="transaction-text">
        <div className={transaction.amount < 0 ? "icon minus" : "icon plus"}></div>
        {transaction.text}

      </div>
      <div className="transaction-amount">
        {isAccordionOpen && (
          <div className="btn-group" style={{ transform: isAccordionOpen ? 'translateY(0)' : 'translateY(100%)' }}>
            {/* Botón "Eliminar" que abre el modal */}
            <button className="btn btn-danger" onClick={() => setShowModal(true)}>
              Eliminar
            </button>
          </div>
        )}
        <div
          className={
            transaction.amount < 0
              ? "transaction-amount minus px-2"
              : "transaction-amount plus px-2"
          }
        >
          {sign}
          {moneyFormatter(transaction.amount)}
        </div>
        {!isAccordionOpen && (
          <div className="mx-1">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
          </div>
        )}

        {isAccordionOpen && (
          <div className="mx-1" style={{ transform: "rotate(180deg)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se borrará el movimiento y ya no podrá estar disponible</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
