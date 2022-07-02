import { Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { TicketFilter } from "../services/TicketService"

export type FilterProps = {
    items : Array<{text: string, filter : TicketFilter}>,
    onItemClick : (filter : TicketFilter) => void
}
export default function Filter(props : FilterProps) {

    const [activeIndex, setActiveIndex] = useState<number>(-1)

    return <Flex padding={"5px 0px"} flexDir={"row"} gap="20px" alignItems={"center"}>
        {props.items.map((x,index) => <FilterButton onClick={()=>{
            props.onItemClick(x.filter);
            setActiveIndex(index);
        }}  selected={activeIndex == index} text={x.text} />)}
    </Flex>
}

const FilterButton = (props : {text : string, selected : boolean, onClick : ()=> void }) =>{
    return <Text textAlign={"center"} cursor={'pointer'} onClick={x=> props.onClick()} 
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