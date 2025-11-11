import { randomUUID } from "crypto";
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

class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private usersByUsername: Map<string, User> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private achievements: Map<string, Achievement[]> = new Map();
  private quizAttempts: Map<string, QuizAttempt[]> = new Map();
  private simulationAttempts: Map<string, SimulationAttempt[]> = new Map();
  private scamReports: ScamReport[] = [];
  private chatMessages: Map<string, ChatMessage[]> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.usersByUsername.get(username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      language: insertUser.language || 'en',
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    this.usersByUsername.set(user.username, user);
    return user;
  }

  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    return this.userProgress.get(userId);
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = {
      totalScore: 0,
      level: 1,
      quizzesCompleted: 0,
      simulationsCompleted: 0,
      videosWatched: 0,
      scamTypesLearned: [],
      weakAreas: [],
      strongAreas: [],
      ...insertProgress,
      id,
      lastActive: new Date(),
      updatedAt: new Date(),
    };
    this.userProgress.set(insertProgress.userId, progress);
    return progress;
  }

  async updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const existing = this.userProgress.get(userId);
    if (!existing) return undefined;

    const updated: UserProgress = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.userProgress.set(userId, updated);
    return updated;
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return this.achievements.get(userId) || [];
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = randomUUID();
    const achievement: Achievement = {
      ...insertAchievement,
      id,
      earnedAt: new Date(),
    };
    
    const userAchievements = this.achievements.get(insertAchievement.userId) || [];
    userAchievements.push(achievement);
    this.achievements.set(insertAchievement.userId, userAchievements);
    
    return achievement;
  }

  async getUserQuizAttempts(userId: string): Promise<QuizAttempt[]> {
    const attempts = this.quizAttempts.get(userId) || [];
    return attempts.sort((a, b) => b.attemptedAt.getTime() - a.attemptedAt.getTime());
  }

  async createQuizAttempt(insertAttempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = randomUUID();
    const attempt: QuizAttempt = {
      ...insertAttempt,
      id,
      attemptedAt: new Date(),
    };
    
    const userAttempts = this.quizAttempts.get(insertAttempt.userId) || [];
    userAttempts.push(attempt);
    this.quizAttempts.set(insertAttempt.userId, userAttempts);
    
    return attempt;
  }

  async getQuizAttemptsByQuestion(userId: string, questionId: string): Promise<QuizAttempt[]> {
    const attempts = this.quizAttempts.get(userId) || [];
    return attempts
      .filter(a => a.questionId === questionId)
      .sort((a, b) => b.attemptedAt.getTime() - a.attemptedAt.getTime());
  }

  async getUserSimulationAttempts(userId: string): Promise<SimulationAttempt[]> {
    const attempts = this.simulationAttempts.get(userId) || [];
    return attempts.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
  }

  async createSimulationAttempt(insertAttempt: InsertSimulationAttempt): Promise<SimulationAttempt> {
    const id = randomUUID();
    const attempt: SimulationAttempt = {
      ...insertAttempt,
      id,
      completedAt: new Date(),
    };
    
    const userAttempts = this.simulationAttempts.get(insertAttempt.userId) || [];
    userAttempts.push(attempt);
    this.simulationAttempts.set(insertAttempt.userId, userAttempts);
    
    return attempt;
  }

  async getAllScamReports(): Promise<ScamReport[]> {
    return [...this.scamReports].sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime());
  }

  async getVerifiedScamReports(): Promise<ScamReport[]> {
    return this.scamReports
      .filter(r => r.isVerified)
      .sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime());
  }

  async createScamReport(insertReport: InsertScamReport): Promise<ScamReport> {
    const id = randomUUID();
    const report: ScamReport = {
      ...insertReport,
      phoneNumber: insertReport.phoneNumber ?? null,
      url: insertReport.url ?? null,
      amount: insertReport.amount ?? null,
      id,
      isVerified: false,
      upvotes: 0,
      reportedAt: new Date(),
    };
    
    this.scamReports.push(report);
    return report;
  }

  async upvoteScamReport(id: string): Promise<void> {
    const report = this.scamReports.find(r => r.id === id);
    if (report) {
      report.upvotes = (report.upvotes || 0) + 1;
    }
  }

  async getUserChatHistory(userId: string, limit: number = 50): Promise<ChatMessage[]> {
    const messages = this.chatMessages.get(userId) || [];
    return messages
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    
    const userMessages = this.chatMessages.get(insertMessage.userId) || [];
    userMessages.push(message);
    this.chatMessages.set(insertMessage.userId, userMessages);
    
    return message;
  }
}

export const storage = new MemStorage();
