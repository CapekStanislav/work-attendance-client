import {useQueryClient} from "react-query";
import {useState} from "react";

export default function useMutateDate(date) {
    const client = useQueryClient();
    const [d, setD] = useState(date);

    const mutate = (date) => {
        if (date instanceof Date) {
            client.setQueryData(["date"], date)
            setD(date);
        } else {
            throw new Error("Parameter is not instance of Date: " + date);
        }
    }

    if (!client.getQueryData("date")) {
        mutate(d);
    }

    return {
        data: client.getQueryData("date"),
        mutate
    };

}