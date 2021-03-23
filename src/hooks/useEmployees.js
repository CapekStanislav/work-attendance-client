import {useQuery} from "react-query";
import traverson from "traverson-promise";


function getAllUsers(url) {
    return traverson.from(url)
        .jsonHal()
        .follow("employees", "employees[$all]")
        .getResource().result
}

export default function useEmployees(url,option) {
    return useQuery("users", () => getAllUsers(url),option)
}