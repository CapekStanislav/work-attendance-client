import {useMutation, useQueryClient} from "react-query";

const LOG_KEY = "loggingStatusKey";

export default function useMutateLogging() {
    const client = useQueryClient();

    // function to get logging status
    const setLoggingStatus = (status) => {
        const storage = window.sessionStorage;
        storage.setItem(LOG_KEY, status);
        client.setQueryData(LOG_KEY, status);
    }

    return useMutation(setLoggingStatus);
}