"use client"

import { FIREBASE_CONFIG } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { AuthProvider, DatabaseProvider, FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from "reactfire";

interface ServicesWrapperProps {
    children: React.ReactNode;
}

export default function ServicesWrapper({ children }: ServicesWrapperProps) {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const db = getFirestore(app);

    return (
        <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={db}>
                {children}
            </FirestoreProvider>
        </AuthProvider>
    );
}