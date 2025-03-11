import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export interface FilterOptions {
  search: string;
  minPrice: string;
  maxPrice: string;
  minQuantity: string;
  maxQuantity: string;
  sortBy: string;
}

interface SearchFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    maxQuantity: "",
    sortBy: "name-asc",
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      search: "",
      minPrice: "",
      maxPrice: "",
      minQuantity: "",
      maxQuantity: "",
      sortBy: "name-asc",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items or suppliers..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low-High)</SelectItem>
            <SelectItem value="price-desc">Price (High-Low)</SelectItem>
            <SelectItem value="quantity-asc">Quantity (Low-High)</SelectItem>
            <SelectItem value="quantity-desc">Quantity (High-Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <div className="grid grid-cols-2 gap-2 flex-1">
          <Input
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 flex-1">
          <Input
            type="number"
            placeholder="Min quantity"
            value={filters.minQuantity}
            onChange={(e) => handleFilterChange("minQuantity", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max quantity"
            value={filters.maxQuantity}
            onChange={(e) => handleFilterChange("maxQuantity", e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={resetFilters}
          className="shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
