"use client";

import React from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy } from "firebase/firestore";
import { OPENINGS_COLLECTION } from "@/firebase/config";
import { OpeningTile } from "@/app/(signin-required)/(dashboard)/_components/opening-tile";


export default function ListOpenings() {

    const db = useFirestore();
    const openingsCollection = collection(db, OPENINGS_COLLECTION);
    const q = query(openingsCollection);

    const { status: dataStatus, data: openings } = useFirestoreCollectionData(q, {
        idField: 'id', // this field will be added to the object created from each document
    });

    if (dataStatus === "loading") {
        return <span>data loading...</span>;
    } else {
        return (
            <div className="flex flex-col items-center justify-start w-full h-full">

                <div className="text-start py-10 w-full px-20">
                    <h1 className="text-2xl">
                        All openings
                    </h1>
                    <p className="text-sm text-slate-600">
                        List of all openings currently available.
                    </p>
                </div>


                <div className="w-full px-20 flex gap-5 flex-wrap">
                    {openings.map(function (opening) {
                        return <OpeningTile
                            key={opening.id}
                            id={opening.id}
                            company={opening.companyName}
                            jobDescription={opening.jobDescription}
                            location={opening.jobLocation}
                            position={opening.position}
                            companyImageURL={opening.companyImageURL}
                        />
                    })}
                </div>
            </div>
        );
    }
}