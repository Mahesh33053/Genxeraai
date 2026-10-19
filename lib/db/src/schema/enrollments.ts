import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const enrollmentsTable = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  program: text("program").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEnrollmentSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid Indian phone number"),
  program: z.string().min(2, "Please select a program"),
});

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollmentsTable.$inferSelect;
