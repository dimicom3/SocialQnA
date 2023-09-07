import React, {useState, useEffect} from 'react';
import { create } from "../service/community.service";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import { CommunityDto } from './community.dto';
import { followCommunity } from '../service/user.service';

interface Props {
  auth: any;
  OnCreate?: () => void;
}

function CreateCommunity(props: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [community, setCommunity] = useState({title: "", description: ""});

    async function handleOnSubmit()
    {
      if(!community.title)
      {
        alert("Unesite naslov!");
        return;
      }
      if(!community.description)
      {
        alert("Unesite opis!");
        return;
      }

      const result = await create(community as CommunityDto)
      
      if(!result.success)
      {
        alert("Something went wrong. Please try again");
        return;
      }

      alert("Successfully created community");
      if(props.auth.id)
      { 
        const newCommunity: CommunityDto = result.data;
        await followCommunity({userID: props.auth.id, communityID:newCommunity.id});
      }
      if(props.OnCreate)
      {
        setIsModalOpen(false);
        props.OnCreate();
      }

    }

    function toggleModal()
    {
      setIsModalOpen(!isModalOpen);
    }

    function handleOnChange(e: any)
    {
        const {name, value} = e.target;
        
        setCommunity({
            ...community,
            [name]: value
        })
    }

    
  return (
    <Form onSubmit={handleOnSubmit} className="d-flex">

    <div className="d-grid mb-3">
      <Button variant="outline-danger" onClick={toggleModal} className="rounded-pill">
        <span>+ Add Community</span>
      </Button>
    </div>

    <Modal show={isModalOpen} onHide={toggleModal}>

    <Modal.Header closeButton>
        <Modal.Title>Dodaj community</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form.Group className="mb-3" controlId="formTitle">

          <Form.Label className="text-center">
              Title
          </Form.Label>
          <Form.Control
          type="text"
          placeholder="Unesite naslov"
          value={community.title}
          name="title"
          onChange={handleOnChange}
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label className="text-center">
              Description
          </Form.Label>
          <Form.Control
          as="textarea"
          type="text"
          placeholder="Unesite opis"
          value={community.description}
          name="description"
          onChange={handleOnChange}
          />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
        Otkazi
        </Button>
        <Button variant="success" type="submit" onClick={handleOnSubmit}>
        Dodaj
        </Button>
    </Modal.Footer>
    </Modal>
  </Form>
  )
}

export default CreateCommunity