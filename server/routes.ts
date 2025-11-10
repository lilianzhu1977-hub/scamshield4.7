import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertQuizAttemptSchema, insertSimulationAttemptSchema, insertScamReportSchema } from "@shared/schema";
import { achievementDefinitions } from "@shared/data/achievements";
import { randomUUID } from "crypto";

// Helper function to check and award achievements
async function checkAndAwardAchievements(userId: string, language: string) {
  try {
    const progress = await storage.getUserProgress(userId);
    if (!progress) return;

    const existingAchievements = await storage.getUserAchievements(userId);
    const existingIds = new Set(existingAchievements.map(a => a.achievementId));
    
    // Get scam reports count with fallback
    let userReportCount = 0;
    try {
      const scamReports = await storage.getAllScamReports();
      userReportCount = scamReports.filter((r: any) => r.userId === userId).length;
    } catch (reportError) {
      console.error('Failed to get scam reports for achievement check:', reportError);
    }

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
  } catch (error) {
    console.error('Error in checkAndAwardAchievements:', error);
    // Don't throw, just log - achievements are not critical
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get or create user by username
  const getOrCreateSessionUser = async (username: string, displayName: string, language: string = 'en') => {
    let user = await storage.getUserByUsername(username);
    
    if (!user) {
      user = await storage.createUser({
        username: username,
        displayName: displayName,
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


  // Get user progress
  app.get('/api/progress', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const username = req.query.username as string;
      const displayName = req.query.displayName as string;
      
      if (!username || !displayName) {
        return res.status(400).json({ error: 'Username and displayName are required' });
      }
      
      const user = await getOrCreateSessionUser(username, displayName, language);
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
      const username = req.query.username as string;
      const displayName = req.query.displayName as string;
      
      if (!username || !displayName) {
        return res.status(400).json({ error: 'Username and displayName are required' });
      }
      
      const user = await getOrCreateSessionUser(username, displayName, language);
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
      const { username, displayName } = req.body;
      
      if (!username || !displayName) {
        return res.status(400).json({ error: 'Username and displayName are required' });
      }
      
      const user = await getOrCreateSessionUser(username, displayName, language);
      
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
        try {
          await checkAndAwardAchievements(user.id, language);
        } catch (achError) {
          console.error('Achievement check failed:', achError);
        }
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
      const { username, displayName } = req.body;
      
      if (!username || !displayName) {
        return res.status(400).json({ error: 'Username and displayName are required' });
      }
      
      const user = await getOrCreateSessionUser(username, displayName, language);
      
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
        try {
          await checkAndAwardAchievements(user.id, language);
        } catch (achError) {
          console.error('Achievement check failed:', achError);
        }
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
      // Return empty array if database is unavailable instead of error
      res.json([]);
    }
  });

  // Submit scam report
  app.post('/api/scam-reports', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const { username, displayName } = req.body;
      
      if (!username || !displayName) {
        return res.status(400).json({ error: 'Username and displayName are required' });
      }
      
      const user = await getOrCreateSessionUser(username, displayName, language);
      
      const validatedData = insertScamReportSchema.parse({
        ...req.body,
        userId: user.id
      });

      const report = await storage.createScamReport(validatedData);

      // Check and award achievements including community hero
      try {
        await checkAndAwardAchievements(user.id, language);
      } catch (achError) {
        console.error('Achievement check failed:', achError);
      }
      
      res.json(report);
    } catch (error) {
      console.error('Create scam report error:', error);
      res.status(500).json({ error: 'Failed to create scam report' });
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


  // Update video watched
  app.post('/api/progress/video-watched', async (req, res) => {
    try {
      const language = (req.query.language as string) || 'en';
      const { username, displayName } = req.body;
      
      if (!username || !displayName) {
        return res.status(400).json({ error: 'Username and displayName are required' });
      }
      
      const user = await getOrCreateSessionUser(username, displayName, language);
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
