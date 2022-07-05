import { Box, Button, Flex, Img, Input, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import LoginLayout from "./LoginLayout";
import Image from "next/image";
import LinkButton from "../../app/button/LinkButton";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { GetServerSideProps } from "next";
import { getUser } from "../../app/services/UserService";
import User from "../../app/models/User";
import { parseBody } from "next/dist/server/api-utils/node";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import FirebaseImg from "../../app/firebase-img/FirebaseImg";
import useUser from "../../app/useUser";


export const getServerSideProps: GetServerSideProps = async (context) => {
    
    if(context.req.method == "POST") {

        const data = await parseBody(context.req,"1mb");
        initializeApp(firebaseConfig);
        const user = await getUser(data.user as string, "");
        
        return {
            props:{ user }
        }
    }
    else {
        
        return {
            props: { },
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }
  
    
  }

export default function Pass(props : {user : User})
{

    const passRef = useRef<HTMLInputElement>(null);
    const [formState, setFormState] = useState<"LOGING_IN" | "SUCCESS" | "INVALID" | "DEFAULT">("DEFAULT");
    const toast = useToast();
    const { user, setUser } = useUser();

    useEffect(()=>{
        passRef.current?.focus();
    },[]);

    const login = async ()=>{
        try{
            setFormState("LOGING_IN");
            const user = await getUser(props.user.user, passRef.current!.value);
            setFormState("SUCCESS");
            setUser(user);
            if(user.level == "ADMIN")
                window.location.href = "/admin";
            else 
                window.location.href = "/cliente";

        }
        catch(e) {
            setFormState("INVALID");
            toast({ title:"Contraseña invalida", status: "error" });
        }
    }
    
    return <LoginLayout>
        <input type="hidden" name="username" value={props.user.user} />
           <Flex flexDir={"column"} gap="15px">
                <Flex justifyContent="center" height={"100px"}>
                    <FirebaseImg width={100} url={`logos/${props.user.company.logo}`} />
                </Flex>

                <Flex flexDir={"column"} gap={"20px"}>
                    <Flex flexDir={"column"}>
                        <Text align={"center"} fontFamily={'Roboto'} fontSize="1.2em">{props.user.company.name}</Text>
                        <Text align={"center"} fontFamily={'Roboto'} color="blackAlpha.600">{props.user.company.slogan}</Text>
                    </Flex>
                    <BackButton />

                    <Flex flexDir={"column"} gap={"4px"}>
                        <Text fontFamily={'Roboto'}>Contraseña:</Text>
                        <Input ref={passRef} 
                            fontWeight={"bold"} type="password" 
                            fontFamily={'Roboto'} 
                            background="blackAlpha.200"
                            color="black" 
                            borderColor={"blackAlpha.500"}
                            disabled={formState == "LOGING_IN"}
                            border="solid 1px"/>

                    </Flex>
                    <Flex flexDir={"column"} gap="10px">
                        <Flex gap={"5px"} alignItems={"center"}>
                            <LinkButton text={"Recuperar contraseña"}/>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex alignItems={"center"} justifyContent="center" gap={"10px"} flexDir={"column"}>
                    <br />
                    <Button type="submit" disabled={formState == "LOGING_IN"} colorScheme={"blue"} width="250px" onClick={login}>
                        Entrar
                    </Button>
                </Flex>
                <Text align="center" color="blackAlpha.500" fontSize={"0.6em"} fontFamily={'Roboto'}>
                    BrainTech RD, RLC. 2022 Derechos reservados
                </Text>
           </Flex>
    </LoginLayout>
}

const BackButton = ()=> <Flex onClick={x=> window.history.back()} userSelect={"none"} cursor={"pointer"} alignItems={"center"} flexDirection={"row"} gap={"4px"} _active={{
    background:"#f9f9f9"
}}>
    <ChevronLeftIcon fontSize={"1.3em"} /> Atras
</Flex>