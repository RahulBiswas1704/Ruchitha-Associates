import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Ruchitha Associates for placement support, manpower consulting, or career guidance. Find our office locations in Telangana.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
