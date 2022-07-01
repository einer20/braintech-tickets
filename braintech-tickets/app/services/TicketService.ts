import Ticket from "../models/Ticket";
import { getFirestore, addDoc,collection, setDoc, doc} from '@firebase/firestore';

export function createTicket(ticket : Ticket) {
    ticket.state = "ACTIVO";
    addDoc(collection(getFirestore(), "tickets"), ticket);
}

export function updateTicket( ticket : Ticket) {
    const {id , ..._ticket} = ticket;
   setDoc(doc(getFirestore(), "tickets", ticket.id!), _ticket);
}