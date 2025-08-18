import { 
  type User, 
  type InsertUser, 
  type Routine, 
  type InsertRoutine,
  type ConversionJob,
  type InsertConversionJob 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Routine methods
  getRoutine(id: string): Promise<Routine | undefined>;
  getAllRoutines(): Promise<Routine[]>;
  createRoutine(routine: InsertRoutine): Promise<Routine>;
  updateRoutine(id: string, updates: Partial<InsertRoutine>): Promise<Routine | undefined>;
  deleteRoutine(id: string): Promise<boolean>;
  
  // Conversion job methods
  getConversionJob(id: string): Promise<ConversionJob | undefined>;
  getAllConversionJobs(): Promise<ConversionJob[]>;
  createConversionJob(job: InsertConversionJob): Promise<ConversionJob>;
  updateConversionJob(id: string, updates: Partial<ConversionJob>): Promise<ConversionJob | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private routines: Map<string, Routine>;
  private conversionJobs: Map<string, ConversionJob>;

  constructor() {
    this.users = new Map();
    this.routines = new Map();
    this.conversionJobs = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Routine methods
  async getRoutine(id: string): Promise<Routine | undefined> {
    return this.routines.get(id);
  }

  async getAllRoutines(): Promise<Routine[]> {
    return Array.from(this.routines.values());
  }

  async createRoutine(insertRoutine: InsertRoutine): Promise<Routine> {
    const id = randomUUID();
    const now = new Date();
    const routine: Routine = { 
      ...insertRoutine,
      htmlContent: insertRoutine.htmlContent || null,
      originalFilename: insertRoutine.originalFilename || null,
      conversionMethod: insertRoutine.conversionMethod || null,
      id, 
      createdAt: now,
      updatedAt: now 
    };
    this.routines.set(id, routine);
    return routine;
  }

  async updateRoutine(id: string, updates: Partial<InsertRoutine>): Promise<Routine | undefined> {
    const existing = this.routines.get(id);
    if (!existing) return undefined;
    
    const updated: Routine = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };
    this.routines.set(id, updated);
    return updated;
  }

  async deleteRoutine(id: string): Promise<boolean> {
    return this.routines.delete(id);
  }

  // Conversion job methods
  async getConversionJob(id: string): Promise<ConversionJob | undefined> {
    return this.conversionJobs.get(id);
  }

  async getAllConversionJobs(): Promise<ConversionJob[]> {
    return Array.from(this.conversionJobs.values());
  }

  async createConversionJob(insertJob: InsertConversionJob): Promise<ConversionJob> {
    const id = randomUUID();
    const now = new Date();
    const job: ConversionJob = {
      ...insertJob,
      status: insertJob.status || "pending",
      processedFiles: insertJob.processedFiles || "0",
      results: insertJob.results || null,
      id,
      createdAt: now,
      completedAt: null
    };
    this.conversionJobs.set(id, job);
    return job;
  }

  async updateConversionJob(id: string, updates: Partial<ConversionJob>): Promise<ConversionJob | undefined> {
    const existing = this.conversionJobs.get(id);
    if (!existing) return undefined;
    
    const updated: ConversionJob = {
      ...existing,
      ...updates
    };
    this.conversionJobs.set(id, updated);
    return updated;
  }
}

import { PostgreSQLStorage } from "./postgres-storage";
export const storage = new PostgreSQLStorage();
