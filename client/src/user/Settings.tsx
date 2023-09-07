import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { Alerts } from "../common/Alerts";
import { update } from "../service/user.service";
import { getFormData } from "../utils/form.helper";
import { get } from "../service/user.service";
import { DeleteUser } from "./Delete";

interface Props {
  auth?: any;
}

export function Settings(props: Props)
{
    const [alerts, setAlerts] = useState([] as string[]);
    const [user, setUser] = useState({username: "", password: ""} as any);

    async function handleOnSubmit(e: any)
    {
        e.preventDefault();

        const formDataObj = getFormData(e.target);

        const data = await update({
            id: props.auth.id,
            username: user.username as string,
            password: formDataObj.password as string || undefined
        })

        if(!data.success) {
            setAlerts(data.error.issues.map((issue: { message: any; }) => issue.message));
            return;
        }
    }

    function handleChange(e: any)
    {
      const {name, value} = e.target;

      setUser({
        ...user,
        [name]: value
      });
    }

    async function getUserInfo()
    {
      if(!props.auth.id) return;

      const result = await get(props.auth.id);

      if(!result.success) {
        const errors = result.error.issues || [{message: result.error.message}];
        setAlerts(errors.map((issue: { message: any; }) => issue.message));
        return;
      }

      setUser(result.data);
    }

    useEffect(() => {
      getUserInfo();
    }, [props.auth]);

    return (
        <div>
          <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <div className="border border-3 border-danger"></div>
                <Card className="shadow">
                  <Alerts alerts={alerts} />
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2 ">SocialQnA</h2>
                      <p className=" mb-5">
                        Izmenite svoje podatke
                      </p>
                      <div className="mb-3">
                        <Form onSubmit={handleOnSubmit}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicUsername"
                          >
                            <Form.Label className="text-center">
                              Username
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter username"
                              name="username"
                              onChange={handleChange}
                              value={user.username}
                            />
                          </Form.Group>
  
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              name="password"
                            />
                          </Form.Group>
  
                          <div className="d-grid mb-3">
                            <Button variant="danger" type="submit">
                              Izmeni
                            </Button>
                          </div>
                        </Form>

                        <DeleteUser id={props.auth.id}></DeleteUser>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
}