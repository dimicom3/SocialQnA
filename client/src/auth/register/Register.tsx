import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import { Alerts } from "../../common/Alerts";
import { getFormData } from "../../utils/form.helper";
import { register } from "../../service/auth.service";

export function Register() {
    const [alerts, setAlerts] = useState([] as string[]);

    async function handleOnSubmit(e: any)
    {
        e.preventDefault();

        const formDataObj = getFormData(e.target);

        const data = await register({
            email: formDataObj.email as string,
            username: formDataObj.username as string,
            password: formDataObj.password as string,
            confirmPassword: formDataObj.confirmPassword as string
        })

        if(!data.success) {
            const errors = data.error.issues || [{message: data.error.message}];
            setAlerts(errors.map((issue: { message: any; }) => issue.message));
            return;
        }
    }

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
                      Please enter your email and password!
                    </p>
                    <div className="mb-3">
                      <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                          />
                        </Form.Group>

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

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicConfirmPassword"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                          />
                        </Form.Group>

                        <div className="d-grid">
                          <Button variant="danger" type="submit">
                            Sign Up
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Already have an account?{" "}
                          <a href="/login" className="text-danger fw-bold">
                            Log In
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