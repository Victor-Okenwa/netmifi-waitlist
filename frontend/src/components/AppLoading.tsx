import { useApp } from "@/app/app-provider";
import { cn } from "@/lib/utils";
import { logoText } from "@/assets/logo";

const AppLoading = () => {
  const { isAppLoading } = useApp();

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 w-full h-full backdrop-blur-lg bg-background/90 z-[100] flex items-center justify-center transition-opacity duration-500",
        isAppLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
<img src={logoText} className="animate-pulse" alt="Logo Netmifi" />
    </div>
  );
};

export default AppLoading;
