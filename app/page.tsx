"use client";

import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import React from "react";
import { useSigninCheck } from "reactfire";

export default function Home() {

  const router = useRouter();
  const { status: signInStatus, data: signInCheckResult } = useSigninCheck();
  
  if (signInStatus === "loading") {
    return <Loading/>;
  }

  if (signInCheckResult.signedIn === true) {
    return (
      <div className="flex items-center justify-center w-full">
        <p>Dashboard [Protected Route]</p>
      </div>
    );
  } else {
    router.push("/login");
  }
}