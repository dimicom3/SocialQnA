import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { Alerts } from "../../common/Alerts";
import { getFormData } from "../../utils/form.helper";
import { login } from "../../service/auth.service";

export default function Login() {
  const [alerts, setAlerts] = useState([] as string[]);

  async function handleOnSubmit(e:any) {
    e.preventDefault();

    const formDataObj = getFormData(e.target);

    const data = await login({
      email: formDataObj.email as string,
      password: formDataObj.password as string
    })

    if(!data.success) {
      const errors = data.error.issues || [{message: data.error.message}];
      setAlerts(errors.map((issue: { message: string; }) => issue.message));
      return;
    }

    localStorage.setItem("token", data.data);

    window.location.href = "/";
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-danger"></div>
            <Card className="shadow">
              <Alerts alerts={alerts}></Alerts>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 ">SocialQnA</h2>
                  <p className=" mb-5">Please enter your email and password!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleOnSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email"/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password"/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="danger" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="/register" className="text-danger fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
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