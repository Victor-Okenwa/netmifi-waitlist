import { useMutation } from "@tanstack/react-query";
import { waitlist } from "@/api/waitlist";

export const useWaitlist = () => {
    return useMutation({
        mutationFn: waitlist,
        onError: (error) => {
            console.error("Enlist Error:", error);
        },
    });
};
