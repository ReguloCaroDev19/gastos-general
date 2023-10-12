import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Button, Modal, Form } from "react-bootstrap";

export const AddTransactionModal = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(0);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const daysForMonths = [
    { dia: 1 },
    { dia: 2 },
    { dia: 3 },
    { dia: 4 },
    { dia: 5 },
    { dia: 6 },
    { dia: 7 },
    { dia: 8 },
    { dia: 9 },
    { dia: 10 },
    { dia: 11 },
    { dia: 12 },
    { dia: 13 },
    { dia: 14 },
    { dia: 15 },
    { dia: 16 },
    { dia: 17 },
    { dia: 18 },
    { dia: 19 },
    { dia: 20 },
    { dia: 21 },
    { dia: 22 },
    { dia: 23 },
    { dia: 24 },
    { dia: 25 },
    { dia: 26 },
    { dia: 27 },
    { dia: 28 },
    { dia: 29 },
    { dia: 30 },
  ];
  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const { addTransaction, currentMonth } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "" && amount.trim() === "") {
      setError("Porfavor ingresa un nombre y cantidad.");
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      date: +date,
    };

    setText("");
    setAmount(0);
    setDate(0);
    setError("");
    handleCloseModal();
    addTransaction(newTransaction, currentMonth);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="text">
              <Form.Label>Nombre del movimiento</Form.Label>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required={true}
                placeholder="Agrega un nombre a tu movimiento"
              />
            </Form.Group>

            <Form.Group controlId="amount" className="pt-2">
              <Form.Label>Cantidad del movimiento</Form.Label>
              <br />
              <Form.Text className="text-muted">
                Puedes poner un signo - para diferenciarlo de manera negativa
              </Form.Text>
              <Form.Control
                type="number"
                value={amount}
                required={true}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ingresa la cantidad del movimiento"
              />
            </Form.Group>

            <Form.Group controlId="date" className="pt-2">
              <Form.Label>Día del movimiento</Form.Label>
              <br />
              <select onChange={(e) => setDate(e.target.value)} className="form-select" aria-label="Default select example">
                {daysForMonths.map(val => <option value={val.dia} key={val.dia}>{val.dia}</option>)}
              </select>

            </Form.Group>

            {error && <div className="text-danger">{error}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="fixed-bottom">
        <Button
          onClick={handleShowModal}
          style={{
            width: "250px",
            backgroundColor: "#4a65a3",
            fontWeight: "bold",
          }}
        >
          Agregar Movimiento
        </Button>
      </div>
    </>
  );
};
