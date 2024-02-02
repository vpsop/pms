import { doc, Firestore, getDoc, setDoc } from "firebase/firestore";
import getCompanyDataFromSlug from "./get-company-data";

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
        var companyData = await getCompanyDataFromSlug(db, company);

        // check if a doc with expected slug already exist
        await getDoc(docRef).then(async (doc) => {
            if(doc.exists()) {
                // Document already exist;
                error = "A opening with this slug already exist";
            } else if (companyData.result === undefined) {
                error = "Failed to get data of selected company data from server.";
            } else if (companyData.error != null) {
                error = "Company data error is not null" + companyData.error;
            } else {
                // Document does not exist, create this
                await setDoc(docRef, {
                    position: positionName,
                    jobDescription: description,
                    companySlug: company,
                    location,
                    companyName: companyData.result["name"],
                    companyImageURL: companyData.result["imageURL"]
                });
                result = "Opening added successfully"
            }
        });
    } catch (err:any) {
        error = err;
    }

    return { result, error };
}