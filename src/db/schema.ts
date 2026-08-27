import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  date,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  eventType: varchar("event_type", { length: 60 }).notNull(),
  eventDate: date("event_date").notNull(),
  guests: integer("guests").notNull(),
  package: varchar("package", { length: 80 }),
  message: text("message"),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 60 }).notNull(),
  price: varchar("price", { length: 60 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  role: varchar("role", { length: 160 }).notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull().default(5),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Booking = typeof bookings.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
