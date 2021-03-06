import React from "react";
import { useEffect, useState } from "react";
import Ticket from "./models/Ticket";
import User from "./models/User";
import { getTickets, TicketFilter } from "./services/TicketService";
import useUser from "./useUser";

export default function useTickets()
{
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filter, setFilter] = useState<TicketFilter>();

    useEffect(()=>{
        load();
    },[filter, user]);

    const load = ()=>{
        if(user != null)
        {
            setIsLoading(true)
            getTickets(user, filter).then(x=>{
                setTickets(x.sort((a,b)=> (b.date.toMillis() - a.date.toMillis())));
                setIsLoading(false)
            });
        }
    }
    
    return {
        filter: filter,
        setFilter: setFilter,
        tickets: tickets,
        isLoading : isLoading,
        reload: load
    };
}