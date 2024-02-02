"use client";

import React, { useTransition } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy } from "firebase/firestore";
import { CompanyCard } from "@/app/(signin-required)/(dashboard)/_components/company-card";
import { COMPANIES_COLLECTION } from "@/firebase/config";


export default function ListCompanies() {

    const db = useFirestore();
    const companiesCollection = collection(db, COMPANIES_COLLECTION);
    const q = query(companiesCollection, orderBy('name', 'asc'));

    const { status: dataStatus, data: companies } = useFirestoreCollectionData(q, {
        idField: 'id', // this field will be added to the object created from each document
    });

    if (dataStatus === "loading") {
        return <span>data loading...</span>;
    } else {
        return (
            <div className="flex flex-col items-center justify-start w-full h-full">

                <div className="text-start py-10 w-full px-20">
                    <h1 className="text-2xl">
                        All Companies
                    </h1>
                    <p className="text-sm text-slate-600">
                        List of all companies can come to your college for placement drive.
                    </p>
                </div>


                <div className="w-full px-20 flex gap-5 flex-wrap">
                    {companies.map(function (company) {
                        return <CompanyCard key={company.id} id={company.id} title={company.name} imageUrl={company.imageURL} category={"Product Based"} />;
                    })}
                </div>
            </div>
        );
    }
}