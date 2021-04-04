import {useMutation, useQueryClient} from "react-query";
import traverson from "traverson-promise";


export default function useMutateLockShifts() {
    const client = useQueryClient();

    function getKey() {
        const date = client.getQueryData("date");
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return ["shifts", {month, year}];
    }

    const setLock = (boolean) => {
        let queryKey = getKey();
        const shifts = client.getQueryData(queryKey);
        const url = shifts._links.lock.href

        const dtoIn = {
            locked: boolean
        }
        return traverson
            .from(url)
            .jsonHal()
            .convertResponseToObject()
            .post(dtoIn)
            .result
    }

    return useMutation(setLock, {
        onSuccess: async data => {
            const shifts = client.getQueryData(getKey());
            shifts.locked = data.locked;
            await client.invalidateQueries(["locked"])
        }
    });
}