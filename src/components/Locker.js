import Form from "react-bootstrap/Form";
import useLockShifts from "../hooks/useLockShifts";
import Spinner from "react-bootstrap/Spinner";
import useMutateLockShifts from "../hooks/useMutateLockShifts";

export default function Locker() {
    const {data: locked} = useLockShifts();
    const {mutate: setLock, isLoading} = useMutateLockShifts();

    const handleChange = (e) => setLock(e.target.checked);

    let label = "docházka uzamčena";
    const loading = (
        <>
            <Spinner animation="border" role="status" variant={"secondary"} size={"sm"}>
                <span className="sr-only">Loading...</span>
            </Spinner>
            {" " + label}
        </>

    );
    const checkInput = (<Form.Check checked={locked} onChange={handleChange} label={label}/>);
    return isLoading ? loading : checkInput;
}