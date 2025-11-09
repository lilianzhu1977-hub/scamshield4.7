import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAIResponse, analyzeScamRisk } from "./openai";
import { insertUserSchema, insertQuizAttemptSchema, insertSimulationAttemptSchema, insertScamReportSchema } from "@shared/schema";
import { achievementDefinitions } from "@shared/data/achievements";
import { randomUUID } from "crypto";

// Helper function to check and award achievements
async function checkAndAwardAchievements(userId: string, language: string) {
  const progress = await storage.getUserProgress(userId);
  if (!progress) return;

  const existingAchievements = await storage.getUserAchievements(userId);
  const existingIds = new Set(existingAchievements.map(a => a.achievementId));
  
  // Get scam reports count
  const scamReports = await storage.getAllScamReports();
  const userReportCount = scamReports.filter((r: any) => r.userId === userId).length;

  for (const def of achievementDefinitions) {
    if (existingIds.has(def.id)) continue; // Already earned

    let shouldAward = false;

    switch (def.requirement.type) {
      case 'quiz':
        shouldAward = progress.quizzesCompleted >= (def.requirement.count || 0);
        break;
      case 'simulation':
        shouldAward = progress.simulationsCompleted >= (def.requirement.count || 0);
        break;
      case 'video':
        shouldAward = progress.videosWatched >= (def.requirement.count || 0);
        break;
      case 'score':
        shouldAward = progress.totalScore >= (def.requirement.threshold || 0);
        break;
      case 'report':
        shouldAward = userReportCount >= (def.requirement.count || 0);
        break;
    }

    if (shouldAward) {
      await storage.createAchievement({
        userId,
        achievementId: def.id,
        title: def.title[language as keyof typeof def.title],
        description: def.description[language as keyof typeof def.description],
        icon: def.icon
      });
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Session user ID (for demo purposes - in production would use authentication)
  const getOrCreateSessionUser = async (language: string = 'en') => {
    const sessionUsername = 'demo_user';
    let user = await storage.getUserByUsername(sessionUsername);
    
    if (!user) {
      user = await storage.createUser({
        username: sessionUsername,
        displayName: 'Demo User',
        language: language as any,
      });
      
      // Create initial progress
      await storage.createUserProgress({
        userId: user.id,
        totalScore: 0,
        level: 1,
        quizzesCompleted: 0,
        simulationsCompleted: 0,
        videosWatched: 0,
        scamTypesLearned: [],
        weakAreas: [],
        strongAreas: [],
      });
    }
    
    return user;
  };

  // AI Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, language = 'en' } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const user = await getOrCreateSessionUser(language);
      const progress = await storage.getUserProgress(user.id);
      
      // Get recent chat history
      const history = await storage.getUserChatHistory(user.id, 10);
      const conversationHistory = history.reverse().map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

      // Get AI response
      const aiResponse = await getAIResponse(message, {
        language,
        userProgress: progress ? {
          level: progress.level,
          weakAreas: progress.weakAreas,
          strongAreas: progress.strongAreas
        } : undefined
      }, conversationHistory);

      // Save messages
      await storage.createChatMessage({
        userId: user.id,
        role: 'user',
        content: message,
        language
      });

      await storage.createChatMessage({
        userId: user.id,
        role: 'assistant',
        content: aiResponse,
        language
      });

      res.json({ response: aiResponse });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  });

  // Get user progress
  app.get('/api/progress', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const user = await getOrCreateSessionUser(language);
      let progress = await storage.getUserProgress(user.id);
      
      // Ensure progress always exists
      if (!progress) {
        progress = await storage.createUserProgress({
          userId: user.id,
          totalScore: 0,
          level: 1,
          quizzesCompleted: 0,
          simulationsCompleted: 0,
          videosWatched: 0,
          scamTypesLearned: [],
          weakAreas: [],
          strongAreas: [],
        });
      }
      
      res.json(progress);
    } catch (error) {
      console.error('Get progress error:', error);
      res.status(500).json({ error: 'Failed to get progress' });
    }
  });

  // Get user achievements
  app.get('/api/achievements', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const user = await getOrCreateSessionUser(language);
      const achievements = await storage.getUserAchievements(user.id);
      
      res.json(achievements);
    } catch (error) {
      console.error('Get achievements error:', error);
      res.status(500).json({ error: 'Failed to get achievements' });
    }
  });

  // Submit quiz attempt
  app.post('/api/quiz/attempt', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const user = await getOrCreateSessionUser(language);
      
      const validatedData = insertQuizAttemptSchema.parse({
        ...req.body,
        userId: user.id
      });

      const attempt = await storage.createQuizAttempt(validatedData);
      
      // Update progress
      const progress = await storage.getUserProgress(user.id);
      if (progress) {
        const scoreGain = validatedData.isCorrect ? 10 : 0;
        const newScore = progress.totalScore + scoreGain;
        const newLevel = Math.floor(newScore / 100) + 1;
        
        await storage.updateUserProgress(user.id, {
          totalScore: newScore,
          level: newLevel,
          quizzesCompleted: progress.quizzesCompleted + 1
        });

        // Check and award achievements
        await checkAndAwardAchievements(user.id, language);
      }
      
      res.json(attempt);
    } catch (error) {
      console.error('Quiz attempt error:', error);
      res.status(400).json({ error: 'Failed to submit quiz attempt' });
    }
  });

  // Submit simulation attempt
  app.post('/api/simulation/attempt', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const user = await getOrCreateSessionUser(language);
      
      const validatedData = insertSimulationAttemptSchema.parse({
        ...req.body,
        userId: user.id
      });

      const attempt = await storage.createSimulationAttempt(validatedData);
      
      // Update progress
      const progress = await storage.getUserProgress(user.id);
      if (progress) {
        const newScore = progress.totalScore + validatedData.score;
        const newLevel = Math.floor(newScore / 100) + 1;
        
        await storage.updateUserProgress(user.id, {
          totalScore: newScore,
          level: newLevel,
          simulationsCompleted: progress.simulationsCompleted + 1
        });

        // Check and award achievements
        await checkAndAwardAchievements(user.id, language);
      }
      
      res.json(attempt);
    } catch (error) {
      console.error('Simulation attempt error:', error);
      res.status(400).json({ error: 'Failed to submit simulation attempt' });
    }
  });

  // Get all scam reports
  app.get('/api/scam-reports', async (req, res) => {
    try {
      const verified = req.query.verified === 'true';
      const reports = verified 
        ? await storage.getVerifiedScamReports()
        : await storage.getAllScamReports();
      
      res.json(reports);
    } catch (error) {
      console.error('Get scam reports error:', error);
      res.status(500).json({ error: 'Failed to get scam reports' });
    }
  });

  // Submit scam report
  app.post('/api/scam-reports', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const user = await getOrCreateSessionUser(language);
      
      const validatedData = insertScamReportSchema.parse({
        ...req.body,
        userId: user.id
      });

      const report = await storage.createScamReport(validatedData);

      // Check and award achievements including community hero
      await checkAndAwardAchievements(user.id, language);
      
      res.json(report);
    } catch (error) {
      console.error('Create scam report error:', error);
      res.status(400).json({ error: 'Failed to create scam report' });
    }
  });

  // Upvote scam report
  app.post('/api/scam-reports/:id/upvote', async (req, res) => {
    try {
      await storage.upvoteScamReport(req.params.id);
      res.json({ success: true, message: 'Upvote recorded' });
    } catch (error) {
      console.error('Upvote error:', error);
      res.status(500).json({ error: 'Failed to upvote report' });
    }
  });

  // Analyze scam risk (AI-powered)
  app.post('/api/analyze-scam', async (req, res) => {
    try {
      const { description, language = 'en' } = req.body;
      
      if (!description) {
        return res.status(400).json({ error: 'Description is required' });
      }

      const analysis = await analyzeScamRisk(description, language);
      res.json(analysis);
    } catch (error) {
      console.error('Scam analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze scam' });
    }
  });

  // Update video watched
  app.post('/api/progress/video-watched', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const user = await getOrCreateSessionUser(language);
      const progress = await storage.getUserProgress(user.id);
      
      if (progress) {
        await storage.updateUserProgress(user.id, {
          videosWatched: progress.videosWatched + 1,
          totalScore: progress.totalScore + 5
        });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error('Video watched error:', error);
      res.status(500).json({ error: 'Failed to update progress' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
