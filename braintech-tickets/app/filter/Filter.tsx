import { Flex, Text } from "@chakra-ui/react"
import { useState } from "react"

export type FilterProps = {
    items : Array<string>,
    onItemClick : (index : number) => void
}
export default function Filter(props : FilterProps) {

    const [activeIndex, setActiveIndex] = useState<number>(-1)

    return <Flex padding={"5px 10px"} flexDir={"row"} gap="20px" alignItems={"center"}>
        {props.items.map((x,index) => <FilterButton onClick={()=>{
            props.onItemClick(index);
            setActiveIndex(index);
        }}  selected={activeIndex == index} text={x} />)}
    </Flex>
}

const FilterButton = (props : {text : string, selected : boolean, onClick : ()=> void }) =>{
    return <Text cursor={'pointer'} onClick={x=> props.onClick()} 
            fontFamily={'Roboto'} 
            fontWeight={props.selected ? "bold" : "normal"} 
            borderBottom={`dotted 1px ${props.selected ? "blue" : "transparent"}`}
            _hover={{
                borderBottom:"dotted 1px blue"
            }}
            color="blue" >
        {props.text}
    </Text>
}