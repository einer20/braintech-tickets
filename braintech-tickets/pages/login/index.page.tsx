import { Box, Button, Flex, Img, Input, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import LoginLayout from "./LoginLayout";
import Image from "next/image";
import LinkButton from "../../app/button/LinkButton";
import useUser from "../../app/useUser";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
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
    const [form, setForm] = useState<{username:string, password : string, isValid: boolean, state : "DEFAULT" | "LOGIN_IN"}>({ username: "", password: "", isValid: true, state: "DEFAULT" });
    

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

        form.state = "LOGIN_IN";
        setForm({...form});
        try{
            const r = await signInWithEmailAndPassword(auth, form.username, form.password);
        }catch(e) {
            form.state = "DEFAULT";
            setForm({...form});
            toast({ title: "Usuario o contrasena invalido", duration: 2000, status: "error" });
        }
   }

   const resetPass = async ()=> {
        if(form.username.trim().length == 0) {
            toast({ title:"Usuario es requerido", status: "error" })
        }
        else if(window.confirm("Seguro que desea reiniciar su contrasena?")){
            const response = await sendPasswordResetEmail(auth, form.username);
            console.log(response);
            toast({title: "Verifique su correo electronico", description: "Verifique su correo electrico para poder restablecer su contrasena", status: "info", duration: 60000})
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
                            <LinkButton text={"Olvide mi contraseña"} onClick={resetPass}/>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex alignItems={"center"} justifyContent="center" gap={"10px"} flexDir={"column"}>
                    
                    <Button colorScheme={"blue"} width="250px" type="submit" disabled={form.state == "LOGIN_IN"}>
                        {form.state == "LOGIN_IN" ? "Entrando..." : "Entrar"}
                    </Button>
                </Flex>
                <Text align="center" color="blackAlpha.500" fontSize={"0.6em"} fontFamily={'Roboto'}>
                    BrainTech RD, RLC. 2022 Derechos reservados
                </Text>
            </Flex>
        </form>
    </LoginLayout>
}