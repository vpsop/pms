"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema, SignUpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, useFirestore, useSigninCheck } from "reactfire";
import Loading from "@/components/loading";
import registerWithEmailPass from "@/firebase/register";


export default function SignUpPage() {

    const router = useRouter();
    const auth = useAuth();
    const db = useFirestore();
    const { status: signInStatus, data: signInCheckResult } = useSigninCheck();

	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: "",
			password: "",
			course: undefined
		},
    });
    

    if (signInStatus === "loading") {
        return <Loading/>;
    }

    if (signInCheckResult.signedIn === true) {
        router.push("/");
    }


	function onSubmit(data: z.infer<typeof SignUpSchema>) {
		try {
			registerWithEmailPass(auth, db, data.email, data.password, data.name, data.course);
		} catch (err) {
			console.log(err);
		}
	}


	return (
		<main className="flex min-h-screen flex-col items-center space-y-6 p-24">
			<h3 className="text-4xl font-semibold mb-[-10px]">PLACENEXT</h3>
			<h3 className="text-md mb-4">SIGN UP</h3>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-[350px]"
				>
					<div className="space-y-6">

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											// disabled={isPending}
											placeholder="Full name"
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											// disabled={isPending}
											placeholder="email@example.com"
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="course"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Course</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select your course" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="btech">B.Tech</SelectItem>
											<SelectItem value="bca">BCA</SelectItem>
											<SelectItem value="mca">MCA</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											// disabled={isPending}
											placeholder="Create password"
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
						>
							Sign Up
						</Button>
					</div>
				</form>

				<Link href="/login">
					<p className="underline text-sm">Already have an account? Login</p>
				</Link>
			</Form>
		</main>
	);
}
