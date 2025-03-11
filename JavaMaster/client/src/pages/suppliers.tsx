import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Suppliers() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Supplier Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your suppliers and vendor relationships
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Supplier management features are under development
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
