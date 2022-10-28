import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "./NavBar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <div>{children}</div>
    </QueryClientProvider>
  );
}
