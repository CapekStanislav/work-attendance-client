import Col from "react-bootstrap/Col";
import {useIsFetching} from "react-query";
import Spinner from "react-bootstrap/Spinner";

function Info({date, onDateChange, user}) {
    const isFetching = useIsFetching()

    const convertToDate = (e) => {
        const yearMonthString = e.target.value;
        const date = new Date(yearMonthString)
        onDateChange(date)
    }

    let dateString = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}`;
    return (
        <>
            Přihlášený uživatel: {user?.firstName} {user?.lastName}
            <input
                className={"ml-3"}
                type={"month"}
                value={dateString}
                onChange={(e) => convertToDate(e)}
            />
        </>
    )
}

export default Info