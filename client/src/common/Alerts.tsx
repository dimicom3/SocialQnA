import { useEffect, useState } from "react";
import Alert from "react-bootstrap/esm/Alert";
import { ErrorAlert } from "./ErrorAlert";


interface Props {
    alerts: string[];
}
export function Alerts(props: Props)
{
    const [alerts, setAlerts] = useState([] as string[]);
    useEffect(() => {
        setAlerts(props.alerts);
    }, [props.alerts])
    const alertsElements: JSX.Element[] = [];

    function closeAlert(index: number)
    {
        setAlerts(alerts.filter((_, i) => i !== index));
    }

    alerts.forEach((alert, index) => alertsElements.push(<ErrorAlert index={index} onRemove={closeAlert} key={index} alert={alert}/>))
    
    return (
        <div>
            {alertsElements}
        </div>
    );
}