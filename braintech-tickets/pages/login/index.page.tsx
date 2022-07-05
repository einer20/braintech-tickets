import { Box, Button, Flex, Img, Input, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import LoginLayout from "./LoginLayout";
import Image from "next/image";
import LinkButton from "../../app/button/LinkButton";
import useUser from "../../app/useUser";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { getUserByAuthId, getUserByEmail } from "../../app/services/UserService";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login()
{
    const toast = useToast();
    const { user, setUser } = useUser();
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState<{username:string, password : string, isValid: boolean}>({ username: "", password: "", isValid: true });

    useEffect(()=>{
        onAuthStateChanged(auth, x=>{
            if(x != null) {
                getUserByEmail(x!.email!).then(user=>{
                    setUser(user);
                    setTimeout(()=>{
                        if(user.level == "ADMIN")
                            window.location.href = "/admin";
                        else
                            window.location.href = "/cliente";
                    },200);  
                });
            }
        })
    },[])
     
    const logIn = async (e : any)=>{
        e.preventDefault();

        try{
           
            const r = await signInWithEmailAndPassword(auth, form.username, form.password);
            console.log(r);
            
        }catch(e) {
            toast({ title: "Usuario o contrasena invalido", duration: 2000 });
        }
   }

    return <LoginLayout>
        <form method="POST" action="/login/pass" ref={formRef} onSubmit={logIn}>
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
                        <Text display={form.isValid ? "none" : "block"} color="red.600" fontFamily={'Roboto'} fontSize={'0.8em'}>Credentiales son requeridas</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap={"4px"}>
                        <Text fontFamily={'Roboto'}>Contrasena:</Text>
                        <Input fontWeight={"bold"} name="user" type="password" 
                            fontFamily={'Roboto'} 
                            background="blackAlpha.200" 
                            color="black" 
                            border="solid 1px"
                            borderColor={"blackAlpha.400"}
                            onChange={x=>{
                            form.password = x.target.value;
                            setForm({...form});
                        }}/>
                        <Text display={form.isValid ? "none" : "block"} color="red.600" fontFamily={'Roboto'} fontSize={'0.8em'}>Credentiales son requeridas</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap="10px">
                        <Flex gap={"5px"} alignItems={"center"}>
                            <Text>No tienes cuenta?</Text>
                            <LinkButton text={"Crear cuenta"}/>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex alignItems={"center"} justifyContent="center" gap={"10px"} flexDir={"column"}>
                    
                    <Button colorScheme={"blue"} width="250px" type="submit">
                        Entrar
                    </Button>
                </Flex>
                <Text align="center" color="blackAlpha.500" fontSize={"0.6em"} fontFamily={'Roboto'}>
                    BrainTech RD, RLC. 2022 Derechos reservados
                </Text>
            </Flex>
        </form>
    </LoginLayout>
}