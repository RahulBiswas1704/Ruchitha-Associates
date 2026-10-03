import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Gallery",
  description: "Explore photos of our placement drives, skill training sessions, corporate office events, and candidate success stories.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
