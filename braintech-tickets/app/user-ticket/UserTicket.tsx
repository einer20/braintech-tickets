import { Box, Flex, Text } from "@chakra-ui/react"
import Ticket from "../models/Ticket"
import UserInitials from "../UserInitials"


export type UserTicketProps = {
    ticket : Ticket,
    onClick? : (t : Ticket) => void
}
const colors = {
    'ACTIVO' : '#8484841c',
    'ENPROGRESO' : '#2196f342',
    "REVOCADO" : "#f4433640",
    "RESUELTO": "#8bc34a59"
}
export default function UserTicket(props : UserTicketProps) {
    return <Box background={colors[props.ticket.state]} padding="5px 10px" borderRadius={"5px"} justifyContent={"space-between"}
        border="solid 1px transparent"
        cursor={"default"}
        _hover={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1) 0 0)"

        }}
        _active={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2) 0 0)"
        }}
    >
        <Flex flexDir="row" gap={"25px"} alignItems="center">
            <Text fontFamily={'Roboto'} width="50px" fontSize={"lg"} fontWeight="bold">#{props.ticket.id}</Text>
            <UserInitials userFullName={props.ticket.user.user} />
            <Flex flexDir="column" gap={"0px"} width="200px">
                <Text fontFamily={'Roboto'}  padding={0} margin={0} fontWeight={"bold"}>{props.ticket.user.fullName}</Text>
                <Text fontFamily={'Roboto'}   padding={0} margin={0} fontWeight={"bold"}>{props.ticket.user.company?.shortName}</Text>
            </Flex>
            <Text userSelect={"none"} background="transparent" fontFamily={'Roboto'}  margin={0}>{props.ticket.about}</Text>
            
        </Flex>
    </Box>
}

