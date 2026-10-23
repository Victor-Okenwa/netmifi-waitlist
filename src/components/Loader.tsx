import { FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
  type: "text" | "loader" | "all";
  size?: number;
};

const Loader = ({ className = "", type, size = 20 }: LoaderProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {(type === "all" || type === "loader") && (
        <FaSpinner size={size} className="animate-spin" />
      )}
      {(type === "all" || type === "text") && (
        <span className="animate-pulse font-montserrat">Loading...</span>
      )}
    </div>
  );
};

export default Loader;
