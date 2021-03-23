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
            <Col>
                Toto je info o uživateli {user?.firstName} {user?.lastName}
                <input
                    className={"ml-3"}
                    type={"month"}
                    value={dateString}
                    onChange={(e) => convertToDate(e)}
                />

            </Col>
            <Col>
                {
                    isFetching ?
                        (
                            <Spinner animation={"grow"} role="status" variant={"dark"}>
                                <span className={"sr-only"}>{"Loading from server..."}</span>
                            </Spinner>
                        )
                        : ""
                }
            </Col>
        </>
    )
}

export default Info