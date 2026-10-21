import { useLocation, useNavigate } from "react-router-dom";

export function scrollToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
}

export function useJoinWaitlist() {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    const onHome = location.pathname === "/" || location.pathname === "/home";
    if (onHome) {
      scrollToWaitlist();
      return;
    }
    navigate("/#waitlist");
  };
}
