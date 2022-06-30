import User from "./User"


type Ticket = {
    user : User,
    about : string,
    details : string,
    type : string,
    attachments?: Array<string>,
    state: "ACTIVO" | "ENPROGRESO" | "REVOCADO" | "RESUELTO"
}

export default Ticket;