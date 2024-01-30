"use client"

import { FIREBASE_CONFIG } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { FirebaseAppProvider, useFirebaseApp } from "reactfire";
import ServicesWrapper from "./services-wrapper";

interface AppWrapperProps {
    children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
    return (
        <FirebaseAppProvider firebaseConfig={FIREBASE_CONFIG}>
            <ServicesWrapper>
                {children}
            </ServicesWrapper>
        </FirebaseAppProvider>
    );
}