import {useQuery} from "react-query";

const LOG_KEY = "loggingStatusKey";
export default function useLogging() {

    const getLoggingStatus = () => {
        // get browser storage
        let storage = window.sessionStorage;
        // get item by key
        const status = storage.getItem(LOG_KEY);

        // if item not exists = is not logged
        if (!status) {
            return false;
        }

        // only two valid values
        switch (status) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                return false;

        }
    }

    return useQuery(LOG_KEY, getLoggingStatus)
}
