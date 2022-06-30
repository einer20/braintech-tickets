import { Box, Flex, Text } from "@chakra-ui/react";


export default function UserInitials(props : { userFullName : string})
{
    return <Flex 
    background={"#ccc"}
    height={"50px"}
    width={"50px"}
    align="center"
    justify={"center"}
    justifyContent="center"
    borderRadius={"50px"}>
        <Text fontFamily={'Roboto'} fontSize={"medium"} fontWeight="bold" color="black">
            {props.userFullName.slice(0,2)}
        </Text>
    </Flex>
}