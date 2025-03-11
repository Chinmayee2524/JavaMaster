import { items, type Item, type InsertItem } from "@shared/schema";

export interface IStorage {
  getAllItems(): Promise<Item[]>;
  getItem(id: number): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
  updateItem(id: number, item: InsertItem): Promise<Item | undefined>;
  deleteItem(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private items: Map<number, Item>;
  private currentId: number;

  constructor() {
    this.items = new Map();
    this.currentId = 1;
  }

  async getAllItems(): Promise<Item[]> {
    return Array.from(this.items.values());
  }

  async getItem(id: number): Promise<Item | undefined> {
    return this.items.get(id);
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const id = this.currentId++;
    const item: Item = { ...insertItem, id };
    this.items.set(id, item);
    return item;
  }

  async updateItem(id: number, updateItem: InsertItem): Promise<Item | undefined> {
    const existingItem = await this.getItem(id);
    if (!existingItem) return undefined;

    const updatedItem: Item = { ...updateItem, id };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  async deleteItem(id: number): Promise<boolean> {
    return this.items.delete(id);
  }
}

export const storage = new MemStorage();
