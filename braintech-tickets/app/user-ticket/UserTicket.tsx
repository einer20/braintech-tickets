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
}
export default function UserTicket(props : UserTicketProps) {
    return <Box 
        onClick={x=> {
            if(props.onClick) {
                props.onClick(props.ticket)
            }
        }}
        background={colors[props.ticket.state]}
        padding="5px 10px" borderRadius={"5px"} 
        justifyContent={"space-between"}
        border="solid 1px transparent"
        cursor={"default"}
        _hover={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1) 0 0)"
        }}
        _active={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2) 0 0)"
        }}
    >
        <Flex flexDir={{
            base: "column",
            sm:"column",
            md:"row",
            lg: "row"
        }} gap={{
            base: "10px",
            sm: "10px",
            md: "25px",
            lg: "25px"
        }} 
        
        alignItems={{
            base:"flex-start",
            sm: "flex-start",
            md: "center",
            lg: "center"
        }}>
            
            <Flex flexDir={{
                base:"column",
                sm: "column",
                md: "row",
                lg: "row"
            }} alignItems={{
                base: "flex-start",
                sm: "flex-start",
                md: "center",
                lg: "center"
            }} flex={4} gap={{
                    base: "10px",
                    sm: "10px",
                    md: "50px",
                    lg: "50px"
                }} justifyContent="flex-start">
                <Text fontFamily={'Roboto'} fontSize={"md"} fontWeight="bold">#{props.ticket.id?.slice(0,4)}</Text>
                <Box display={{
                    base: "none"
                }}>
                 <UserInitials  userFullName={props.ticket.user.user} />
                </Box>
                
                <Flex userSelect={"none"} flexDir="column" gap={"0px"} width="150px">
                    <Text fontFamily={'Roboto'}  padding={0} margin={0} fontWeight={"bold"}>{props.ticket.user.fullName}</Text>
                    <Text fontFamily={'Roboto'}   padding={0} margin={0} fontWeight={"bold"}>{props.ticket.user.company?.shortName}</Text>
                </Flex>
            </Flex>
           
            <Flex flex={4} flexDir={"column"} alignItems={"flex-start"}>
                <Text userSelect={"none"} background="transparent" fontFamily={'Roboto'}  margin={0}>{props.ticket.about}</Text>
                <Text userSelect={"none"} display={"inline-block"} background="#ccc"  padding="0px 5px" borderRadius={"5px"} fontFamily={'Roboto'}  margin={0}>{props.ticket.type}</Text>
            </Flex>
            <Flex flex={2}>
                <Text>
                    {moment(props.ticket.date.toDate()).format("DD/MM/YY hh:mm")}
                </Text>
            </Flex>
        </Flex>
    </Box>
}

