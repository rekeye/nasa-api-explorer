import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./components/Main";
import { AssetsProvider } from "./context/assets";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AssetsProvider>
        <Main />
      </AssetsProvider>
    </QueryClientProvider>
  );
}

export default App;
