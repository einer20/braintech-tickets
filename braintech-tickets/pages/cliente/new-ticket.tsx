import { Modal, ModalContent, ModalHeader, ModalOverlay, ModalBody, ModalCloseButton, ModalFooter, Button, Flex, Text, Input, Textarea, Select, useToast } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import Ticket from "../../app/models/Ticket";
import { createTicket } from "../../app/services/TicketService";
import useUser from "../../app/useUser";

type Props = {
    onCreate: (t : Ticket) => void,
    onCancel : ()=> void,
    show: boolean
}
export default function NewTicket(props : Props) {

    const { user } = useUser();
    const toast = useToast();

    const [form, setForm] = useState<{about: string, details : string, area: string}>({about:"", area:"Emergencia", details: ""});

    const generateId = (ticket : Ticket)=>{
        return `${ticket.user.company.shortName}-${ticket.date.toDate().getDay()}`
    }

    const create = async ()=>{
        if(form.about.trim().length == 0 || form.details.trim().length == 0)
        { 

        }
        else if(confirm("Seguro que desea crear este ticket?")){
            const ticket = await createTicket({
                about: form.about,
                details: form.details, 
                state : "NOASIGNADO",
                type: form.area,
                user: user!,
                number: 0,
                date : Timestamp.now()
            });
            toast({ title: "Ticket creado", description: "Ticket creado exitosamente", duration: 10000, status: "success" });
            props.onCreate(ticket);
        }
    }

    return  <Modal size={"xl"} isOpen={props.show} onClose={props.onCancel}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Nuevo ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

        <Flex flexDir={"column"} gap={"10px"}>

            <Flex flexDir={"column"}>
                <Text fontFamily={'Roboto'} fontWeight={"bold"} color="black">Area</Text>
                <Text fontFamily={'Roboto'} color={'blackAlpha.700'}>Emergencia, hospitalizacion, facturacion, etc., etc.</Text>
                <Select background={"blackAlpha.200"} onChange={x=>{
                    form.area = x.target.value;
                    setForm({...form});
                }}>
                    <option value="Emergencia">Emergencia</option>
                    <option value="Hospitalizacion">Hospitalizacion</option>
                    <option value="Facturacion">Facturacion</option>
                </Select>
            </Flex>        
        
            <Flex flexDir={"column"}>
                <Text fontFamily={'Roboto'} fontWeight={"bold"}  color="black">Acerca de</Text>
                <Text fontFamily={'Roboto'} color={'blackAlpha.700'}>Agrege una breve descripcion descripcion de su situacion</Text>
                <Input 
                    placeholder="" 
                    type="text"
                    maxLength={40}
                    background={"blackAlpha.200"}
                    onChange={x=>{
                        form.about = x.target.value;
                        setForm({...form});
                    }} />
                    <Text visibility={form.about.trim().length == 0 ? "visible" : "hidden"} color="red.700" fontFamily={'Roboto'}>
                        * Acerca de es requerido
                    </Text>
            </Flex>

            <Flex flexDir={"column"}>
                <Text fontFamily={'Roboto'} fontWeight={"bold"}  color="black">Detalles</Text>
                <Text fontFamily={'Roboto'} color={'blackAlpha.700'}>Describa con detalle su situacion</Text>
                <Textarea placeholder="" rows={5} color={"black"} background={"blackAlpha.200"} onChange={x=>{
                    form.details = x.target.value;
                    setForm({...form});
                }}/>
                <Text visibility={form.details.trim().length == 0 ? "visible" : "hidden"} color="red.700" fontFamily={'Roboto'}>
                    *  Detalle es requerido
                </Text>
            </Flex>

            <Flex flexDir={"column"}>
                <Text fontFamily={"Roboto"} color="blackAlpha.700">
                    Solo puede subir 2 imagenes
               </Text>
               <Button width={"70%"}>
                    Seleccionar Imagenes desde mi PC
               </Button>
            </Flex>
        </Flex>

        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={create}>
                Crear ticket
            </Button>
            <Button variant='ghost' onClick={props.onCancel}>Cancelar</Button>
        </ModalFooter>
        </ModalContent>
  </Modal>
}