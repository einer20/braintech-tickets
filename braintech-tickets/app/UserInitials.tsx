import { Box, Flex, Text } from "@chakra-ui/react";


const size = {
    "default": "50px",
    "sm": "40px"
}

export default function UserInitials(props : { userFullName : string, size?: "default" | "sm"})
{
    return <Flex 
    background={"#ccc"}
    height={size[props.size || "default"]}
    width={size[props.size || "default"]}
    align="center"
    justify={"center"}
    justifyContent="center"
    borderRadius={"50px"}>
        <Text fontFamily={'Roboto'} fontSize={"medium"} fontWeight="bold" color="black">
            {props.userFullName.slice(0,2).toUpperCase()}
        </Text>
    </Flex>
}