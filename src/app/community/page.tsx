import type { Metadata } from "next";
import CommunityPage from "@/components/waitlist/CommunityPage";

export const metadata: Metadata = {
  title: "Community | Netmifi",
};

export default function Community() {
  return <CommunityPage />;
}
