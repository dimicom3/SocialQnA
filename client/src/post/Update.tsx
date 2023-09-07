import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import { update } from "../service/post.service";
import { PostDto } from "./post.dto";

interface Props {
    post: any;
    OnUpdate?: () => void;
}

export function UpdatePost(props: Props)
{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [post, setPost] = useState({id: "", text: "", title: ""});

    async function handleOnSubmit()
    {
      if(!post.id) return;

      const result = await update(post as PostDto);

      if(!result.success)
      {
        alert("Something goes wrong. Please try again");
        return;
      }

      if(props.OnUpdate)
      {
        props.OnUpdate();
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

    function handleOnChange(e: any)
    {
        const {name, value} = e.target;

        setPost({
            ...post,
            [name]: value
        })
    }

    useEffect(() => {
        setPost(props.post);
    }, []);

    return (
        <Form onSubmit={handleOnSubmit} className="d-flex">
          <div className="d-grid">
            <Button variant="transparent" onClick={showModal}>
              <i className="fa fa-pencil text-danger"></i>
            </Button>
          </div>
          <Modal show={isModalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Brisanje posta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label className="text-center">
                    Text
                </Form.Label>
                <Form.Control
                type="title"
                placeholder="Unesite naslov"
                value={post.title}
                name="title"
                onChange={handleOnChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formText">
                <Form.Label className="text-center">
                    Text
                </Form.Label>
                <Form.Control
                as="textarea"
                type="text"
                placeholder="Unesite text"
                value={post.text}
                name="text"
                onChange={handleOnChange}
                />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              Otkazi
              </Button>
              <Button variant="danger" type="submit" onClick={handleOnSubmit}>
              Izmeni
              </Button>
          </Modal.Footer>
          </Modal>
        </Form>
    );
}