import Container from "react-bootstrap/Container";
import {Alert} from "react-bootstrap";

export default function ErrorMessage({title,message,variant}) {
    return (
        <Container>
            <Alert variant={variant}>
                <Alert.Heading>{title}</Alert.Heading>
                {message}
            </Alert>
        </Container>
    )
}
