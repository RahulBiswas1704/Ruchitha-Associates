import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Ruchitha Associates, our mission, vision, and our 25+ years of experience in recruitment, manpower consulting, and skill development.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
