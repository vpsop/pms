"use client";

import * as z from "zod";
// import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSigninCheck } from "reactfire";
import Loading from "@/components/loading";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export default function AdminDashboard () {
  const router = useRouter();
  const { status: signInStatus, data: signInCheckResult } = useSigninCheck();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    //   const response = await axios.post("/api/courses", values);
    //   router.push(`/teacher/courses/${response.data.id}`);
    //   toast.success("Course created");
    } catch {
    //   toast.error("Something went wrong");
    }
  }

  if (signInStatus === "loading") {
    return <Loading/>;
  }

  if (signInCheckResult.signedIn === true) {
    return ( 
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        Admin Cumulative Dashboard 
      </div>
     );
  } else {
    router.push("/login");
  }
}