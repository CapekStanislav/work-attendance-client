import Shift from "./Shift";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ShiftsTable({types, shifts,onShiftChange}) {

    const createShifts = (shifts) => {
        const arr = []
        for (let i = 0; i < shifts.length; i++) {
            const day = i + 1;
            const shift = {...shifts[i],index:i}
            arr.push(
                <Shift
                    key={day}
                    day={day}
                    eventKey={day}
                    shiftTypes={types}
                    shift={shift}
                    onShiftChange={onShiftChange}
                />
            )
        }
        return arr
    }
    return (
        <Row className={"justify-content-center"}>
            <Col md={9} lg={7} xl={6}>
                <Accordion>
                    {createShifts(shifts)}
                </Accordion>
            </Col>
        </Row>
    )

}

export default ShiftsTable