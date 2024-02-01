"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddCompanySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import addCompany from "@/firebase/add-company";
import { useFirestore } from "reactfire";
import { useToast } from "@/components/ui/use-toast"
import { error } from "console";


export default function AddCompany() {

    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const db = useFirestore();

    const form = useForm<z.infer<typeof AddCompanySchema>>({
        resolver: zodResolver(AddCompanySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = (values: z.infer<typeof AddCompanySchema>) => {
        const data = AddCompanySchema.safeParse(values);
        if (data.success) {
            startTransition(async () => {
                try {
                    let result = await addCompany(db, data.data.name, data.data.description, data.data.imageURL, data.data.urlSlug);

                    if(result.error) {
                        toast({
                            title: "An error occured.",
                            description: result.error,
                        });
                    } else {
                        toast({
                            title: "Done",
                            description: result.result,
                        });
                        router.push("/admin/list-companies");
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        }
    }

    return (
        <div className="flex flex-col items-center justify-start w-full h-full pt-10">
            <Form {...form}>
                <div className="mb-8 text-start w-[500px]">
                    <h1 className="text-2xl">
                        Add a Company
                    </h1>
                    <p className="text-sm text-slate-600">
                        Add a company that can come to your college for placement drive.
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-[500px]"
                >
                    <div className="space-y-8">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Eg. Google"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Company description"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="urlSlug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Eg. google"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="imageURL"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>imageURL</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Eg. URL to cover image of company"
                                            type="text"
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
                            {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <span>Add Company</span>}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

