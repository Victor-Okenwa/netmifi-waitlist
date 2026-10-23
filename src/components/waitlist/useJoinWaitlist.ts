"use client";

import { usePathname, useRouter } from "next/navigation";

export function scrollToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
}

export function useJoinWaitlist() {
  const pathname = usePathname();
  const router = useRouter();

  return () => {
    const onHome = pathname === "/" || pathname === "/home";
    if (onHome) {
      scrollToWaitlist();
      return;
    }
    router.push("/#waitlist");
  };
}
