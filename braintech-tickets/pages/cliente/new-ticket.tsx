import { Modal, ModalContent, ModalHeader, ModalOverlay, ModalBody, ModalCloseButton, ModalFooter, Button, Flex, Text, Input, Textarea, Select } from "@chakra-ui/react";
import { useState } from "react";
import Ticket from "../../app/models/Ticket";

type Props = {
    onCreate: (t : Ticket) => void,
    onCancel : ()=> void,
    show: boolean
}
export default function NewTicket(props : Props)
{

    const [form, setForm] = useState<{about: string, details : string, area: string}>({about:"", area:"", details: ""});

    const createTicket = ()=>{
        console.log(form);
    }

    return  <Modal size={"xl"} isOpen={props.show} onClose={props.onCancel}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Nuevo ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

        <Flex flexDir={"column"} gap={"20px"}>

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
                <Input placeholder="" type="text" background={"blackAlpha.200"} onChange={x=>{
                    form.about = x.target.value;
                    setForm({...form});
                }} />
            </Flex>

            <Flex flexDir={"column"}>
                <Text fontFamily={'Roboto'} fontWeight={"bold"}  color="black">Detalles</Text>
                <Text fontFamily={'Roboto'} color={'blackAlpha.700'}>Describa con detalle su situacion</Text>
                <Textarea placeholder="" rows={5} color={"black"} background={"blackAlpha.200"} onChange={x=>{
                    form.details = x.target.value;
                    setForm({...form});
                }}/>
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
            <Button colorScheme='blue' mr={3} onClick={createTicket}>
                Crear ticket
            </Button>
            <Button variant='ghost' onClick={props.onCancel}>Cancelar</Button>
        </ModalFooter>
        </ModalContent>
  </Modal>
}