import Navbar from "react-bootstrap/Navbar";
import Info from "./shifts/Info";
import Login from "./shifts/Login";
import traverson from "traverson-promise";
import JsonHalAdapter from "traverson-hal";
import {useState} from "react";
import Shifts from "./shifts/Shifts";
import useEmployees from "./hooks/useEmployees";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter)

export default function App() {

    const url = "http://localhost:8080/api/v1"
    const [date, setDate] = useState(new Date())
    const {
        data: users,
        isError: isErrorUsers,
        isSuccess: isSuccessUsers,
        error
    } = useEmployees(url);

    const handleDateChange = (newDate) => setDate(newDate)

    const shiftsComponent = (
        <Shifts
            user={isSuccessUsers && users[0]}
            date={date}
        />
    )

    return (
        <>
            <Navbar bg={"light"} variant={"dark"}>
                <Info date={date}
                      user={isSuccessUsers ? users[0] : {}}
                      onDateChange={handleDateChange}
                />

                <Login/>
            </Navbar>
            {(isErrorUsers) &&
            <ErrorMessage title={"Objevila se chyba"}
                          message={"Při načítání uživatelů se vyskytla chyba! Zkuste aktualizovat stránku." +
                          error?.doc?.message}
                          variant={"danger"}
            />}
            {isSuccessUsers ? shiftsComponent : <LoadingSpinner text={"Načítám uživatele ..."} variant={"primary"}/>}
        </>
    )
}
