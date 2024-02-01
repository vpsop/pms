import { doc, DocumentData, Firestore, getDoc } from "firebase/firestore";

export default async function getCompanyDataFromSlug(
    db:Firestore, 
    slug: string
) {
    let result: DocumentData | undefined;
    let error = null;

    try {
        // a ref to the expected doc
        var docRef = doc(db, "openings", slug);

        // check if a doc with expected slug already exist
        await getDoc(docRef).then(async (doc) => {
            if(doc.exists()) {
                // Document already exist;
                error = "Company with this ID does not exist.";
            } else {
                // Document does not exist, create this
                
                result = doc.data();
            }
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}