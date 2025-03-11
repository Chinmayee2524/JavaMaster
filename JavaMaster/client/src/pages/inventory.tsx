import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Item } from "@shared/schema";
import ItemList from "@/components/inventory/ItemList";
import ItemForm from "@/components/inventory/ItemForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Filter, Download, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Inventory() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: ["/api/items"],
  });

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  // Calculate summary statistics
  const totalItems = items?.length || 0;
  const totalValue = items?.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0) || 0;
  const lowStock = items?.filter(item => item.quantity < 10).length || 0;

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Inventory Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your inventory items
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button
              size="sm"
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalValue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Current inventory worth
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStock}</div>
              <p className="text-xs text-muted-foreground">
                Items below 10 units
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemList items={items || []} isLoading={isLoading} onEdit={handleEdit} />
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
            <DialogDescription>
              {editingItem 
                ? "Modify the details of your inventory item below." 
                : "Fill in the details to add a new item to your inventory."}
            </DialogDescription>
          </DialogHeader>
          <ItemForm
            item={editingItem}
            onSuccess={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}