import { pgTable, text, serial, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  supplier: text("supplier").notNull(),
});

export const insertItemSchema = createInsertSchema(items).pick({
  name: true,
  quantity: true,
  price: true,
  supplier: true,
}).extend({
  quantity: z.number().min(0, "Quantity must be 0 or greater"),
  price: z.number().min(0, "Price must be 0 or greater")
});

export type InsertItem = z.infer<typeof insertItemSchema>;
export type Item = typeof items.$inferSelect;
