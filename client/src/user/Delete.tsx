import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import { useNavigate } from "react-router-dom";
import { logOut } from "../service/auth.service";
import { remove } from "../service/user.service";

interface Props {
  id: string;
}

export function DeleteUser(props: Props)
{
    const navigate = useNavigate();
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

      logOut();
      navigate("/login");
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
      <Form onSubmit={handleOnSubmit}>
        <div className="d-grid">
          <Button variant="secondary" onClick={showModal}>
            Obrisi
          </Button>
        </div>
        <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Brisanje korisnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste sigurni da zelite da obrisete korisnika? Kasnije promene nece biti dostupne</Modal.Body>
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
    );
}