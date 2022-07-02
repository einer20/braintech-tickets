import Ticket, { TicketState } from "../models/Ticket";
import { getFirestore, addDoc,collection, setDoc, getDocs, where, doc, query, QueryConstraint} from '@firebase/firestore';
import User from "../models/User";

export async function createTicket(ticket : Ticket) {
    ticket.state = "NOASIGNADO";
    const r = await addDoc(collection(getFirestore(), "tickets"), ticket);
    ticket.id = r.id;

    return ticket;
}

export type TicketFilter = TicketState | "TODOS" | "CREADOS_POR_MI" | "ASIGNADOS_A_MI";
export async function getTickets(user : User, state : TicketFilter = "TODOS" ) {

    const queries : QueryConstraint[] = [ where("user.company.id", "==", user.company.id) ];

    if(state == "ASIGNADOS_A_MI") {
        queries.push(where("assignedTo.id", "==", user.id!))
    }
    else if(state == "CREADOS_POR_MI") {
        queries.push(where("user.id", "==", user.id!))
    }
    else if(state != "TODOS") {
        queries.push(where("state", "==", state));
    }

    const r = await getDocs(query(collection(getFirestore(), "tickets"), ...queries ));

    const tickets : Ticket[] = [];
    r.forEach(x=>{
        const d = x.data() as Ticket;
        d.id = x.id;
        tickets.push(d);
    });
    
    return tickets;
}


export function updateTicket( ticket : Ticket) {
    const { id , ..._ticket} = ticket;
    return setDoc(doc(getFirestore(), "tickets", id!), _ticket);
}