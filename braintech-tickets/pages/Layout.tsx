import { Box, Heading, Text, Flex, ChakraProvider } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import Head from "next/head";
import { useEffect } from "react";
import { getUser } from "../app/services/UserService";
import UserInitials from "../app/UserInitials";
import useUser from "../app/useUser";
import { firebaseConfig } from "../firebaseConfig";

export default function Layout(props : { children : JSX.Element | JSX.Element[]})
{
    const {user, setUser} = useUser();
     
    useEffect(()=>{
       
        initializeApp(firebaseConfig);
        if(user == null)  {
          
            getUser("esantana","").then(x=>{
                console.log(x);
                setUser(x);
            });
        }
        
    });

    return <>
    <ChakraProvider>
        <Head>
        
        </Head>
        <Box css={{
            position:"fixed",
            top:"0px",
            width:"100%",
            marginTop:"10px"
        }}>
        <Box margin={"10px auto"} width="70%" display={"flex"}
            flexDirection="row"
            justifyContent={"space-between"}
            >
            <Heading padding={0} margin={0} size={"lg"} fontFamily={"Roboto"}>
                BRAINTECH - Soporte Tecnico
            </Heading>
            <Flex flexDir={"row"} gap="20px" alignItems={"center"}>

                <Flex flexDir={"row"} gap="4px">
                    <UserInitials  userFullName="MUSANTANA" />
                    <Flex flexDir={"column"} alignItems={"center"} justifyContent="center">
                        <Text margin={0} fontWeight={"bold"} fontFamily={'Roboto'}>{user?.user.toUpperCase()}</Text>
                        <Text  margin={0} color="#333" fontFamily={'Roboto'}>{user?.company?.shortName.toUpperCase()}</Text>
                    </Flex>
                </Flex>

                <Text color="blue" fontWeight={"bold"} fontFamily="Roboto" cursor={'pointer'} 
                    userSelect={"none"}
                    _hover={{
                        borderBottom:"dotted 1px blue"
                    }}
                >
                    SALIR
                </Text>
            </Flex>
        </Box>
        </Box>
        <Box margin={"10px auto"} marginTop={"130px"} width="70%">
            {props.children}
        </Box>
    </ChakraProvider>
    </>
}