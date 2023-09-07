import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import Community from "../community/Community";
import { CommunityDto } from "../community/community.dto";
import { getAll } from "../service/community.service";
import { create } from "../service/post.service";
import { PostDto } from "./post.dto";

interface Props {
    OnCreate?: () => void;
    Community?: CommunityDto;
}

export function CreatePost(props: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [post, setPost] = useState({title: "", text: "", communityID: ""});
    const [communities, setCommunities] = useState([]);

    async function handleOnSubmit()
    {
      if(!props.Community){
        if(!post.communityID)
        {
          alert("Izaberite zajednicu!");
          return;
        }
      }
      else{
        post.communityID = props.Community.id;
      }
      const result = await create(post as PostDto);

      if(!result.success)
      {
        alert("Something goes wrong. Please try again");
        return;
      }

      alert("Successfully added post");

      if(props.OnCreate)
      {
        setIsModalOpen(false);
        props.OnCreate();
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

    async function getCommunities()
    {
      const result = await getAll();

      if(!result.success)
      {
        return;
      }

      setCommunities(result.data.map((el: {id: string, title: string}, index: number) => <option value={el.id} key={index}>{el.title}</option>));
    }

    useEffect(() => {
      getCommunities();
    }, [])
    
    return(
        <Form onSubmit={handleOnSubmit} className="d-flex">
          <div className="d-grid">
            <Button variant="danger" onClick={showModal} className="rounded-pill">
              <span className="h5">+ Add question</span>
            </Button>
          </div>
          <Modal show={isModalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Dodaj post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!props.Community && (
            <Form.Group className="mb-3" controlId="formSelect">
                <Form.Select name="communityID" onChange={handleOnChange}>
                    <option value={0}>Community</option>
                    {communities}
                </Form.Select>
            </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label className="text-center">
                    Title
                </Form.Label>
                <Form.Control
                type="text"
                placeholder="Unesite naslov"
                value={post.title}
                name="title"
                onChange={handleOnChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
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
              Dodaj
              </Button>
          </Modal.Footer>
          </Modal>
        </Form>
    );
}