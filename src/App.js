import Main from "./main/Main";
import Login from "./login/Login";
import useLogging from "./hooks/useLogging";
import useMutateLogging from "./hooks/useMutateLogging";

export default function App() {
    const {data:isLogged} = useLogging();
    const {mutate: setLogged} = useMutateLogging();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLogged(true);
    };

    return (
        isLogged ? <Main/> : <Login onSubmit={handleOnSubmit}/>
    );

}
