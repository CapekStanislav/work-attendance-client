import {useQuery} from "react-query";
import traverson from "traverson-promise";

export default function usePremiumPayments({year,month,_links},option) {

    const getPremiumPayments = (url) => {
        return traverson
            .from(url)
            .jsonHal()
            .follow("premium-payments-sum")
            .getResource().result
    }

    return useQuery(
        ["premiumPaymentsSum", {year, month}],
        ()=> getPremiumPayments(_links?.self?.href),
        option
    )
}