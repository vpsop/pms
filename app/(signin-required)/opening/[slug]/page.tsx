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

    const router = useRouter();
    const { status: signInStatus, data: signInCheckResult } = useSigninCheck();


    const db = useFirestore();
    const companyDocRef = doc(db, OPENINGS_COLLECTION, params.slug);

    const { status: dataStatus, data: company } = useFirestoreDocData(companyDocRef, {
        idField: 'id', // this field will be added to the object created from each document
    });



    if (dataStatus === "loading") {
        return <span>data loading...</span>;
    } else if (company == undefined) {
        return <span>company not found.</span>;
    } else {
        console.log(company);
        return (
            <div className="h-screen">
                <div className="h-[80px] fixed inset-y-0 w-full z-50">
                    <Navbar />
                </div>
                <main className="pt-[100px] h-full px-20">
                    <div className="bg-red-300 rounded-md flex items-center">
                        <div className="rounded-md p-4 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={company.imageURL} alt={company.id} className="h-80 object-cover rounded-md" />
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <p className="text-7xl text-white font-bold">
                                {company.name}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-start">
                        <h1 className="text-2xl">
                            About {company.name}
                        </h1>
                        <p className="text-sm text-slate-600 mt-2">
                            {company.description}
                        </p>
                    </div>
                </main>
            </div>
        );
    }
}

export default DashboardLayout;