import { Auth, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Firestore, addDoc, collection } from "firebase/firestore";

export default async function registerWithEmailPass(
    auth: Auth,
    db: Firestore,
    email: string,
    password: string,
    name: string,
    course: string
) {
    let result = null;
    let error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password).then((cred) => {
            let ref = collection(db, "users");
            addDoc(ref, {
                userId: cred.user.uid,
                email,
                name,
                course
            });
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}