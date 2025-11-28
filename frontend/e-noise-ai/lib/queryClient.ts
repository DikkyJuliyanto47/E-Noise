import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,   // data dianggap fresh selama 30 detik
      gcTime: 5 * 60 * 1000,  // data dibuang dari memory setelah 5 menit
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});