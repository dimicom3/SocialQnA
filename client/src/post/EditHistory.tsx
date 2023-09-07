import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { getEditHistory } from "../service/post.service";

interface Props {
    id: string;
}

export function PostEditHistory(props: Props)
{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [history, setHistory] = useState([] as JSX.Element[]);

    function showModal()
    {
      setIsModalOpen(true);
    }

    function handleClose()
    {
      setIsModalOpen(false);
    }

    async function editHistory()
    {
        if(!props.id) return;
        
        const result = await getEditHistory(props.id);
        
        if(!result.success)
        {
            return;
        }

        setHistory(result.data.map((el: { text: string, title: string }, index: number) => <div key={index}><h3>{el.title}</h3><p>{el.text}</p></div>));
    }

    useEffect(() => {
        editHistory();
    }, [props.id]);

    return (
      <>
        {history.length > 0 && (
            <Button variant="tranparent" onClick={showModal}>
                <i className="fa fa-history text-danger"></i>
            </Button>
        )}
        {history.length > 0 && (
            <Modal show={isModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {history}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )}
      </>
    );
}