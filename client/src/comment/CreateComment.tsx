import React, {useEffect, useState} from 'react'
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import { create } from "../service/comment.service";
import { CommentDto } from './comment.dto';
interface Props {
    userID: string;
    postID: string | undefined;
    OnCreate?: () => void;
}
  
function CreateComment(props: Props) {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState("");

    async function handleOnSubmit()
    {
      if(!comment)
      {
        alert("Unesite tekst!");
        return;
      }

      const commentDto = {text : comment, userID: props.userID, postID: props.postID}
      const result = await create(commentDto)
      
      if(!result.success)
      {
        alert("Something goes wrong. Please try again");
        return;
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
        
        setComment(value)
    }

  return (
    <Form onSubmit={handleOnSubmit} className="d-flex">

        <div className="d-grid">
            <Button variant="danger" onClick={toggleModal} className="rounded-pill">
              <span className="h5">+ Add comment</span>
            </Button>
        </div>

        <Modal show={isModalOpen} onHide={toggleModal}>

        <Modal.Header closeButton>
            <Modal.Title>Post comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formTitle">

          <Form.Label className="text-center">
              Text:
          </Form.Label>
          <Form.Control
          type="text"
          placeholder="Unesite tekst"
          value={comment}
          name="text"
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

export default CreateComment

