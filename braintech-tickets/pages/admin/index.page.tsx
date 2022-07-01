import Layout from "../Layout";
import UserTicket from '../../app/user-ticket/UserTicket';
import { Flex, Heading } from "@chakra-ui/react";
import Filter from "../../app/filter/Filter";
import { getUser } from "../../app/services/UserService";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
export default function Index()
{


    return <Layout>

        <Flex flexDir={"column"} gap="10px">

        <Heading fontFamily={"Roboto"}>
                Tickets
        </Heading>

        <Filter items={[
            "Cargar todos" , "Cargar no resueltos", "Cargar resueltos"
        ]} onItemClick={index=>{ 

            console.log(`elemento ${index}`);
        }} />

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