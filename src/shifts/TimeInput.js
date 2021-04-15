import {useEffect, useState} from "react";
import useLockShifts from "../hooks/useLockShifts";

export default function TimeInput({id, time: initTime, onChange}) {
    const [time, setTime] = useState(initTime);
    const {data: locked} = useLockShifts();
    const stepInSeconds = 900

    const showLockMessage = () => alert("Docházka je uzamčena a nelze jí editovat.");


    useEffect(() => setTime(initTime), [initTime])

    const handleTimeChange = (e) => {
        if (locked) {
            showLockMessage();
            return;
        }
        const value = e.target.value
        setTime(value)
        onChange(e)
    }
    return (
        <input
            id={id}
            type={"time"}
            value={time}
            step={stepInSeconds}
            onChange={handleTimeChange}
        />
    )
}
