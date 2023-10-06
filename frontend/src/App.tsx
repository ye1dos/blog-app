import { MainLayout } from "./components/Layout/MainLayout";
import { AppRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <MainLayout>
                <AppRoutes />
            </MainLayout>
        </QueryClientProvider>
    );
};

export default App;
