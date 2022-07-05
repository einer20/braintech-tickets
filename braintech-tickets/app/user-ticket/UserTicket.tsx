import { Box, Flex, Text } from "@chakra-ui/react"
import moment from "moment"
import Ticket from "../models/Ticket"
import UserInitials from "../UserInitials"


export type UserTicketProps = {
    ticket : Ticket,
    onClick? : (t : Ticket) => void
}
const colors = {
    'NOASIGNADO' : '#8484841c',
    'ENPROGRESO' : '#2196f342',
    "REVOCADO" : "#f4433640",
    "RESUELTO": "#8bc34a59"
};

const types : any = {
    "HOSPITALIZACION": "purple.100",
    "EMERGENCIA": "red.100",
    "FACTURACION": "green.100"
}
export default function UserTicket(props : UserTicketProps) {
    const {ticket} = props;
    return <>
    <Flex padding={"10px"} borderBottom="solid 1px #d8d8d8" _hover={{
        background:"#f9f9f9"
    }} borderRadius={"2px"} cursor="pointer" onClick={x=> {
        if(props.onClick){
            props.onClick(ticket);
        }
    }}>
        <Flex flexDir={"row"} gap={"10px"} alignItems={"center"} flex={2}>
            <UserInitials size="sm" userFullName={ticket.user.user} />
           <Flex flexDirection={"column"} gap="0px">
            <Text>{ticket.user.fullName}</Text>
            <Text fontWeight={'bold'} fontFamily='Roboto' color="blackAlpha.500">{ticket.user.company.shortName}</Text>
           </Flex>
        </Flex>
        <Flex flexDir={"row"} alignItems={"center"} gap={"10px"} flex={6}>
            <Tag type={ticket.type} text={ticket.type} />
            <Text>{ticket.about}</Text>
        </Flex>
        <Flex flexDir={"row"} alignItems={"center"} gap={"10px"} flex={1}>
            {ticket.assignedTo == null ? <Text>No asignado</Text> : <UserInitials size="sm" userFullName={ticket.assignedTo?.user} />}
        </Flex>
        <Flex flexDir={"row"} alignItems={"center"} gap={"10px"} flex={1}>
           <Text> {moment(ticket.date.toDate()).format("DD/MM/YY hh:mm")}</Text>
        </Flex>
    </Flex>
    </>;
}

const Tag = (props : { text : string, type: string})=> <Text borderRadius={"4px"} background={types[props.type.toUpperCase()]} padding={"0px 5px"}>{props.text}</Text>

