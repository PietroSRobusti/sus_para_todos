import { db } from "./db";
import {
  type Hospital,
  type InsertHospital,
  type Specialty,
  type InsertSpecialty,
  type Appointment,
  type InsertAppointment,
  type News,
  type InsertNews,
  type User,
  type InsertUser,
  type HealthRecord,
  type InsertHealthRecord,
  hospitals,
  specialties,
  appointments,
  news,
  users,
  healthRecords,
} from "@shared/schema";
import { eq, and, gte, sql } from "drizzle-orm";

export interface IStorage {
  // HOSPITAIS
  getHospitals(): Promise<Hospital[]>;
  getHospital(id: string): Promise<Hospital | undefined>;
  createHospital(hospital: InsertHospital): Promise<Hospital>;
  updateHospital(id: string, data: { name?: string; address?: string; phone?: string }): Promise<Hospital | undefined>;
  deleteHospital(id: string): Promise<void>;

  // ESPECIALIDADES
  getSpecialties(): Promise<Specialty[]>;
  getSpecialty(id: string): Promise<Specialty | undefined>;
  createSpecialty(specialty: InsertSpecialty): Promise<Specialty>;
  updateSpecialtyImage(id: string, imageUrl: string): Promise<void>;

  // AGENDAMENTOS
  getAppointments(userId: string): Promise<Appointment[]>;
  getAppointment(id: string, userId: string): Promise<Appointment | undefined>;
  getAppointmentsByDate(date: Date, userId: string): Promise<Appointment[]>;
  createAppointment(appointment: InsertAppointment, userId: string): Promise<Appointment>;
  updateAppointment(id: string, appointment: Partial<InsertAppointment>, userId: string): Promise<Appointment>;
  deleteAppointment(id: string, userId: string): Promise<void>;

  // NOTÍCIAS
  getNews(): Promise<News[]>;
  getNewsItem(id: string): Promise<News | undefined>;
  createNews(newsItem: InsertNews): Promise<News>;
  updateNewsImage(id: string, imageUrl: string): Promise<void>;

  // USUÁRIOS
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  updateUserPassword(id: string, passwordHash: string): Promise<void>;
  updateUserProfile(id: string, data: { email?: string; phone?: string }): Promise<User>;

  // REGISTROS DE SAÚDE
  getHealthRecords(userId: string): Promise<HealthRecord[]>;
  getHealthRecord(id: string, userId: string): Promise<HealthRecord | undefined>;
  createHealthRecord(data: InsertHealthRecord, userId: string): Promise<HealthRecord>;
  updateHealthRecord(id: string, data: Partial<InsertHealthRecord>, userId: string): Promise<HealthRecord | undefined>;
  deleteHealthRecord(id: string, userId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // =====================
  // HOSPITAIS
  // =====================
  async getHospitals(): Promise<Hospital[]> {
    return await db.select().from(hospitals);
  }

  async getHospital(id: string): Promise<Hospital | undefined> {
    const result = await db.select().from(hospitals).where(eq(hospitals.id, id));
    return result[0];
  }

  async createHospital(hospital: InsertHospital): Promise<Hospital> {
    const result = await db.insert(hospitals).values(hospital).returning();
    return result[0];
  }

  async updateHospital(
    id: string,
    data: { name?: string; address?: string; phone?: string }
  ): Promise<Hospital | undefined> {
    const result = await db
      .update(hospitals)
      .set(data)
      .where(eq(hospitals.id, id))
      .returning();
    return result[0];
  }

  async deleteHospital(id: string): Promise<void> {
    await db.delete(hospitals).where(eq(hospitals.id, id));
  }

  // =====================
  // ESPECIALIDADES
  // =====================
  async getSpecialties(): Promise<Specialty[]> {
    return await db.select().from(specialties);
  }

  async getSpecialty(id: string): Promise<Specialty | undefined> {
    const result = await db.select().from(specialties).where(eq(specialties.id, id));
    return result[0];
  }

  async createSpecialty(specialty: InsertSpecialty): Promise<Specialty> {
    const result = await db.insert(specialties).values(specialty).returning();
    return result[0];
  }

  async updateSpecialtyImage(id: string, imageUrl: string): Promise<void> {
    await db.update(specialties).set({ imageUrl }).where(eq(specialties.id, id));
  }

  // =====================
  // AGENDAMENTOS
  // =====================
  async getAppointments(userId: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.userId, userId));
  }

  async getAppointment(id: string, userId: string): Promise<Appointment | undefined> {
    const result = await db
      .select()
      .from(appointments)
      .where(and(eq(appointments.id, id), eq(appointments.userId, userId)));
    return result[0];
  }

  async getAppointmentsByDate(date: Date, userId: string): Promise<Appointment[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await db
      .select()
      .from(appointments)
      .where(and(gte(appointments.appointmentDate, startOfDay), eq(appointments.userId, userId)));
  }

  async createAppointment(appointment: InsertAppointment, userId: string): Promise<Appointment> {
    const result = await db.insert(appointments).values({ ...appointment, userId }).returning();
    return result[0];
  }

  async updateAppointment(
    id: string,
    appointment: Partial<InsertAppointment>,
    userId: string
  ): Promise<Appointment> {
    const result = await db
      .update(appointments)
      .set(appointment)
      .where(and(eq(appointments.id, id), eq(appointments.userId, userId)))
      .returning();
    return result[0];
  }

  async deleteAppointment(id: string, userId: string): Promise<void> {
    await db.delete(appointments).where(and(eq(appointments.id, id), eq(appointments.userId, userId)));
  }

  // =====================
  // NOTÍCIAS
  // =====================
  async getNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(sql`${news.publishedAt} DESC`);
  }

  async getNewsItem(id: string): Promise<News | undefined> {
    const result = await db.select().from(news).where(eq(news.id, id));
    return result[0];
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const result = await db.insert(news).values(newsItem).returning();
    return result[0];
  }

  async updateNewsImage(id: string, imageUrl: string): Promise<void> {
    await db.update(news).set({ imageUrl }).where(eq(news.id, id));
  }

  // =====================
  // USUÁRIOS
  // =====================
  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async getUserById(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async updateUserPassword(id: string, passwordHash: string): Promise<void> {
    await db.update(users).set({ passwordHash }).where(eq(users.id, id));
  }

  async updateUserProfile(id: string, data: { email?: string; phone?: string }): Promise<User> {
    const result = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result[0];
  }

  // =====================
  // REGISTROS DE SAÚDE
  // =====================
  async getHealthRecords(userId: string): Promise<HealthRecord[]> {
    const result = await db
      .select()
      .from(healthRecords)
      .where(eq(healthRecords.userId, userId))
      .orderBy(sql`${healthRecords.date} DESC`);
    return result;
  }

  async getHealthRecord(id: string, userId: string): Promise<HealthRecord | undefined> {
    const result = await db
      .select()
      .from(healthRecords)
      .where(and(eq(healthRecords.id, id), eq(healthRecords.userId, userId)));
    return result[0];
  }

  async createHealthRecord(data: InsertHealthRecord, userId: string): Promise<HealthRecord> {
    const result = await db.insert(healthRecords).values({ ...data, userId }).returning();
    return result[0];
  }

  async updateHealthRecord(
    id: string,
    data: Partial<InsertHealthRecord>,
    userId: string
  ): Promise<HealthRecord | undefined> {
    const result = await db
      .update(healthRecords)
      .set(data)
      .where(and(eq(healthRecords.id, id), eq(healthRecords.userId, userId)))
      .returning();
    return result[0];
  }

  async deleteHealthRecord(id: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(healthRecords)
      .where(and(eq(healthRecords.id, id), eq(healthRecords.userId, userId)))
      .returning({ id: healthRecords.id });
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
