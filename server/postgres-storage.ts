import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, routines, conversionJobs } from "@shared/schema";
import type { 
  User, 
  InsertUser, 
  Routine, 
  InsertRoutine,
  ConversionJob,
  InsertConversionJob 
} from "@shared/schema";
import type { IStorage } from "./storage";

export class PostgreSQLStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Routine methods
  async getRoutine(id: string): Promise<Routine | undefined> {
    const result = await db.select().from(routines).where(eq(routines.id, id));
    return result[0];
  }

  async getAllRoutines(): Promise<Routine[]> {
    return await db.select().from(routines).orderBy(routines.title);
  }

  async createRoutine(routine: InsertRoutine): Promise<Routine> {
    const result = await db.insert(routines).values(routine).returning();
    return result[0];
  }

  async updateRoutine(id: string, updates: Partial<InsertRoutine>): Promise<Routine | undefined> {
    const result = await db.update(routines)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(routines.id, id))
      .returning();
    return result[0];
  }

  async deleteRoutine(id: string): Promise<boolean> {
    const result = await db.delete(routines).where(eq(routines.id, id)).returning();
    return result.length > 0;
  }

  // Conversion job methods
  async getConversionJob(id: string): Promise<ConversionJob | undefined> {
    const result = await db.select().from(conversionJobs).where(eq(conversionJobs.id, id));
    return result[0];
  }

  async getAllConversionJobs(): Promise<ConversionJob[]> {
    return await db.select().from(conversionJobs).orderBy(conversionJobs.createdAt);
  }

  async createConversionJob(job: InsertConversionJob): Promise<ConversionJob> {
    const result = await db.insert(conversionJobs).values(job).returning();
    return result[0];
  }

  async updateConversionJob(id: string, updates: Partial<ConversionJob>): Promise<ConversionJob | undefined> {
    const result = await db.update(conversionJobs)
      .set(updates)
      .where(eq(conversionJobs.id, id))
      .returning();
    return result[0];
  }
}