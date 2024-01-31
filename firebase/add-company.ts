import { addDoc, collection, Firestore } from "firebase/firestore";

export default async function addCompany(db:Firestore, name: string, description: string) {
    let result = null;
    let error = null;

    try {
        const ref = collection(db, "comapnies");
        result = await addDoc(ref, {
            name,
            description
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}