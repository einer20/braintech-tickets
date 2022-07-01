import User from "./User";
import { Timestamp } from "firebase/firestore";

type Ticket = {
    id?: string,
    number : number,
    user : User,
    about : string,
    details : string,
    type : string,
    attachments?: Array<string>,
    state: "NOASIGNADO" | "ENPROGRESO" | "REVOCADO" | "RESUELTO",
    date : Timestamp
}

export default Ticket;