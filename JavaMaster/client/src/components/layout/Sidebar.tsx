import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  PackageOpen,
  BarChart3,
  Users,
  Settings,
  Truck,
  AlertCircle,
} from "lucide-react";

const menuItems = [
  { icon: PackageOpen, label: "Inventory", path: "/" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Users, label: "Suppliers", path: "/suppliers" },
  { icon: Truck, label: "Orders", path: "/orders" },
  { icon: AlertCircle, label: "Low Stock", path: "/low-stock" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white border-r shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <PackageOpen className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">Inventory Pro</span>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}