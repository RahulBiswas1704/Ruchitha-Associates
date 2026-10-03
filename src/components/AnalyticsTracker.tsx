"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/actions";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Initialize or get session ID
    let currentSessionId = localStorage.getItem("analytics_session_id");
    if (!currentSessionId) {
      currentSessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("analytics_session_id", currentSessionId);
    }
    setSessionId(currentSessionId);
  }, []);

  useEffect(() => {
    // Only track if it's not an admin route and sessionId is ready
    if (pathname && !pathname.startsWith("/admin") && sessionId) {
      trackPageView(pathname, document.referrer, navigator.userAgent, sessionId).catch(() => {});
    }
  }, [pathname, sessionId]);

  return null;
}
