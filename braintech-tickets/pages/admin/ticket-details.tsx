import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Button, Flex, Select, Text, Textarea, useToast } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import LinkButton from "../../app/button/LinkButton";
import Ticket from "../../app/models/Ticket";
import User from "../../app/models/User";
import { updateTicket } from "../../app/services/TicketService";
import { getAdminUsers } from "../../app/services/UserService";

export default function TicketDetails(props : {ticket  : Ticket, onTicketUpdated: (t : Ticket) => void, onClosed : ()=> void })
{ 
    const { ticket } = props;
    const [users, setUsers] = useState<User[]>([]);
    const [ selectedUser, setSelectedUser] = useState<User>();
    const [closeReason, setCloseReason] = useState<string | undefined>(ticket.resolution);
    const toast = useToast();

    const loadUsers = async ()=>{
        if(users.length == 0)
        {
            const u = await getAdminUsers();
            setUsers(u);
        }
    }

    const closeTicket = async ()=>{
        if(closeReason == undefined || closeReason?.length == 0)
        {
            toast({ title: "Resolucion es requerida", duration: 1000, status: "error" });
        }
        else if(window.confirm("Seguro que desea realizar esta accion?")) {
            const t = {...ticket};
            t.state = "RESUELTO";
            t.updateDate = Timestamp.now();
            
            const r = await updateTicket(t);
            toast({ title: "Ticket cerrado exitosamente", duration: 1000, status: "success" });
            props.onTicketUpdated(t);
        }
    }

    const devolver = async ()=>{
        if(closeReason == undefined || closeReason?.length == 0)
        {
            toast({ title: "Resolucion es requerida", duration: 1000, status: "error" });
        }
        else if(window.confirm("Seguro que desea realizar esta accion?")) {
            const t = {...ticket};
            t.state = "REVOCADO";
            t.updateDate = Timestamp.now();
            
            const r = await updateTicket(t);
            toast({ title: "Ticket devuelto exitosamente", duration: 1000, status: "success" });
            props.onTicketUpdated(t);
        }
    }

    const updateAssignee = async (user : User)=>{
        setSelectedUser(user);
        const t = {...ticket};
        t.assignedTo = user;
        t.updateDate = Timestamp.now();
        t.state = "ENPROGRESO";
        const r  = await updateTicket(t);
        toast({
            title: "Ticket asigando",
            duration : 1000,
            status: "success"
        });
    }

    const loadAssignnee= ()=>{
        loadUsers();
    }

    return <Modal size={"xl"} isOpen={true} onClose={()=>{}}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{ticket.about.toUpperCase()} - {ticket.user.company.shortName}</ModalHeader>
            <ModalCloseButton onClick={props.onClosed}/>
            <ModalBody>
                
                <Flex gap={"10px"} flexDir={"column"}>
                    <Flex flexDir={"row"} gap="20px">
                        <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'} fontFamily={'Roboto'}>Asignado a:</Text>
                        <LinkButton text={ticket.assignedTo?.user?.toUpperCase() || "No se ha asignado a nadie"} onClick={loadAssignnee}/>
                        <Select display={users.length == 0 ? "none" : "block"} onChange={x=>{
                                if(x.target.selectedIndex > 0) {
                                    const user = users[x.target.selectedIndex-1];
                                    updateAssignee( user );
                                    
                                } 
                            }}>
                                <option></option>
                            {users.map((x,index)=> <option key={index} selected={ticket.assignedTo?.id == x.id} value={index}>{x.user.toUpperCase()}</option>)}
                        </Select>
                        </Flex>
                        <Flex flexDir={"column"}>
                            <Text fontWeight={'bold'} fontFamily={'Roboto'}>Estado:</Text>
                            <Text>{ticket.state}</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'}>
                            Fecha creacion:
                        </Text>
                        <Text>{moment(ticket.date.toDate()).format("DD/MM/YY hh:mm")}</Text>
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
                        <Text fontWeight={'bold'} fontFamily={'Roboto'}>Resolucion:</Text>
                        <Textarea value={closeReason} onChange={x=> {
                            setCloseReason(x.target.value);
                        }} />
                    </Flex>
                    <Flex flexDir={"row"} gap="10px">
                        <Button colorScheme={"red"} mr={3} onClick={devolver}>
                            Devolver
                        </Button>

                        <Button colorScheme={"green"} mr={3} onClick={x=> closeTicket()}>
                            Finalizar ticket
                        </Button>
                    </Flex>
                </Flex>
            </ModalBody>
            <ModalFooter>
                 
              
                <Button colorScheme={"gray"} mr={3} onClick={props.onClosed}>
                    Cancelar
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}