import { Box } from "@chakra-ui/react";
import Head from "next/head";

export default function Layout(props : { children : JSX.Element | JSX.Element[]})
{
    return <>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossOrigin" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,900&display=swap" rel="stylesheet" />
    </Head>
     <Box margin={"10px auto"} width="800px">
        {props.children}
    </Box>
    </>
}