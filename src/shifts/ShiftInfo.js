import TimeInput from "./TimeInput";
import ShiftType from "./ShiftType";
import Col from "react-bootstrap/Col";
import useLockShifts from "../hooks/useLockShifts";

export default function ShiftInfo({info, onTimeChange, onTypeChange}) {


    const handleTimeChange = (e) => {
        let time = e.target.value
        switch (e.target.id) {
            case "start":
                onTimeChange(time, undefined)
                break
            case "end":
                onTimeChange(undefined, time)
                break
            default:
                throw new Error("Invalid ID(" + e.target.id + ") of" +
                    " time input.")
        }
    }

    return (
        <>
            <Col xs={12} sm={"auto"} className={"font-weight-bold"}>
                {info.day}
            </Col>
            <Col xs={12} sm={"auto"}>
                <TimeInput
                    id={"start"}
                    time={info.start}
                    onChange={handleTimeChange}
                />
            </Col>
            <Col xs={12} sm={"auto"}>
                <TimeInput
                    id={"end"}
                    time={info.end}
                    onChange={handleTimeChange}
                />
            </Col>
            <Col xs={12} sm={"auto"}>
                <ShiftType
                    options={info.types}
                    onChange={onTypeChange}
                    selectedValue={info.type}
                />
            </Col>
        </>
    )
}
