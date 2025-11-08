import { z } from "zod";

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
