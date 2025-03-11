import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertItemSchema } from "@shared/schema";
import { z } from "zod";

const idSchema = z.number().int().positive();

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/items", async (_req, res) => {
    const items = await storage.getAllItems();
    res.json(items);
  });

  app.get("/api/items/:id", async (req, res) => {
    try {
      const id = idSchema.parse(Number(req.params.id));
      const item = await storage.getItem(id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: "Invalid item ID" });
    }
  });

  app.post("/api/items", async (req, res) => {
    try {
      const itemData = insertItemSchema.parse(req.body);
      const newItem = await storage.createItem(itemData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create item" });
    }
  });

  app.put("/api/items/:id", async (req, res) => {
    try {
      const id = idSchema.parse(Number(req.params.id));
      const itemData = insertItemSchema.parse(req.body);
      const updatedItem = await storage.updateItem(id, itemData);
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(updatedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid item data", errors: error.errors });
      }
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.delete("/api/items/:id", async (req, res) => {
    try {
      const id = idSchema.parse(Number(req.params.id));
      const success = await storage.deleteItem(id);
      if (!success) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Invalid item ID" });
    }
  });

  return createServer(app);
}
