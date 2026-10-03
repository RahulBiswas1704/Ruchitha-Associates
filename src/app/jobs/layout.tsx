import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career & Jobs",
  description: "Browse the latest job openings and career opportunities across India in IT, Manufacturing, HR, and BPO sectors with Ruchitha Associates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
