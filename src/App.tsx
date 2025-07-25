import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundDotGrid } from "@/components/ui/background-dot-grid";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Background dot grid */}
      <BackgroundDotGrid />

      {/* Main content */}
      <div className="relative z-10">
        <Outlet />
      </div>

      {/* UI overlays */}
      <Toaster theme="light" />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
