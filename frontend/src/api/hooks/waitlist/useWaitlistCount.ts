import { useQuery } from "@tanstack/react-query";
import instance from "@/api/instance";

const getWaitlistCount = async () => {
  const response = await instance.get("/waitlist/count", {
    timeout: 15000,
  });
  return response.data as { count: number };
};

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
