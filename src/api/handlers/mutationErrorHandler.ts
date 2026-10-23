import { toast } from "sonner";
import { ApiError } from "@/lib/api";

export default function mutationErrorHandler(error?: unknown) {
  if (error instanceof ApiError) {
    const details = error.data.errors?.details;
    if (details && details.length > 0) {
      details.forEach((detail) => toast.error(detail.message));
      return;
    }
    toast.error(error.data.message || error.message || "Something went wrong");
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message || "Something went wrong");
    return;
  }

  toast.error("Something went wrong");
}
