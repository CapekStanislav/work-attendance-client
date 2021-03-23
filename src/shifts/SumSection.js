import SumSectionItem from "./SumSectionItem";

function SumSection(props) {
    const map = props?.map || new Map()

    const createSumItem = (description, value) => {
        return (
            <SumSectionItem
                key={description}
                description={description}
                value={value}
            />
        )
    }

    const sectionList = (map) => {
        const list = []
        map.forEach((value, key) => list.push(createSumItem(key, value)))
        return list
    }

    return (
        <>
            {sectionList(map)}
        </>
    )

}

export default SumSection