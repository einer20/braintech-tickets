import User from "./User"
type Ticket = {
    id : number,
    user : User,
    about : string,
    details : string,
    type : string,
    attachments?: Array<string>,
    state: "ACTIVO" | "ENPROGRESO" | "REVOCADO" | "RESUELTO"
}

export default Ticket;