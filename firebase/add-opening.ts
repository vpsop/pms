import { doc, Firestore, getDoc, setDoc } from "firebase/firestore";

export default async function addOpening(
    db:Firestore, 
    positionName: string, 
    description: string, 
    company:string, 
    location: string,
    slug: string
) {
    let result = "";
    let error = "";

    try {

        // a ref to the expected doc
        var docRef = doc(db, "openings", slug);

        // check if a doc with expected slug already exist
        await getDoc(docRef).then(async (doc) => {
            if(doc.exists()) {
                // Document already exist;
                error = "A opening with this slug already exist";
            } else {
                // Document does not exist, create this
                await setDoc(docRef, {
                    position: positionName,
                    jobDescription: description,
                    company,
                    location,
                });
                result = "Opening added successfully"
            }
        });
    } catch (err:any) {
        error = err;
    }

    return { result, error };
}