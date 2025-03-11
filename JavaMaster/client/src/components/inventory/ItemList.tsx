import { Item } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PackageOpen } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import SearchFilters, { FilterOptions } from "./SearchFilters";
import { useState, useMemo } from "react";

interface ItemListProps {
  items: Item[];
  isLoading: boolean;
  onEdit: (item: Item) => void;
}

export default function ItemList({ items, isLoading, onEdit }: ItemListProps) {
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
    sortBy: "name-asc",
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/items"] });
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    },
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchMatch =
        filters.search === "" ||
        item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.supplier.toLowerCase().includes(filters.search.toLowerCase());

      const priceMatch =
        (filters.minPrice === "" || Number(item.price) >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" || Number(item.price) <= Number(filters.maxPrice));

      const quantityMatch =
        (filters.minQuantity === "" || item.quantity >= Number(filters.minQuantity)) &&
        (filters.maxQuantity === "" || item.quantity <= Number(filters.maxQuantity));

      return searchMatch && priceMatch && quantityMatch;
    });
  }, [items, filters]);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
    const [field, direction] = filters.sortBy.split("-");

    return sorted.sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = Number(a.price) - Number(b.price);
          break;
        case "quantity":
          comparison = a.quantity - b.quantity;
          break;
        default:
          comparison = 0;
      }
      return direction === "asc" ? comparison : -comparison;
    });
  }, [filteredItems, filters.sortBy]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SearchFilters onFilterChange={setFilters} />

      <div className="relative overflow-x-auto">
        {sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <PackageOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">No items found</h3>
            <p className="text-sm text-muted-foreground">
              {items.length === 0
                ? "Add your first inventory item to get started."
                : "Try adjusting your filters to find what you're looking for."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Quantity</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Supplier</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${Number(item.price).toFixed(2)}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(item)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}