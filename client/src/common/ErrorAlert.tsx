import Alert from "react-bootstrap/esm/Alert";

interface Props {
    alert: string;
    onRemove: (index:number) => void;
    index: number;
}

export function ErrorAlert(props: Props)
{
    return (
        <Alert variant="danger" onClose={() => props.onRemove(props.index)} dismissible><p>{props.alert}</p></Alert>
    );
}