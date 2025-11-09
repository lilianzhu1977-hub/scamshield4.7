import { z } from "zod";
import { pgTable, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export type Language = 'en' | 'zh' | 'ms';

export interface TranslatedText {
  en: string;
  zh: string;
  ms: string;
}

export interface ScamType {
  id: string;
  title: TranslatedText;
  description: TranslatedText;
  story: TranslatedText;
  icon: string;
}

export interface VideoContent {
  id: string;
  title: TranslatedText;
  description: TranslatedText;
  thumbnail: string;
  videoUrl: string;
}

export interface QuizQuestion {
  id: string;
  question: TranslatedText;
  options: TranslatedText[];
  correctIndex: number;
  explanation: TranslatedText;
}

export interface SimulationStep {
  id: number;
  title: TranslatedText;
  description: TranslatedText;
  visual: string;
}

export interface TipStep {
  id: string;
  icon: string;
  title: TranslatedText;
  description: TranslatedText;
}

export interface NewsItem {
  id: string;
  title: TranslatedText;
  summary: TranslatedText;
  date: string;
  severity: 'high' | 'medium' | 'low';
}

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull(),
  displayName: text("display_name").notNull(),
  language: text("language").notNull().default('en'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  totalScore: integer("total_score").notNull().default(0),
  level: integer("level").notNull().default(1),
  quizzesCompleted: integer("quizzes_completed").notNull().default(0),
  simulationsCompleted: integer("simulations_completed").notNull().default(0),
  videosWatched: integer("videos_watched").notNull().default(0),
  scamTypesLearned: text("scam_types_learned").array().notNull().default([]),
  weakAreas: text("weak_areas").array().notNull().default([]),
  strongAreas: text("strong_areas").array().notNull().default([]),
  lastActive: timestamp("last_active").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const achievements = pgTable("achievements", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  achievementId: text("achievement_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  questionId: text("question_id").notNull(),
  selectedAnswer: integer("selected_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent").notNull(),
  attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
});

export const simulationAttempts = pgTable("simulation_attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  simulationId: text("simulation_id").notNull(),
  outcome: text("outcome").notNull(),
  pathTaken: text("path_taken").array().notNull(),
  score: integer("score").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const scamReports = pgTable("scam_reports", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  scamType: text("scam_type").notNull(),
  description: text("description").notNull(),
  phoneNumber: text("phone_number"),
  url: text("url"),
  amount: text("amount"),
  isVerified: boolean("is_verified").notNull().default(false),
  upvotes: integer("upvotes").notNull().default(0),
  reportedAt: timestamp("reported_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  language: text("language").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertUserProgressSchema = createInsertSchema(userProgress).omit({ id: true, lastActive: true, updatedAt: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true, earnedAt: true });
export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({ id: true, attemptedAt: true });
export const insertSimulationAttemptSchema = createInsertSchema(simulationAttempts).omit({ id: true, completedAt: true });
export const insertScamReportSchema = createInsertSchema(scamReports).omit({ id: true, reportedAt: true, isVerified: true, upvotes: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type SimulationAttempt = typeof simulationAttempts.$inferSelect;
export type InsertSimulationAttempt = z.infer<typeof insertSimulationAttemptSchema>;
export type ScamReport = typeof scamReports.$inferSelect;
export type InsertScamReport = z.infer<typeof insertScamReportSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export interface AchievementDefinition {
  id: string;
  title: TranslatedText;
  description: TranslatedText;
  icon: string;
  requirement: {
    type: 'quiz' | 'simulation' | 'video' | 'score' | 'streak' | 'report';
    count?: number;
    threshold?: number;
  };
}
