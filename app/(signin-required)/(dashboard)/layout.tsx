"use client"

import { useRouter } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { useSigninCheck } from "reactfire";
import Loading from "@/components/loading";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
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
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;