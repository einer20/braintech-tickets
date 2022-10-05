import { Modal, ModalContent, ModalHeader, ModalOverlay, ModalBody, ModalCloseButton, ModalFooter, Button, Flex, Text, Input, Textarea, Select, useToast } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import LinkButton from "../../app/button/LinkButton";
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
    const [formState, setFormState] = useState<"DEFAULT" | "GUARDANDO">("DEFAULT");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [attachments, setAttachments] = useState<Array<{fileName: string}>>([]);

    const create = async ()=>{
        if(form.about.trim().length == 0 || form.details.trim().length == 0)
        { 

        }
        else if(confirm("Seguro que desea crear este ticket?")) {

            setFormState("GUARDANDO");
            const ticket = await createTicket({
                about: form.about, 
                details: form.details, 
                state : "NOASIGNADO", 
                type: form.area, 
                user: user!, 
                number: 0, 
                date : Timestamp.now(), 
                attachments: attachments.map(x=>x.fileName)
            }, inputFileRef.current?.files);

            toast({ title: "Ticket creado", description: "Ticket creado exitosamente", duration: 10000, status: "success" });
            setFormState("DEFAULT");
            props.onCreate(ticket);
        }
    }

    const onFileSelected = (e : ChangeEvent<HTMLInputElement>)=>{
        const sizeLimit : number = 3547398;
        for(var i = 0; i < e.target.files!.length; i++)
        {
            const f =  e.target.files![i];
            
            if(f.size > sizeLimit) {
                toast({ title:"Archivo no pude ser mayor a 300kb", status:"error" });
            }
            else {
                attachments.push({fileName: e.target.files![i].name});
            }
            
        }
        setAttachments([...attachments]);
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
                    <option value="Cirugia">Cirugia</option>
                    <option value="Contabilidad">Contabilidad</option>
                </Select>
            </Flex>        
        
            <Flex flexDir={"column"}>
                <Text fontFamily={'Roboto'} fontWeight={"bold"} color="black">Acerca de</Text>
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
               <input type="file" style={{visibility:'hidden', position:'absolute', top: "10000px"}} ref={inputFileRef} multiple onChange={onFileSelected}/>
               <Button width={"70%"} onClick={x=> inputFileRef.current?.click() }>
                    Seleccionar Imagenes desde mi PC
               </Button>
               <Flex flexDir={"row"} gap={"6px"} margin="5px 0px">
                    {attachments.map((x, index)=> <LinkButton key={index} text={x.fileName} />)}
               </Flex>
            </Flex>
        </Flex>

        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={create} disabled={formState == "GUARDANDO"}>
                {formState == "GUARDANDO" ? "Guardando..." : "Crear ticket"} 
            </Button>
            <Button variant='ghost' onClick={props.onCancel}>Cancelar</Button>
        </ModalFooter>
        </ModalContent>
  </Modal>
}
