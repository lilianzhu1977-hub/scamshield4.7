import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Trophy, Target, BookOpen, Video, Shield, TrendingUp, Star, Award } from "lucide-react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProgressPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();

  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/progress', language],
  });

  const { data: achievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ['/api/achievements', language],
  });

  const titles = {
    en: { title: 'Your Progress', subtitle: 'Track your scam prevention journey', backBtn: 'Back' },
    zh: { title: '您的进度', subtitle: '跟踪您的防诈骗之旅', backBtn: '返回' },
    ms: { title: 'Kemajuan Anda', subtitle: 'Jejaki perjalanan pencegahan penipuan anda', backBtn: 'Kembali' }
  };

  const stats = {
    en: {
      level: 'Level',
      score: 'Total Score',
      quizzes: 'Quizzes Completed',
      simulations: 'Simulations Completed',
      videos: 'Videos Watched',
      achievements: 'Achievements Earned',
      nextLevel: 'Progress to Next Level',
      strongAreas: 'Strong Areas',
      weakAreas: 'Areas to Improve',
      noData: 'No data yet'
    },
    zh: {
      level: '等级',
      score: '总分',
      quizzes: '完成的测验',
      simulations: '完成的模拟',
      videos: '观看的视频',
      achievements: '获得的成就',
      nextLevel: '下一级进度',
      strongAreas: '强项',
      weakAreas: '需要改进的领域',
      noData: '暂无数据'
    },
    ms: {
      level: 'Tahap',
      score: 'Jumlah Skor',
      quizzes: 'Kuiz Selesai',
      simulations: 'Simulasi Selesai',
      videos: 'Video Ditonton',
      achievements: 'Pencapaian Diraih',
      nextLevel: 'Kemajuan ke Tahap Seterusnya',
      strongAreas: 'Bidang Kuat',
      weakAreas: 'Bidang untuk Diperbaiki',
      noData: 'Tiada data lagi'
    }
  };

  const t = titles[language];
  const s = stats[language];

  if (progressLoading || achievementsLoading) {
    return (
      <div className="px-4 py-8">
        <Button variant="ghost" onClick={() => setLocation('/')} className="mb-6">
          <ChevronLeft className="w-5 h-5 mr-2" />
          {t.backBtn}
        </Button>
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  const progressData = progress as any;
  const achievementsData = achievements as any[];
  
  const level = progressData?.level || 1;
  const currentLevelMin = (level - 1) * 100;
  const nextLevelMin = level * 100;
  const progressInLevel = ((progressData?.totalScore || 0) - currentLevelMin) / (nextLevelMin - currentLevelMin) * 100;

  return (
    <div className="px-4 py-8 min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => setLocation('/')} className="mb-6" data-testid="button-back">
          <ChevronLeft className="w-5 h-5 mr-2" />
          {t.backBtn}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">{t.title}</h1>
          <p className="text-xl text-muted-foreground" data-testid="text-page-subtitle">{t.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                {s.level} {level}
              </CardTitle>
              <CardDescription>{s.nextLevel}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{progressData?.totalScore || 0} {s.score}</span>
                  <span>{nextLevelMin} {s.score}</span>
                </div>
                <Progress value={progressInLevel} className="h-3" data-testid="progress-level" />
                <p className="text-xs text-muted-foreground text-center">
                  {Math.round(progressInLevel)}% {language === 'en' ? 'complete' : language === 'zh' ? '完成' : 'selesai'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-blue-500" />
                {s.quizzes}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold" data-testid="text-quizzes-count">{progressData?.quizzesCompleted || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-green-500" />
                {s.simulations}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold" data-testid="text-simulations-count">{progressData?.simulationsCompleted || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Video className="w-5 h-5 text-purple-500" />
                {s.videos}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold" data-testid="text-videos-count">{progressData?.videosWatched || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="w-5 h-5 text-yellow-500" />
                {s.achievements}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold" data-testid="text-achievements-count">{achievementsData?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                {s.strongAreas}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progressData?.strongAreas && Array.isArray(progressData.strongAreas) && progressData.strongAreas.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {progressData.strongAreas.map((area: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 dark:bg-green-900" data-testid={`badge-strong-${index}`}>
                      {area}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground" data-testid="text-no-strong-areas">{s.noData}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500" />
                {s.weakAreas}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progressData?.weakAreas && Array.isArray(progressData.weakAreas) && progressData.weakAreas.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {progressData.weakAreas.map((area: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 dark:bg-orange-900" data-testid={`badge-weak-${index}`}>
                      {area}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground" data-testid="text-no-weak-areas">{s.noData}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              {s.achievements}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {achievementsData && Array.isArray(achievementsData) && achievementsData.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {achievementsData.map((achievement: any, index: number) => (
                  <Card key={achievement.id} className="hover-elevate" data-testid={`achievement-${index}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold" data-testid={`achievement-title-${index}`}>{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground" data-testid={`achievement-desc-${index}`}>{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(achievement.earnedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground" data-testid="text-no-achievements">
                  {language === 'en' ? 'No achievements yet. Keep learning!' :
                   language === 'zh' ? '还没有成就。继续学习！' :
                   'Tiada pencapaian lagi. Teruskan belajar!'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
