import { Box, Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import LoginLayout from "./LoginLayout";
import Image from "next/image";
import LinkButton from "../../app/button/LinkButton";
import useUser from "../../app/useUser";

export default function Login()
{

    const { user } = useUser();
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState<{username:string, isValid: boolean}>({ username: "", isValid: true });

    useEffect(()=>{
        if(user != null)
        {
            if(user.level == "ADMIN")
                window.location.href = "/admin";
            else 
                window.location.href = "/cliente";
        }
    },[user]);

    return <LoginLayout>
        <form method="POST" action="/login/pass" ref={formRef}>
           <Flex flexDir={"column"} gap="30px">
                <Flex justifyContent="center">
                    <Image width="100px" src="/logo.jpg" height="100px" />
                </Flex>

                <Flex flexDir={"column"} gap={"30px"}>
                    <Text align={"center"} fontFamily={'Roboto'} fontSize="1.2em">Soporte Tecnico</Text>

                    <Flex flexDir={"column"} gap={"4px"}>
                        <Text fontFamily={'Roboto'}>Nombre de usuario:</Text>
                        <Input fontWeight={"bold"} name="user" type="text" 
                            fontFamily={'Roboto'} 
                            background="blackAlpha.200" 
                            color="black" 
                            border="solid 1px"
                            borderColor={"blackAlpha.400"}
                            onChange={x=>{
                            form.username = x.target.value;
                            setForm({...form});
                        }}/>
                        <Text display={form.isValid ? "none" : "block"} color="red.600" fontFamily={'Roboto'} fontSize={'0.8em'}>Usuario es requerido</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap="10px">
                        <Flex gap={"5px"} alignItems={"center"}>
                            <Text>No tienes cuenta?</Text>
                            <LinkButton text={"Crear cuenta"}/>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex alignItems={"center"} justifyContent="center" gap={"10px"} flexDir={"column"}>
                    
                    <br />
                    <Button colorScheme={"blue"} width="250px" type="submit" onClick={x=>{
                        x.preventDefault();
                        
                        if(form.username.trim().length == 0)
                        {
                            form.isValid = false;
                            setForm({...form});
                        }
                        else{
                            
                            formRef.current?.submit();
                        }
                    }}>
                        Continuar
                    </Button>
                </Flex>
                <Text align="center" color="blackAlpha.500" fontSize={"0.6em"} fontFamily={'Roboto'}>
                    BrainTech RD, RLC. 2022 Derechos reservados
                </Text>
            </Flex>
        </form>
    </LoginLayout>
}