export default function ShiftType({options, onChange, selectedValue}) {

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
            onChange={onChange}
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
