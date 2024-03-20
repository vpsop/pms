"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAuth, useSigninCheck, useUser } from "reactfire";
import Loading from "@/components/loading";
import loginWithEmailPass from "@/firebase/login";


export default function LoginPage() {

	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const auth = useAuth();
	const { status: signInStatus, data: signInCheckResult } = useSigninCheck();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});


	function onSubmit(data: z.infer<typeof LoginSchema>) {
		startTransition(async () => {
			try {
				await loginWithEmailPass(auth, data.email, data.password);
			} catch (err) {
				console.log(err);
			}
		});
	}

	if (signInStatus === "loading") {
		return <Loading />;
	}

	if (signInCheckResult.signedIn === true) {
		router.push("/");
	}

	return (
		<main className="flex min-h-screen flex-col items-center space-y-6 p-24">
			<h3 className="text-4xl font-semibold mb-[-10px]">PLACENEXT</h3>
			<h3 className="text-md mb-4">LOGIN</h3>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-[350px]"
				>
					<div className="space-y-6">

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="Your Email"
											type="email"
										/>
									</FormControl>
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
											disabled={isPending}
											placeholder="Your password"
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
							disabled={isPending}
						>
							{isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <span>Log in</span>}
						</Button>
					</div>
				</form>

				<Link href="/register">
					<p className="underline text-sm">Dont have an account? Create</p>
				</Link>
			</Form>
		</main>
	);
}
