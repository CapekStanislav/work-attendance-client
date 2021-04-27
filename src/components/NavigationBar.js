import DatePicker from "./DatePicker";
import LoginButton from "../login/LoginButton";
import Navbar from "react-bootstrap/Navbar";
import Locker from "./Locker";
import {Nav} from "react-bootstrap";

export default function NavigationBar({user, date, onDateChange}) {
    return (
        <Navbar bg={"light"} variant={"dark"} className={"justify-content-between"}>
            <Nav.Item>
                Přihlášený uživatel: {user?.firstName} {user?.lastName}
            </Nav.Item>
            <Nav.Item>
                <DatePicker date={date} onDateChange={onDateChange}/>
            </Nav.Item>
            <Nav.Item>
                <Locker/>
            </Nav.Item>
            <Nav.Item>
                <LoginButton/>
            </Nav.Item>
        </Navbar>
    );
}