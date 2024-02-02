"use client"

import { useRouter } from "next/navigation";
import { Navbar } from "../_components/navbar";
import { useFirestore, useFirestoreDocData, useSigninCheck } from "reactfire";
import Loading from "@/components/loading";
import { doc } from "firebase/firestore";
import { OPENINGS_COLLECTION } from "@/firebase/config";

const DashboardLayout = ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { slug: string };
}) => {

    const db = useFirestore();
    const openingDocRef = doc(db, OPENINGS_COLLECTION, params.slug);

    const { status: dataStatus, data: opening } = useFirestoreDocData(openingDocRef, {
        idField: 'id', // this field will be added to the object created from each document
    });



    if (dataStatus === "loading") {
        return <span>data loading...</span>;
    } else if (opening == undefined) {
        return <span>company not found.</span>;
    } else {
        console.log(opening);
        return (
            <div className="h-screen">
                <div className="h-[80px] fixed inset-y-0 w-full z-50">
                    <Navbar />
                </div>
                <main className="pt-[100px] h-full px-20">
                    <div className="bg-red-300 rounded-md flex items-center">
                        <div className="rounded-md p-4 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={opening.companyImageURL} alt={opening.id} className="h-80 object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col justify-center items-center w-full text-start">
                            <div className="space-y-2">
                                <p className="text-7xl text-white font-bold">
                                    {opening.companyName}
                                </p>
                                <p className="text-2xl text-slate-600 font-bold">
                                    {opening.position}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-start">
                        <h1 className="text-2xl">
                            About {opening.position} opening at {opening.companyName}
                        </h1>
                        <p className="text-sm text-slate-600 mt-2">
                            {opening.jobDescription}
                        </p>
                    </div>
                </main>
            </div>
        );
    }
}

export default DashboardLayout;