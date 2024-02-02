import {z} from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

const COURSES = ["btech", "bca", "mca"] as const;

export const SignUpSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
    name: z.string().min(3, {
        message: "Name is Required."
    }),
    course: z.enum(COURSES)
});


export const AddCompanySchema = z.object({
    name: z.string().min(2, {
        message: "Name is required."
    }),
    description: z.string().min(5, {
        message: "Description is required."
    }),
    imageURL: z.string().min(1, {
        message: "Image URL is required."
    }),
    urlSlug: z.string().min(3, {
        message: "Min 3 characters required in URL slug."
    }),
});

export const AddOpeningSchema = z.object({
    positionName: z.string().min(2, {
        message: "Position name is required."
    }),
    jobDescription: z.string().min(5, {
        message: "Job Description is required."
    }),
    company: z.string().min(1, {
        message: "Company is required."
    }),
    jobLocation: z.string().min(1, {
        message: "Job location is required."
    }),
    urlSlug: z.string().min(3, {
        message: "Min 3 characters required in URL slug."
    }),
});
