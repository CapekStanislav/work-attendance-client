import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

export default function LoadingSpinner({text,variant}) {
   return (
       <Container fluid className={"text-center mt-5"}>
           <Spinner animation="border" role="status" variant={variant}>
               <span className={"sr-only"}>{text}</span>
           </Spinner>
           <span className={`text-${variant}`}> {text}</span>
       </Container>
   )
}