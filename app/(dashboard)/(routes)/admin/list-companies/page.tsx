"use client";

import React, { useTransition } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy } from "firebase/firestore";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CourseCard } from "@/app/(dashboard)/_components/card";


export default function ListCompanies() {

    const db = useFirestore();
    const companiesCollection = collection(db, "comapnies");
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

            
                    {companies.map(function (company) {
                        return <CourseCard key={company.id} id={""} title={""} imageUrl={company.imageURL} chaptersLength={0} category={""}/>;
                    })}
            </div>
        );
    }
}