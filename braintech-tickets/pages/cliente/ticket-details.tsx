import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import moment from "moment";
import Ticket from "../../app/models/Ticket";
import { updateTicket } from "../../app/services/TicketService";

export default function TicketDetails(props : {ticket  : Ticket, onClosed : ()=> void })
{ 
    const { ticket } = props;
    const toast = useToast();

    const revokar = async ()=>{
        const t = {...props.ticket};
        t.state = "REVOCADO";
        const ticket = updateTicket(t);
        
        toast({ title: "Ticket revocado", duration: 1000, status: "success" });
        props.onClosed();
    }

    return <Modal size={"xl"} isOpen={true} onClose={()=>{}}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Detalles ticket - {ticket.id}</ModalHeader>
            <ModalCloseButton onClick={props.onClosed}/>
            <ModalBody>
                
                <Flex gap={"5px"} flexDir={"column"}>
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'}>
                           Actualizado el:
                        </Text>
                        <Text>{ ticket.updateDate == null ? "No se ha actualizado" : moment(ticket.updateDate?.toDate()).format("DD/MM/YY hh:mm")}</Text>
                    </Flex>
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'}>
                            Fecha creacion:
                        </Text>
                        <Text>{moment(ticket.date.toDate()).format("DD/MM/YY hh:mm")}</Text>
                    </Flex>
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'} fontFamily={'Roboto'}>ESTADO</Text>
                        <Text>{ticket.state}</Text>
                    </Flex>
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'} fontFamily={'Roboto'}>Acerca de:</Text>
                        <Text>{ticket.about}</Text>
                    </Flex>
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'} fontFamily={'Roboto'}>Detalles:</Text>
                        <Text>{ticket.details}</Text>
                    </Flex>
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'} fontFamily={'Roboto'} color={ticket.resolution ? "green" : "black"}>Resolucion:</Text>
                        <Text color={ticket.resolution == null ? "blackAlpha.500" : "green"}>{ticket.resolution || "Ticket todavia no se ha resuelto"}</Text>
                    </Flex>
                  
                </Flex>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme={"red"} mr={3} onClick={revokar}>
                    Revocar ticket
                </Button>
                <Button variant={'ghost'} mr={3} onClick={props.onClosed}>
                    Cerrar
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}