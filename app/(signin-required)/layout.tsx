"use client"

import { useSigninCheck } from "reactfire";
import Loading from "@/components/loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SignInRequiredLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

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
    <>{children}</>
  );
}

export default SignInRequiredLayout;