import { Box, Flex, Text } from "@chakra-ui/react"
import moment from "moment"
import CompanyLogo from "../CompanyLogo"
import Ticket from "../models/Ticket"
import UserInitials from "../UserInitials"
import UserProfilePic from "../UserProfilePic"


export type UserTicketProps = {
    ticket : Ticket,
    onClick? : (t : Ticket) => void
}
const colors  : any = {
    'NOASIGNADO' : '#8484841c',
    'ENPROGRESO' : '#2196f396',
    "REVOCADO" : "#f4433640",
    "RESUELTO": "#8bc34aa6"
};

const types : any = {
    "HOSPITALIZACION": "purple.100",
    "EMERGENCIA": "red.100",
    "FACTURACION": "green.100"
}
export default function UserTicket(props : UserTicketProps) {
    const {ticket} = props;
    return <>
    <Flex padding={"10px 10px 10px 0px"} background="#f1f1f1" borderBottom="solid 1px #d8d8d8" _hover={{
        background:"#f9f9f9"
    }} borderRadius={"4px"} cursor="pointer" onClick={x=> {
        if(props.onClick){
            props.onClick(ticket);
        }
    }}>
        <Flex flexDir={"row"} gap={"10px"} alignItems={"center"} flex={{
            base: "3",
            sm: "3",
            md: "4",
            lg:"3"
        }}>
            <Flex width={"6px"} background={colors[props.ticket.state]} height={"100%"}>
            </Flex>
            <Text fontFamily='Roboto' fontWeight={'bold'}>
                #{ticket.number}
            </Text>
           <CompanyLogo company={ticket.user.company} />
           <Flex flexDirection={"column"} gap="0px" display={{
                base: "none",
                sm: "none",
                md: "flex",
                lg: "flex"
           }}>
                <Text>{ticket.user.fullName}</Text>
                <Text fontWeight={'bold'} fontFamily='Roboto' color="blackAlpha.500">{ticket.user.company.shortName}</Text>
           </Flex>
        </Flex>
        <Flex flexDir={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row"
        }} alignItems={{
            base:"flex-start",
            sm:"flex-start",
            md: "flex-start",
            lg: "center"
        }} gap={"5px"} flex={5}>
            <Tag type={ticket.type} text={ticket.type} />
            <Text>{ticket.about}</Text>
        </Flex>
        <Flex flexDir={"row"} alignItems={"center"} gap={"10px"} flex={1}  display={{
                base: "none",
                sm: "none",
                md: "flex",
                lg: "flex"
           }}>
            {ticket.assignedTo == null ? <Text>No asignado</Text> : <UserProfilePic size="sm" user={ticket.assignedTo} />}
        </Flex>
        <Flex flexDir={"row"} alignItems={"center"} gap={"10px"} flex={1}  display={{
                base: "none",
                sm: "none",
                md: "flex",
                lg: "flex"
           }}>
           <Text> {moment(ticket.date.toDate()).format("DD/MM/YY hh:mm")}</Text>
        </Flex>
    </Flex>
    </>;
}

const Tag = (props : { text : string, type: string})=> <Text borderRadius={"4px"} background={types[props.type.toUpperCase()]} padding={"0px 5px"}>{props.text}</Text>

