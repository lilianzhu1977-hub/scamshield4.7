import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import { eq, desc, and } from "drizzle-orm";
import * as schema from "@shared/schema";
import type {
  User,
  InsertUser,
  UserProgress,
  InsertUserProgress,
  Achievement,
  InsertAchievement,
  QuizAttempt,
  InsertQuizAttempt,
  SimulationAttempt,
  InsertSimulationAttempt,
  ScamReport,
  InsertScamReport,
  ChatMessage,
  InsertChatMessage,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // User Progress methods
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined>;
  
  // Achievement methods
  getUserAchievements(userId: string): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // Quiz methods
  getUserQuizAttempts(userId: string): Promise<QuizAttempt[]>;
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getQuizAttemptsByQuestion(userId: string, questionId: string): Promise<QuizAttempt[]>;
  
  // Simulation methods
  getUserSimulationAttempts(userId: string): Promise<SimulationAttempt[]>;
  createSimulationAttempt(attempt: InsertSimulationAttempt): Promise<SimulationAttempt>;
  
  // Scam Report methods
  getAllScamReports(): Promise<ScamReport[]>;
  getVerifiedScamReports(): Promise<ScamReport[]>;
  createScamReport(report: InsertScamReport): Promise<ScamReport>;
  upvoteScamReport(id: string): Promise<void>;
  
  // Chat methods
  getUserChatHistory(userId: string, limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

class DbStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool, { schema });
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(schema.users).where(eq(schema.users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(schema.users).where(eq(schema.users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const [user] = await this.db.insert(schema.users).values({ ...insertUser, id }).returning();
    return user;
  }

  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    const result = await this.db.select().from(schema.userProgress).where(eq(schema.userProgress.userId, userId));
    return result[0];
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const [progress] = await this.db.insert(schema.userProgress).values({ ...insertProgress, id }).returning();
    return progress;
  }

  async updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const [progress] = await this.db
      .update(schema.userProgress)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.userProgress.userId, userId))
      .returning();
    return progress;
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return await this.db.select().from(schema.achievements).where(eq(schema.achievements.userId, userId));
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = randomUUID();
    const [achievement] = await this.db.insert(schema.achievements).values({ ...insertAchievement, id }).returning();
    return achievement;
  }

  async getUserQuizAttempts(userId: string): Promise<QuizAttempt[]> {
    return await this.db.select().from(schema.quizAttempts)
      .where(eq(schema.quizAttempts.userId, userId))
      .orderBy(desc(schema.quizAttempts.attemptedAt));
  }

  async createQuizAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = randomUUID();
    const [attempt] = await this.db.insert(schema.quizAttempts).values({ ...insertAttempt, id }).returning();
    return attempt;
  }

  async getQuizAttemptsByQuestion(userId: string, questionId: string): Promise<QuizAttempt[]> {
    return await this.db.select().from(schema.quizAttempts)
      .where(and(
        eq(schema.quizAttempts.userId, userId),
        eq(schema.quizAttempts.questionId, questionId)
      ))
      .orderBy(desc(schema.quizAttempts.attemptedAt));
  }

  async getUserSimulationAttempts(userId: string): Promise<SimulationAttempt[]> {
    return await this.db.select().from(schema.simulationAttempts)
      .where(eq(schema.simulationAttempts.userId, userId))
      .orderBy(desc(schema.simulationAttempts.completedAt));
  }

  async createSimulationAttempt(insertAttempt: InsertSimulationAttempt): Promise<SimulationAttempt> {
    const id = randomUUID();
    const [attempt] = await this.db.insert(schema.simulationAttempts).values({ ...insertAttempt, id }).returning();
    return attempt;
  }

  async getAllScamReports(): Promise<ScamReport[]> {
    return await this.db.select().from(schema.scamReports)
      .orderBy(desc(schema.scamReports.reportedAt));
  }

  async getVerifiedScamReports(): Promise<ScamReport[]> {
    return await this.db.select().from(schema.scamReports)
      .where(eq(schema.scamReports.isVerified, true))
      .orderBy(desc(schema.scamReports.reportedAt));
  }

  async createScamReport(insertReport: InsertScamReport): Promise<ScamReport> {
    const id = randomUUID();
    const [report] = await this.db.insert(schema.scamReports).values({ ...insertReport, id }).returning();
    return report;
  }

  async upvoteScamReport(id: string): Promise<void> {
    await this.db
      .update(schema.scamReports)
      .set({ upvotes: (schema.scamReports.upvotes) })
      .where(eq(schema.scamReports.id, id));
  }

  async getUserChatHistory(userId: string, limit: number = 50): Promise<ChatMessage[]> {
    return await this.db.select().from(schema.chatMessages)
      .where(eq(schema.chatMessages.userId, userId))
      .orderBy(desc(schema.chatMessages.createdAt))
      .limit(limit);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const [message] = await this.db.insert(schema.chatMessages).values({ ...insertMessage, id }).returning();
    return message;
  }
}

export const storage = new DbStorage();
