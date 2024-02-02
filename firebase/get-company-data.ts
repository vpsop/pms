import { doc, DocumentData, Firestore, getDoc } from "firebase/firestore";
import { COMPANIES_COLLECTION } from "./config";

export default async function getCompanyDataFromSlug(
    db:Firestore, 
    slug: string
) {
    let result: DocumentData | undefined;
    let error = null;

    try {
        // a ref to the expected doc
        var docRef = doc(db, COMPANIES_COLLECTION, slug);
        console.log("SEARCHING COMPANY DATA FOR: ", slug);
        
        // check if a doc with expected slug already exist
        await getDoc(docRef).then(async (doc) => {
            if (!doc.exists()) {
                // Document already exist;
                error = "Company with this ID does not exist.";
            } else {
                // Document does not exist, create this
                if (doc.data() !== undefined) {
                    result = doc.data()!;
                }
            }
        });
    } catch (err) {
        error = err;
    }

    if (error) { console.log("GET COMPANY DATA ERROR: ", error); }
    
    return { result, error };
}