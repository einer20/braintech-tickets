import { Text } from "@chakra-ui/react";
import React from "react";

export default function LinkButton(props : { text? : string, onClick?: ()=> void})
{
    return <Text
        color="blue"
        cursor={'pointer'} 
        onClick={x=> {
            if(props.onClick) {
                props.onClick()
            }
        }} 
        fontFamily={'Roboto'} 
        fontWeight={'bold'} 
        borderBottom={`dotted 1px transparent"}`}
        _hover={{
            borderBottom:"dotted 1px blue"
        }}>
    {props.text}
</Text>
}