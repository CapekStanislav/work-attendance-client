import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Login({onSubmit}) {
    return (
        <Container fluid >
            <Row className={"m-5"} >
                <Col className={"text-center"}>
                    <h1>Docházkový systém - přihlášení</h1>
                </Col>
            </Row>
            <Row className={"justify-content-center"}>
                <Col sm={8} md={6} xl={4} >
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formUserName">
                            <Form.Label>Uživatelské jméno:</Form.Label>
                            <Form.Control required type="text" placeholder="Vložte uživatelské jméno"/>
                        </Form.Group>
                        <Form.Group controlId="formUserPassword">
                            <Form.Label>Heslo:</Form.Label>
                            <Form.Control required type="password" placeholder="heslo"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Přihlásit
                        </Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    );
}