import React from 'react'

import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import { remove } from "../service/comment.service";



interface Props {
    id: string;
    OnRemove?: () => void;
}
function DeleteComment(props: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleOnSubmit()
    {
      if(!props.id) return;

      const result = await remove(props.id);

      if(!result.success)
      {
        alert("Something goes wrong. Please try again");
        return;
      }
      if(props.OnRemove)
      {
        setIsModalOpen(false);
        props.OnRemove();
      }
      
    }

    function showModal()
    {
      setIsModalOpen(true);
    }

    function handleClose()
    {
      setIsModalOpen(false);
    }



  return (
    <Form onSubmit={handleOnSubmit} className="d-flex">
    <div className="d-grid">
      <Button variant="transparent" onClick={showModal}>
        <i className="fa fa-trash text-danger"></i>
      </Button>
    </div>
    <Modal show={isModalOpen} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Brisanje komentara</Modal.Title>
    </Modal.Header>
    <Modal.Body>Da li ste sigurni da zelite da obrisete komentar? Kasnije promene nece biti dostupne</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Otkazi
        </Button>
        <Button variant="danger" type="submit" onClick={handleOnSubmit}>
        Obrisi
        </Button>
    </Modal.Footer>
    </Modal>
  </Form>
  )
}

export default DeleteComment







