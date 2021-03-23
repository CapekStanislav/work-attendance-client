import {useEffect, useState} from "react";

export default function TimeInput({id, time: initTime, onChange}) {
    const [time, setTime] = useState(initTime)

    useEffect(() => setTime(initTime), [initTime])

    const handleTimeChange = (e) => {
        const value = e.target.value
        setTime(value)
        onChange(e)
    }
    return (
        <input
            id={id}
            type={"time"}
            value={time}
            onChange={handleTimeChange}
        />
    )
}
