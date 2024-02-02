"use client"

import { useRouter } from "next/navigation";
import { useSigninCheck } from "reactfire";
import Loading from "@/components/loading";

const SignInRequiredLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const router = useRouter();
  const { status: signInStatus, data: signInCheckResult } = useSigninCheck();


  if (signInStatus === "loading") {
    return <Loading />;
  }

  if (signInCheckResult.signedIn === true) {
    return (
        <>{children}</>
    );
  } else {
    router.push("/login");
  }
}

export default SignInRequiredLayout;