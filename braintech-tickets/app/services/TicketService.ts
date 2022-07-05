import Ticket, { TicketState } from "../models/Ticket";
import { getFirestore, increment, addDoc, getDoc,collection, setDoc, updateDoc, getDocs, where, doc, query, QueryConstraint} from '@firebase/firestore';
import User from "../models/User";

export async function createTicket(ticket : Ticket) {

    ticket.number = await getNewTicketId();
    ticket.state = "NOASIGNADO";
    const r = await addDoc(collection(getFirestore(), "tickets"), ticket);
    ticket.id = r.id;

    return ticket;
}

const getNewTicketId = async ()=>{
    // incrementamos el valor
    const ticketConfigRef = doc(collection(getFirestore(), "config"),"ticket-ids");
    
    return updateDoc(ticketConfigRef,{ total : increment(1) }).then(async x=>{
        const r = await getDoc(ticketConfigRef);
        const ticketInfo = r.data() as { total : number };
        return ticketInfo.total;
    });
}

export type TicketFilter = TicketState | "TODOS_CLIENTE" | "TODOS_ADMIN" | "CREADOS_POR_MI" | "ASIGNADOS_A_MI" | "NO_RESUELTOS";
export async function getTickets(user : User, state : TicketFilter = "TODOS_ADMIN" ) {
   
    const queries : QueryConstraint[] = [  ];

    // si es un ciente, solo cargar los tickest de su compania
    if(user.level == "CLIENT") {
        queries.push(where("user.company.id", "==", user.company.id));
    }

    if(state == "ASIGNADOS_A_MI") {
        queries.push(where("assignedTo.id", "==", user.id!))
    }
    else if(state == "CREADOS_POR_MI") {
        queries.push(where("user.id", "==", user.id!))
    }
    else if(state == "NO_RESUELTOS") {
        debugger;
        queries.push(where("state", "!=" , "RESUELTO"));
    }
    else if(state != "TODOS_ADMIN" && state != "TODOS_CLIENTE") {
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