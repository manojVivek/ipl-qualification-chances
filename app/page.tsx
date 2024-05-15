"use client";
import { IPL } from "@/components/ipl";
import { Icon } from "@iconify/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="https://github.com/manojVivek/ipl-qualification-chances"
        className="absolute top-5 right-5"
        target="_blank"
      >
        <Icon icon="mdi:github" height={32} width={32} />
      </a>
      <IPL />
    </QueryClientProvider>
  );
}
