import Button from "react-bootstrap/Button";
import {useState} from "react";

function Login() {
    const [logged,setLogged] = useState(false)

    const toggleLogging = () => {
        console.log("Logging is not implemented yet")
        setLogged(!logged)
    }

    return (
        <Button variant={logged? "outline-danger":"outline-primary"} onClick={()=> toggleLogging()}>
            {logged
                ? "Odhlásit"
                : "Přihlásit"
            }
        </Button>
    )
}

export default Login