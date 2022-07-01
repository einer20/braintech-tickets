import Ticket from "../models/Ticket";
import { getFirestore, addDoc,collection, setDoc, getDocs, where, doc, query} from '@firebase/firestore';
import User from "../models/User";

export async function createTicket(ticket : Ticket) {
    ticket.state = "NOASIGNADO";
    const r = await addDoc(collection(getFirestore(), "tickets"), ticket);
    ticket.id = r.id;

    return ticket;
}

export async function getTickets(user : User) {
    const r = await getDocs(query(collection(getFirestore(), "tickets"), where("user.company.id", "==", user.company.id)));
    const tickets : Ticket[] = [];
    r.forEach(x=>{
        const d = x.data() as Ticket;
        d.id = x.id;
        tickets.push(d);
    });
    
    return tickets;
}

export function updateTicket( ticket : Ticket) {
    const {id , ..._ticket} = ticket;
   setDoc(doc(getFirestore(), "tickets", ticket.id!), _ticket);
}