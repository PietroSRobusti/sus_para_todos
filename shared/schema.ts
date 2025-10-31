import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

//
// ==========================
// TABELAS
// ==========================
//

export const hospitals = pgTable("hospitals", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
});

export const specialties = pgTable("specialties", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  imageUrl: text("image_url"),
});

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  hospitalId: varchar("hospital_id")
    .notNull()
    .references(() => hospitals.id),
  specialtyId: varchar("specialty_id")
    .notNull()
    .references(() => specialties.id),
  serviceType: text("service_type").notNull(),
  patientName: text("patient_name").notNull(),
  patientCPF: text("patient_cpf").notNull(),
  patientBirth: text("patient_birth").notNull(),
  patientPhone: text("patient_phone").notNull(),
  appointmentDate: timestamp("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const news = pgTable("news", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

export const healthRecords = pgTable("health_records", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),      // Ex: "Vacina Hepatite B", "Exame Hemograma"
  date: timestamp("date").notNull(),   // Quando tomou/fez
  notes: text("notes"),                // Observações
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//
// ==========================
// SCHEMAS DE INSERÇÃO (ZOD)
// ==========================
//

// hospitais
export const insertHospitalSchema = createInsertSchema(hospitals).omit({
  id: true,
});

// especialidades
export const insertSpecialtySchema = createInsertSchema(specialties).omit({
  id: true,
});

// agendamentos
export const insertAppointmentSchema = createInsertSchema(appointments)
  .omit({
    id: true,
    userId: true,
    createdAt: true,
  })
  .extend({
    // appointmentDate no corpo da requisição pode chegar string
    appointmentDate: z.coerce.date(),
  });

// notícias
export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  publishedAt: true,
});

// usuários
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

//
// >>> AQUI ESTÁ O PONTO IMPORTANTE <<<
// Precisamos aceitar `date` vindo como string do front (ex: "2025-11-01")
// e transformar em Date antes de validar.
// z.preprocess permite fazer isso.
//

const zDateFromString = z.preprocess((value) => {
  // se vier string tipo "2025-11-01" (do <input type="date" />)
  if (typeof value === "string") {
    // cria um objeto Date a partir dessa string
    return new Date(value);
  }
  // se já veio Date, mantém
  return value;
}, z.date());

// registros de saúde
export const insertHealthRecordSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  date: zDateFromString,           // <--- aceita string ou Date
  notes: z.string().optional(),
});

//
// ==========================
// TIPOS (TypeScript p/ front e back)
// ==========================
//

export type Hospital = typeof hospitals.$inferSelect;
export type InsertHospital = z.infer<typeof insertHospitalSchema>;

export type Specialty = typeof specialties.$inferSelect;
export type InsertSpecialty = z.infer<typeof insertSpecialtySchema>;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type HealthRecord = typeof healthRecords.$inferSelect;
export type InsertHealthRecord = z.infer<typeof insertHealthRecordSchema>;
