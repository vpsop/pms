import { doc, Firestore, getDoc, setDoc } from "firebase/firestore";
import Error from "next/error";

export default async function addCompany(db:Firestore, name: string, description: string, imageURL:string, slug: string) {
    let result = "";
    let error = "";

    try {

        // a ref to the expected doc
        var docRef = doc(db, "comapnies", slug);

        // check if a doc with expected slug already exist
        await getDoc(docRef).then(async (doc) => {
            if(doc.exists()) {
                // Document already exist;
                error = "A company with this slug already exist";
            } else {
                // Document does not exist, create this
                await setDoc(docRef, {
                    name,
                    description,
                    imageURL
                });
                result = "Company added successfully"
            }
        });
    } catch (err:any) {
        error = err;
    }

    return { result, error };
}