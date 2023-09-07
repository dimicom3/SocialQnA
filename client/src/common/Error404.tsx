import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

export function Error404() {
    return (
      <Container>
        <Row className="vh-100 d-flex justify-content-center mt-5 text-center">
          <Col md={8} lg={6} xs={12}>
            <h1>Page not found</h1>
          </Col>
        </Row>
      </Container>
    );
}