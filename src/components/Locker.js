import Form from "react-bootstrap/Form";
import useLockShifts from "../hooks/useLockShifts";
import Spinner from "react-bootstrap/Spinner";
import useMutateLockShifts from "../hooks/useMutateLockShifts";

export default function Locker({onChange}) {
    const {data: locked, isLoading} = useLockShifts();
    const {mutate: setLock} = useMutateLockShifts();

    const handleChange = (e) => {
        setLock(e.target.checked);
    }

    let label = "docházka uzamčena";
    const loading = (
        <Spinner animation="border" role="status" variant={"secondary"} size={"sm"}>
            <span className="sr-only">Loading...</span>

        </Spinner>
    );
    return (
        isLoading
            ? loading
            : <Form.Check checked={locked} onChange={handleChange} label={label}/>
    );
}