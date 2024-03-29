"use client";

import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSigninCheck } from "reactfire";
import { Navbar } from "./(signin-required)/(dashboard)/_components/navbar";
import { Sidebar } from "./(signin-required)/(dashboard)/_components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AdminDashboard from "@/components/admin-dashboard";

export default function Home() {

  const router = useRouter();
  const { status: signInStatus, data: signInCheckResult } = useSigninCheck();

  useEffect(() => {
		if (signInCheckResult && signInCheckResult.signedIn === false) {
			router.push("/login");
		}
	}, [router, signInCheckResult]);

  if (signInStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="h-screen">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <Toaster />
        <AdminDashboard />
      </main>
    </div>
  );
}