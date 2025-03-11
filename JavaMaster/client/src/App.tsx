import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Inventory from "@/pages/inventory";
import Analytics from "@/pages/analytics";
import Suppliers from "@/pages/suppliers";
import Orders from "@/pages/orders";
import LowStock from "@/pages/low-stock";
import Settings from "@/pages/settings";
import Sidebar from "@/components/layout/Sidebar";

function Router() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path="/" component={Inventory} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/suppliers" component={Suppliers} />
          <Route path="/orders" component={Orders} />
          <Route path="/low-stock" component={LowStock} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;