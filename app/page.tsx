"use client";
import { IPL } from "@/components/ipl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <IPL />
    </QueryClientProvider>
  );
}
