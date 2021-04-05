import {useQuery, useQueryClient} from "react-query";

export default function useLockShifts() {
    const client = useQueryClient();

    return useQuery(["locked"], () => {
        return new Promise((resolve, reject) => {
            const date = client.getQueryData("date");
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const shifts = client.getQueryData(["shifts", {month, year}]);
            if (!shifts) {
                reject()
            }
            resolve(shifts.locked);
        })
    })
}
