"use client";
import { IPL } from "@/components/ipl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlausibleProvider from "next-plausible";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <PlausibleProvider domain={window.location.hostname}>
      <QueryClientProvider client={queryClient}>
        <IPL />
      </QueryClientProvider>
    </PlausibleProvider>
  );
}
