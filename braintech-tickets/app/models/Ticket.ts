import User from "./User";
import { Timestamp } from "firebase/firestore";

export type TicketState = "NOASIGNADO" | "ENPROGRESO" | "REVOCADO" | "RESUELTO";

type Ticket = {
    id?: string,
    number : number,
    user : User,
    about : string,
    details : string,
    type : string,
    attachments?: Array<string>,
    state: TicketState,
    date : Timestamp,
    updateDate? : Timestamp,
    resolution?: string,
    assignedTo?: User
}

export default Ticket;