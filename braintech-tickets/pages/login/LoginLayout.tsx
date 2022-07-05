import { Box, Button, ChakraProvider, Flex, Img, Input, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import LinkButton from "../../app/button/LinkButton";

export default function LoginLayout(props : {children : JSX.Element | JSX.Element[]})
{
    return <>
        <Head>
            <title>BrainTechRD - Soporte Tecnico</title>
        </Head>
        <ChakraProvider>
            <Box display="flex" alignItems={"center"} position={"absolute"} width="100vw" height={"100vh"} background="#E9E9E9" top="0px" left="0px">
                <Box margin={"10px auto"} width={{
                    base : "90vw",
                    sm:"90vw",
                    md: "50vw",
                    lg: "500px",
                }} 
                borderRadius={"5px"}
                padding={"20px 40px"}
                boxShadow="2px 7px 13px #ccc"
                background="white" 
                border="solid 1px #ccc"
                height={"550px"}>
                    {props.children}
                </Box>
            </Box>
        </ChakraProvider>
    </>
}
