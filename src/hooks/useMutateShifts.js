import {useMutation, useQueryClient} from "react-query";
import traverson from "traverson-promise";

export default function useMutateShifts() {
    const queryClient = useQueryClient();

    const patch = ({_links, shifts}) => {
        const url = _links.self.href
        return traverson
            .from(url)
            .jsonHal()
            .convertResponseToObject()
            .patch({shifts})
            .result
    }

    return useMutation(patch, {
        onSettled: data => {
            queryClient.invalidateQueries(["shifts", {year: data.year, month: data.month}])
        }
    })
}