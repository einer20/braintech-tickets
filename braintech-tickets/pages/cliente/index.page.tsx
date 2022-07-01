import Layout from "../Layout";
import UserTicket from '../../app/user-ticket/UserTicket';
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Filter from "../../app/filter/Filter";
import NewTicket from "./new-ticket";
import { useEffect, useState } from "react";
import useUser from "../../app/useUser";
import Ticket from "../../app/models/Ticket";
import Link from "next/link";
import { getTickets } from "../../app/services/TicketService";
import useTickets from "../../app/useTickets";
export default function Index()
{

    const {user} = useUser();
    const [showCreateNewTicket, setShowCreateNewTicket] = useState<boolean>(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const { setFilter, _tickets, isLoading } = useTickets(user!);

    useEffect(()=>{
        if(user != null) {
            getTickets(user).then(x=>{
                console.log(x);
                setTickets(x);
            });
        }
        
    },[]);

    return <Layout>

        <Flex flexDir={"column"} gap="10px">

        <Flex flexDir={"row"} justifyContent={"space-between"}>
            <Heading size={"lg"} fontFamily={'Roboto'}>
                {user?.company?.name} - Tickets
            </Heading>

            <Button height="40px"
                width={"170px"}
                background="#1570CA"
                color="white"
                borderRadius={"4px"}
                fontFamily='Roboto'
                fontWeight={'bold'}
                fontSize="1em"
                border="solid transparent 1px"
                padding={"4px 10px"}
                _active={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4) 0 0)"
                }}
                _hover={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2) 0 0)"
                }}
                onClick={x=> setShowCreateNewTicket(true)}
            >
                CREAR TICKET
            </Button>
        </Flex>

        {showCreateNewTicket ? <NewTicket onCreate={t=>{
            tickets.push(t);
            setTickets([...tickets]);
            setShowCreateNewTicket(false);
         }} onCancel={()=> setShowCreateNewTicket(false)} show={true}/> : null}
        

        <Filter items={[
            "Cargar todos" , "Cargar no resueltos", "Cargar resueltos", "Creados por mi"
        ]} onItemClick={index=>{ 

            console.log(`elemento ${index}`);
        }} />

        <Text fontFamily='Roboto' margin={0}>
            Mostrando los ultimos 30 tickets
        </Text>
        
        {tickets.map(x=> <UserTicket ticket={x} />)}
        
        <Flex  flexDir={"row"} display={tickets.length == 0 ? "flex" : "none"} gap={"4px"}>
            <Text fontFamily={'Roboto'} fontWeight={"bold"}>No tiene tickets registrados.</Text> 
            <Text cursor={'pointer'} onClick={x=> setShowCreateNewTicket(true)} fontFamily={'Roboto'} fontWeight={ "bold" } borderBottom={`dotted 1px blue`} color="blue">
                Crear ticket
            </Text>
        </Flex>

        </Flex>
    </Layout>;
}