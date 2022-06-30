
type User = {
    user : string,
    fullName : string,
    level: "ADMIN" | "CLIENT",
    email: string,
    company? : Company
};

export default User;