import Info from "../shifts/Info";
import LoginButton from "../login/LoginButton";
import Navbar from "react-bootstrap/Navbar";
import Locker from "./Locker";

export default function NavigationBar({user,date, onDateChange}) {

    return (
        <Navbar bg={"light"} variant={"dark"} className={"justify-content-between"}>
            <Info date={date}
                  user={user || {}}
                  onDateChange={onDateChange}
            />
            <Locker/>
            <LoginButton/>
        </Navbar>
    );
}