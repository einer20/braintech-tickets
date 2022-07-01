import Company from "./Company";

type User = {
    id? : string,
    user : string,
    fullName : string,
    level: "ADMIN" | "CLIENT",
    email: string,
    company : Company
};

export default User;