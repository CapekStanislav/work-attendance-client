import useLockShifts from "../hooks/useLockShifts";

export default function ShiftType({options, onChange, selectedValue}) {
    const {data: locked} = useLockShifts();

    const showLockMessage = () => alert("Docházka je uzamčena a nelze jí editovat.");

    const handleChange = (e) => {
        if (locked) {
            e.target.value = selectedValue;
            showLockMessage();
            return;
        }
        onChange(e);
    }

    const getOption = (type) => {
        return (
            <option
                key={type}
                value={type}
                selected={selectedValue === type}
            >
                {type}
            </option>
        );
    }
    const getEmptyOption = () => {
        return <option selected={true}/>
    }

    return (
        <select
            name={"shiftTypes"}
            onChange={handleChange}
        >
            {getEmptyOption()}
            {
                options.map(type => {
                    return getOption(type)
                })
            }
        </select>
    )
}
