import Spinner from "react-bootstrap/Spinner";
import {useIsFetching} from "react-query";

export default function GlobalFetchingIndicator() {
    const isFetching = useIsFetching();
    const style = {
        position: "fixed",
        top: "4rem",
        right: "0.5rem",
        fontSize: "1.5rem"
    }

    return (
        isFetching ?
            (
                <Spinner style={style} animation={"grow"} role="status" variant={"dark"}>
                    <span className={"sr-only"}>{"Loading from server..."}</span>
                </Spinner>
            )
            : ""
    );
}