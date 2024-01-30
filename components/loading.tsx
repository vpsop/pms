import { ReloadIcon } from "@radix-ui/react-icons";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full text-gray-500">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            <p className="text-sm">Loading</p>
        </div>
    );
}