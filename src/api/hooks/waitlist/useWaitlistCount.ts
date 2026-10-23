import { useQuery } from "@tanstack/react-query";
import { getWaitlistCount } from "@/lib/api";

export const useWaitlistCount = () => {
  return useQuery({
    queryKey: ["waitlist-count"],
    queryFn: getWaitlistCount,
    retry: 1,
    staleTime: 60_000,
  });
};

export function positiveWaitlistCount(count: unknown) {
  return typeof count === "number" && Number.isInteger(count) && count > 0
    ? count
    : null;
}
