
import { getFirestore,where, query, addDoc,collection, setDoc, getDocs, getDoc, doc, QueryConstraint} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';
import Company from '../models/Company';
import User from '../models/User';

export async function getUser(user : string, pass : string) : Promise<User> {
 
    return new Promise<User>(async (resolved, reject)=>{

        const queries : QueryConstraint[] = [where("user", "==", user.toUpperCase())];

        if(pass.trim().length > 0)
        {
            debugger;
            queries.push(where("pass","==", pass));
        }

        const r =  await getDocs( query(collection(getFirestore(), "users"), ...queries) );

        r.forEach(async x=>{
            const data = x.data();
            const companyData = await getDoc(data.company);
            const u = data as User;
            u.company = companyData.data() as Company;
            u.company.id = companyData.id;
            u.id = x.id;
    
            resolved(u);
        });
        if(r.empty) {
            reject({  userNull: true });
        }
        

    });
}

export async function getUserByAuthId(id : string) : Promise<User> {

    return new Promise<User>(async (resolved, reject)=>{

        const queries : QueryConstraint[] = [where("id", "==", id)];

        const r =  await getDocs( query(collection(getFirestore(), "users"), ...queries) );

        r.forEach(async x=>{
            const data = x.data();
            const companyData = await getDoc(data.company);
            const u = data as User;
            u.company = companyData.data() as Company;
            u.company.id = companyData.id;
            u.id = x.id;
    
            resolved(u);
        });
        if(r.empty) {
            reject({  userNull: true });
        }
    });
}
export async function getUserByEmail(email : string) : Promise<User> {

    return new Promise<User>(async (resolved, reject)=>{

        const queries : QueryConstraint[] = [where("email", "==", email)];

        const r =  await getDocs( query(collection(getFirestore(), "users"), ...queries) );

        r.forEach(async x=>{
            const data = x.data();
            const companyData = await getDoc(data.company);
            const u = data as User;
            u.company = companyData.data() as Company;
            u.company.id = companyData.id;
            u.id = x.id;
    
            resolved(u);
        });
        if(r.empty) {
            reject({  userNull: true });
        }
    });
}
export async function getAdminUsers() : Promise<Array<User>> {
 
    const r =  await getDocs( query(collection(getFirestore(), "users"), where("level", "==", "ADMIN")) );
    const users : User[] = [];
    r.forEach(async x=>{
        const data = x.data() as User;
        data.id = x.id;
        users.push(data);
    });
 
    return users;
}