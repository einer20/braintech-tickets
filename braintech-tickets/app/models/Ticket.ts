import User from "./User";
import { Timestamp } from "firebase/firestore";

export type TicketState = "NOASIGNADO" | "ENPROGRESO" | "REVOCADO" | "RESUELTO";

export type TicketEvent = {

    /**
     * Tipo de event
     */
    type : "ESTADO_ACTUALIZADO" | "ASIGNADO",

    /**
     * Comentarios del evento
     */
    comment: string,
    /**
     * Usuario que realizo la accion
     */
    user: string,

    /**
     * Fecha del evento
     */
    date: Timestamp
}

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
    assignedTo?: User,
    events?: Array<TicketEvent>
}

export default Ticket;