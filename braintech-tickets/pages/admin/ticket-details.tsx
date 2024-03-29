import { CheckCircleIcon, CopyIcon } from "@chakra-ui/icons";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Box, Button, Flex, Select, Text, Textarea, useToast } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import moment from "moment";
import { useEffect, useState } from "react";
import LinkButton from "../../app/button/LinkButton";
import FirebaseImg from "../../app/firebase-img/FirebaseImg";
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
    const [viewAttachment, setViewAttachment] = useState<string>();
    

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
            t.resolution = closeReason;
            
            const r = await updateTicket(t);
            toast({ title: "Ticket cerrado exitosamente", duration: 1000, status: "success" });
            props.onTicketUpdated(t);
        }
    }

    const devolver = async ()=>{
        if(window.confirm("Seguro que desea reabrir el ticket?")) {
            const t = {...ticket};
            t.state = "ENPROGRESO";
            t.updateDate = Timestamp.now();
            t.resolution = closeReason || "";
            
            const r = await updateTicket(t);
            toast({ title: "Ticket devuelto exitosamente", duration: 1000, status: "success" });
            props.onTicketUpdated(t);
        }
    }

    const revokeTicket = async ()=>{
        if(closeReason == undefined || closeReason?.length == 0)
        {
            toast({ title: "Resolucion es requerida", duration: 1000, status: "error" });
        }
        else if(window.confirm("Ticket sera revocado. Seguro que desea continuar?")) {
            const t = {...ticket};
            t.state = "REVOCADO";
            t.updateDate = Timestamp.now();
            t.resolution = closeReason || "";
            
            const r = await updateTicket(t);
            toast({ title: "Ticket revocado exitosamente", duration: 1000, status: "success" });
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

        props.onTicketUpdated(t);
    }

    const loadAssignnee= ()=>{
        loadUsers();
    }

    return <Modal size={"xl"} isOpen={true} onClose={()=>{}}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                #{ticket.number} 
                &nbsp;&nbsp;
                <CopyIcon fontSize={"0.8em"} cursor="pointer" onClick={x=>{
                    navigator.clipboard.writeText("https://braintech-tickets.vercel.app/admin?ticket="+ticket.number);
                    toast({status: "info", title:"Url ticket copiada", position:"top"});
                }}/>
            </ModalHeader>
            <ModalCloseButton onClick={props.onClosed}/>
            <ModalBody>
                
                <Flex gap={"10px"} flexDir={"column"}>
                    <Flex>
                        <Text>
                       
                            {ticket.about.toUpperCase()} - {ticket.user.company.shortName}
                        </Text>
                    </Flex>

                    <Flex flexDir={"row"} justifyContent={"space-between"}>
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
                        <DisplayLargeText text={props.ticket.details} textLimit={100} />
                        
                    </Flex>
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'} fontFamily={'Roboto'}>Adjuntos:</Text>
                        <Flex flexDir={"row"} gap={"10px"}>{ticket.attachments?.map((x,index)=> <LinkButton key={index} onClick={()=> setViewAttachment(x)} text={`Adjunto '${x}'`} />)}</Flex>
                        {viewAttachment ? <AttachmentsViewer onClose={()=> setViewAttachment(undefined)} attachment={viewAttachment} ticket={props.ticket} /> : null}
                    </Flex>
                
                    <Flex flexDir={"column"}>
                        <Text fontWeight={'bold'} fontFamily={'Roboto'}>Resolucion:</Text>
                        <Textarea disabled={ticket.state == "RESUELTO"} title={ticket.state == "RESUELTO" ? "Para editar el comentario, tiene que reabrir el ticket" : ""} value={closeReason} onChange={x=> {
                            setCloseReason(x.target.value);
                        }} />
                    </Flex>
                    <Flex flexDir={"row"} gap="10px">
                        
                    </Flex>
                </Flex>
            </ModalBody>
            <ModalFooter>
                 
                <Button colorScheme={"pink"} mr={3} display={ticket.state == "RESUELTO" ? "inline-block" : "none"} onClick={devolver}>
                    Reabrir
                </Button>

                <Button colorScheme={"red"} display={(ticket.state == "ENPROGRESO" || ticket.state == "NOASIGNADO") ? "inline-block" : "none"} mr={3} onClick={x=> revokeTicket()}>
                    Revocar ticket
                </Button>

                <Button colorScheme={"gray"} mr={3} onClick={x=> closeTicket()}>
                    Marcar como resuelto
                </Button>
                 
                <Button colorScheme={"green"} mr={5} onClick={props.onClosed}>
                    Cerrar ventana
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

function AttachmentsViewer(props : { onClose : ()=> void, ticket : Ticket, attachment : string})
{

    const invalidExtension = ["docx", "doc", "pptx", "ppt", "txt"];
    const extension = props.attachment.split('.')[1];
    const isInvalidAttamentment = invalidExtension.indexOf(extension.toLowerCase()) > -1;
    
    return <>
        <Modal size={ isInvalidAttamentment ? "md": "full"} isOpen={true} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Previsualizacion</ModalHeader>
                <ModalCloseButton onClick={props.onClose}/>
                <ModalBody>
                    {invalidExtension.indexOf(extension.toLowerCase()) == -1 
                     ? <FirebaseImg disabledCache={true} width={"auto"} height={"auto"} url={`/tickets/${props.ticket.number}/${props.attachment}`} /> :
                     <CantPreviewFile ticketNumber={props.ticket.number} filename={props.attachment} />
                    }
                </ModalBody>
        </ModalContent>
    </Modal>
    </>;
}

const CantPreviewFile = (props : { ticketNumber: number, filename : string }) =>{
    const part = props.filename.split('.');

    const [url, setUrl] = useState<string>();

    useEffect(()=>{
        getDownloadURL(ref(getStorage(), `/tickets/${props.ticketNumber}/${props.filename}`)).then(x=>{
            setUrl(x);
        })
    })


    if(part.length == 2)
        return <div>
            <Text>Los archivos con extension <strong>{part[1]}</strong> no pueden ser previsualizados</Text>

            <div>
                <br />
                <Button colorScheme="blue"
                    disabled={url == null}
                    onClick={x=>{
                        window.open(url)
                    }}
                >Descargar</Button>
            </div>
        </div>
    else {
        return <Text>El archiv <strong>{props.filename} no tiene extension para ser previsualizado</strong></Text>;
    }
}

const DisplayLargeText = (props : { text : string , textLimit : number})=>{
    const [showMore, setShowMore] = useState<boolean>(false);

    return <div>
        <Box cursor={"pointer"} onClick={x=> setShowMore(true)}  display={showMore ? "none" :"block"}>
            <Text>{props.text.slice(0, props.textLimit)}...</Text>
            <Text color="blue">Ver mas</Text>
        </Box>
        <div style={{display: showMore ? "block" : "none"}}>
            <Text>{props.text}</Text>
        </div>
    </div>
}