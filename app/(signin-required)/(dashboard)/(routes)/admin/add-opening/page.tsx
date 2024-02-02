"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddOpeningSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { COMPANIES_COLLECTION } from "@/firebase/config";
import { collection, query, orderBy } from "firebase/firestore";
import addOpening from "@/firebase/add-opening";


export default function AddOpening() {

    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const db = useFirestore();
    const companiesCollection = collection(db, COMPANIES_COLLECTION);
    const q = query(companiesCollection, orderBy('name', 'asc'));

    const { status: comapniesListStatus, data: companiesList } = useFirestoreCollectionData(q, {
        idField: 'id', // this field will be added to the object created from each document
    });

    const getSelectPlaceholder = () => {
        if (comapniesListStatus === "loading") {
            return <span className="flex items-center"><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading Companies...</span>
        } else if (comapniesListStatus === "error") {
            return <span className="text-destructive">Error Loading comapnies</span>;
        } else {
            return <span>Select Company</span>;
        }
    }

    const getSelectItems = () => {
        if (comapniesListStatus === "loading") {
            return (
                <SelectContent>
                    <SelectItem value="error"><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading Companies...</SelectItem>
                </SelectContent>
            );
        } else if (comapniesListStatus === "error") {
            return (
                <SelectContent>
                    <SelectItem value="error"><span className="text-destructive">Error Loading comapnies</span></SelectItem>
                </SelectContent>
            );
        } else {
            return (
                <SelectContent>
                    {companiesList.map((comapny) => {
                        return <SelectItem key={comapny.id} value={comapny.id}>{comapny.name}</SelectItem>;
                    })}
                </SelectContent>
            );
        }
    }

    const form = useForm<z.infer<typeof AddOpeningSchema>>({
        resolver: zodResolver(AddOpeningSchema),
        defaultValues: {
            positionName: "",
            jobDescription: "",
            company: "",
            jobLocation: "",
            urlSlug: ""
        },
    });

    const onSubmit = (values: z.infer<typeof AddOpeningSchema>) => {
        const data = AddOpeningSchema.safeParse(values);
        if (data.success) {
            startTransition(async () => {
                try {
                    let result = await addOpening(
                        db,
                        data.data.positionName,
                        data.data.jobDescription,
                        data.data.company,
                        data.data.jobLocation,
                        data.data.urlSlug
                    );

                    if (result.error) {
                        toast({
                            title: "An error occured.",
                            description: result.error,
                        });
                    } else {
                        toast({
                            title: "Done",
                            description: result.result,
                        });
                        // router.push("/admin/list-openings");
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
                <div className="mb-10 text-start w-full px-60">
                    <h1 className="text-2xl">
                        Add an Opening
                    </h1>
                    <p className="text-sm text-slate-600">
                        Add an opening where eligible students can apply.
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full px-60 pb-10"
                >
                    <div className="grid grid-cols-2 gap-5">

                        <FormField
                            control={form.control}
                            name="positionName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Eg. Software Developer"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={getSelectPlaceholder()} />
                                            </SelectTrigger>
                                        </FormControl>
                                        {getSelectItems()}
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="jobLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Eg. Bengaluru"
                                            type="text"
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
                                    <FormLabel>Job URL Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Eg. job-1"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="jobDescription"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Job Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Job description"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full col-span-2 mt-5"
                            disabled={isPending}
                        >
                            {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <span>Add Opening</span>}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

