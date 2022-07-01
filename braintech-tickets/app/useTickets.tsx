import { useEffect, useState } from "react";
import Ticket from "./models/Ticket";
import User from "./models/User";
import { getTickets } from "./services/TicketService";


export type TicketLoadType = "LoadAll" | "LoadNonClosed" | "LoadClosed" | "LoadCreatedByMe";

export default function useTickets(user : User)
{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filter, setFilter] = useState<TicketLoadType>();

    useEffect(()=>{
        
    },[filter]);
    
    return {
        setFilter: setFilter,
        tickets: tickets,
        isLoading : isLoading
    };
}