import Layout from "../Layout";
import UserTicket from '../../app/user-ticket/UserTicket';
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Filter from "../../app/filter/Filter";
import NewTicket from "./new-ticket";
import { useState } from "react";
export default function Index()
{
    const [showCreateNewTicket, setShowCreateNewTicket] = useState<boolean>(false);

    return <Layout>

        <Flex flexDir={"column"} gap="10px">

        <Flex flexDir={"row"} justifyContent={"space-between"}>
            <Heading size={"lg"} fontFamily={'Roboto'}>
                Clinica Dr. Cedano - Tickets
            </Heading>

            <Button height="35px"
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

        {showCreateNewTicket ? <NewTicket onCreate={t=>{ }} onCancel={()=> setShowCreateNewTicket(false)} show={true}/> : null}
        

        <Filter items={[
            "Cargar todos" , "Cargar no resueltos", "Cargar resueltos", "Creados por mi"
        ]} onItemClick={index=>{ 

            console.log(`elemento ${index}`);
        }} />

        <Text fontFamily='Roboto' margin={0}>
            Mostrando los ultimos 30 tickets
        </Text>
        <UserTicket ticket={{
            id: 3234,
            about :"ADMISION LANZANDO UN ERROR",
            details: "no me permite ingresar pacientes en el area de admision",
            state: "ACTIVO",
            type: "emergencia",
            attachments:[],
            user: {
                user: "ESANTANA",
                email: "einersantanar@gmail.com",
                fullName: "EINER SANTANA",
                level: "CLIENT",
                company: {
                    email :"braintechrd@hotmail.com",
                    name: "BRAIN TECH RD",
                    shortName: "BrainTech",
                    slogan: "BRAIN TECH"
                }
            }
        }} />

        <UserTicket ticket={{
            id: 887,
            about :"REPORTE INVENTARIO ERROR AL CARGAR",
            details: "no me permite ingresar pacientes en el area de admision",
            state: "ENPROGRESO",
            type: "emergencia",
            attachments:[],
            user: {
                user: "ASANTANA",
                email: "einersantanar@gmail.com",
                fullName: "ANER SANTANA",
                level: "CLIENT",
                company: {
                    email :"braintechrd@hotmail.com",
                    name: "CEDIMAT",
                    shortName: "CEDIMAT",
                    slogan: "BRAIN TECH"
                }
            }
        }} />

<UserTicket ticket={{
            id: 7853,
            about :"ADMISION LANZANDO UN ERROR",
            details: "no me permite ingresar pacientes en el area de admision",
            state: "RESUELTO",
            type: "emergencia",
            attachments:[],
            user: {
                user: "GA",
                email: "einersantanar@gmail.com",
                fullName: "GATELLANA ALMONTE",
                level: "CLIENT",
                company: {
                    email :"braintechrd@hotmail.com",
                    name: "BRAIN TECH RD",
                    shortName: "IRMIE",
                    slogan: "BRAIN TECH"
                }
            }
        }} />

        </Flex>
        
     
    </Layout>
}