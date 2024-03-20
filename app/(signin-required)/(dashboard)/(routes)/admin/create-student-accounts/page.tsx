"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddOpening() {

    const [selectedFile, setSelectedFile] = useState<string | null>(null)

    const form = useForm({
        defaultValues: {
            positionName: "",
            jobDescription: "",
            company: "",
            jobLocation: "",
            urlSlug: ""
        },
    });

    const onSubmit = () => {

    }

    const fileInputChnage = (ev: any) => {
        
        let filePath: string = ev.target.value;       
        let arr = filePath.split("C:\\fakepath\\");

        if (arr.length > 1) {
            setSelectedFile(arr[1]);
        }
    }

    return (
        <div className="flex flex-col items-center justify-start w-full h-full pt-10">

            <Form {...form}>
                <div className="mb-10 text-start w-full px-60">
                    <h1 className="text-2xl">
                        Create Accounts
                    </h1>
                    <p className="text-sm text-slate-600">
                        Create Student Accounts in bulk using XLSX file.
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full px-60 pb-10"
                >
                    <div>

                        <FormField
                            control={form.control}
                            name="positionName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <label className="flex justify-center items-center h-[200px] p-4 gap-3 rounded-md border border-gray-300 border-dashed bg-gray-50 cursor-pointer text-center">
                                            <input
                                                {...field}
                                                id="doc"
                                                type="file"
                                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                hidden={true}
                                                onChange={fileInputChnage}
                                            />
                                            <div className="">
                                                <h4 className="font-bold text-base">Upload a XLXS file</h4>
                                                <span className="text-sm">
                                                    {selectedFile == null ? "No file Selected" : selectedFile}
                                                </span>
                                            </div>
                                        </label>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full col-span-2 mt-5"
                        // disabled={isPending}
                        >
                            {/* {isPending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <span>Add Opening</span>} */}
                            Create Accounts
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

