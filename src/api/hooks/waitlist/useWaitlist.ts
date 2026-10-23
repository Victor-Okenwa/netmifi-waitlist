import { useMutation } from "@tanstack/react-query";
import { joinWaitlist } from "@/lib/api";

export const useWaitlist = () => {
  return useMutation({
    mutationFn: joinWaitlist,
    onError: (error) => {
      console.error("Enlist Error:", error);
    },
  });
};
