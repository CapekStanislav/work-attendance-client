import Col from "react-bootstrap/Col";

function SumSectionItem({description, value}) {
    return(
        <>
            <Col key={description} >{description}</Col>
            <Col>{value}</Col>
        </>
    )
}

export default SumSectionItem