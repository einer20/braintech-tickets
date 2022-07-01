
import { getFirestore,where, query, addDoc,collection, setDoc, getDocs, getDoc, doc} from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';
import Company from '../models/Company';
import User from '../models/User';

export async function getUser(user : string, pass : string) : Promise<User> {
 
    return new Promise<User>(async (resolved, reject)=>{

        const r =  await getDocs( query(collection(getFirestore(), "users"), where("user", "==", user)) );

        r.forEach(async x=>{
            const data = x.data();
            const companyData = await getDoc(data.company);
            const u = data as User;
            u.company = companyData.data() as Company;
            u.company.id = companyData.id;
            u.id = x.id;
    
            resolved(u);
        });

    });
}