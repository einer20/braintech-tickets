import Layout from "../Layout";
import UserTicket from '../../app/user-ticket/UserTicket';
import { Flex, Heading, Text } from "@chakra-ui/react";
import Filter from "../../app/filter/Filter";
import { getUser } from "../../app/services/UserService";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import useUser from "../../app/useUser";
import { useEffect, useState } from "react";
import useTickets from "../../app/useTickets";
import { TicketFilter } from "../../app/services/TicketService";
import Ticket from "../../app/models/Ticket";
import TicketDetails from "./ticket-details";

export default function Index()
{
    const {user} = useUser();
    const [showCreateNewTicket, setShowCreateNewTicket] = useState<boolean>(false);
    const { filter, setFilter, tickets, isLoading, reload } = useTickets();
    const [selectedTicket, setSelectedTicket] = useState<Ticket>();

    useEffect(()=>{
        if(user != null && user.level == "CLIENT") {
            window.history.back();
            alert("Esto es solo para administradores");
        }
        else{
            setFilter("ASIGNADOS_A_MI")
        }
    },[]);

    return <Layout>

        <Flex flexDir={"column"} gap="10px">

            <Heading fontFamily={"Roboto"}>
                    Tickets
            </Heading>

            <Filter items={[ {text: "Cargar todos", filter: "TODOS_ADMIN"} , 
                {text: "Cargar no resueltos", filter: "NOASIGNADO"},
                {text: "Asignados a mi", filter: "ASIGNADOS_A_MI", selected: true}
            ]} onItemClick={filter=> setFilter(filter) } />

            <Text fontFamily='Roboto' margin={0}>
                Mostrando los ultimos 30 tickets
            </Text>
            <Text display={isLoading ? "block" : "none"} fontStyle="italic">
                Cargando tickets...
            </Text>

            {selectedTicket != null ?  <TicketDetails onTicketUpdated={t=> {
                reload();
                setSelectedTicket(undefined);
            }} onClosed={()=> setSelectedTicket(undefined)} ticket={selectedTicket} /> : null}
            {tickets.map(x=> <UserTicket ticket={x} onClick={x=> setSelectedTicket(x) }/>)}

            <Flex flexDir={"row"} display={tickets.length == 0 ? "flex" : "none"} gap={"4px"}>
                <Text fontFamily={'Roboto'} fontWeight={"bold"}>No se encontraron tickets.</Text> 
            </Flex>
        </Flex>     
    </Layout>
}