"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useAuth, useUser } from "reactfire";

export function UserButton() {


    const { status, data: user } = useUser();
    const auth = useAuth();

    if (status === "loading") {
        return (
            <div></div>
        );
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src={user?.photoURL || "https://github.com/shadcn.png"} alt="profile_image" />
                    <AvatarFallback>VA</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent>
                <p onClick={async () => {
                    try {
                        await auth.signOut();
                    } catch (err) {
                        console.log(err);
                    }
                }} className="cursor-pointer">Log Out</p>
            </PopoverContent>
        </Popover>
    )
}
