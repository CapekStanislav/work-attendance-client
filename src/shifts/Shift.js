import Button from "react-bootstrap/Button";
import HoursInfo from "./HoursInfo";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import ShiftInfo from "./ShiftInfo";
import {Row, useAccordionToggle} from "react-bootstrap";
import DateTimeIsoStringBuilder from "../services/DateTimeIsoStringBuilder";
import useWeekHolidayColorSchema from "../hooks/useWeekHolidayColorSchema";
import useLockShifts from "../hooks/useLockShifts";

const CustomToggle = ({eventKey, children}) => {
    const handleOnClick = useAccordionToggle(eventKey)
    return (
        <Button
            variant={"info"}
            onClick={handleOnClick}
        >
            {children}
        </Button>
    )
}

export default function Shift({eventKey, shiftTypes, day, shift, onShiftChange}) {
    const workTime = shift.workTime
    const premiumPayments = shift.premiumPayments
    const colorSchema = useWeekHolidayColorSchema(new Date(shift.start));
    const {data: locked} = useLockShifts();

    const showLockMessage = () => alert("Docházka je uzamčena a nelze jí editovat.");

    const handleSelect = (e) => {
        if (locked) {
            showLockMessage();
            return;
        }
        let selection = e.target.value;
        if (selection === undefined || selection === "") {
            e.target.focus()
            alert("Select valid type")
            return
        }
        const changedShift = {
            ...shift,
            shiftType: selection
        }
        onShiftChange(changedShift)
    }

    const handleTimeChange = (start, end) => {
        const date = new Date(shift.start)
        const dateTimeIsoString = new DateTimeIsoStringBuilder()
            .withDate(date)
        const changedShift = {...shift}

        if (start) {
            changedShift.start = dateTimeIsoString.withTimeAsString(start).build()
        }

        if (end) {
            changedShift.end = dateTimeIsoString.withTimeAsString(end).build()
        }

        onShiftChange(changedShift)
    }

    const convertToTimeString = (time) => {
        const timeString = time.toLocaleTimeString("cs-CZ")
        const [hour] = timeString.split(":")
        const isLessThenTen = hour < 10
        return isLessThenTen ? "0" + timeString : timeString;
    }


    return (
        <Card {...colorSchema}>
            <Card.Header>
                <Row className={"justify-content-sm-center"}>
                    <ShiftInfo
                        info={
                            {
                                day: day,
                                start: convertToTimeString(new Date(shift.start)),
                                end: convertToTimeString(new Date(shift.end)),
                                types: shiftTypes.length > 0 ? shiftTypes : [shift.shiftType],
                                type: shift.shiftType
                            }
                        }
                        onTimeChange={handleTimeChange}
                        onTypeChange={handleSelect}
                    />
                    <CustomToggle eventKey={eventKey}>Detail směny</CustomToggle>
                </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>
                    <HoursInfo
                        workTime={workTime}
                        premiumPayments={premiumPayments}
                    />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}