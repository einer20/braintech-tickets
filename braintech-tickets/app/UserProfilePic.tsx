import { Box, Flex, Text } from "@chakra-ui/react";
import FirebaseImg from "./firebase-img/FirebaseImg";
import User from "./models/User";
import UserInitials from "./UserInitials";


const size = {
    "default": "50px",
    "sm": "40px"
}

export default function UserProfilePic(props : { user? : User, size?: "default" | "sm"})
{
    
    return props.user?.profilePhoto ? <Flex 
    background={"#ccc"}
    height={size[props.size || "default"]}
    width={size[props.size || "default"]}
    align="center"
    justify={"center"}
    justifyContent="center"
    borderRadius={"50px"}>
        <FirebaseImg title={props.user.fullName} style={{borderRadius: "20px"}}  width={"50px"} height={"50px"} url={`/profiles/${props.user.profilePhoto}`} />
    </Flex> : <UserInitials userFullName={props.user!.fullName} size={props.size} />
}