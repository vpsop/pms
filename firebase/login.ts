import { Auth, signInWithEmailAndPassword } from "firebase/auth";

export default async function loginWithEmailPass(auth:Auth, email:string, password:string) {
    let result = null;
    let error = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password).then((cred) => {
            console.log("Sign In Successful");
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}