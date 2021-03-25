import Button from "react-bootstrap/Button";
import {useState} from "react";
import useMutateLogging from "../hooks/useMutateLogging";

function LoginButton() {
    const {mutate: setLogged} = useMutateLogging();

    const toggleLogging = () => {
        setLogged(false)
    }

    return (
        <Button variant={"outline-danger"} onClick={() => toggleLogging()}>
           Odhlásit
        </Button>
    )
}

export default LoginButton