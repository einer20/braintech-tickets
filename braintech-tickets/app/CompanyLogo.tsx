import { Flex } from "@chakra-ui/react";
import FirebaseImg from "./firebase-img/FirebaseImg";
import Company from "./models/Company";


export default function CompanyLogo(props : {company: Company})
{
    return <Flex borderRadius={'30px'}>
        <FirebaseImg width={"40px"} height={"40px"} url={`/logos/${props.company.logo}`} />
    </Flex>
}