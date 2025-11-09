
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Users, Trophy, Target, BookOpen, Shield, Clock, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";

export default function FamilyViewPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();

  const familyMembers = [
    {
      name: language === 'zh' ? '妈妈' : language === 'ms' ? 'Ibu' : 'Mum',
      lastActive: language === 'zh' ? '2小时前' : language === 'ms' ? '2 jam lalu' : '2 hours ago',
      progress: 75,
      quizScore: 18,
      totalQuiz: 20,
      lessonsCompleted: 8,
      totalLessons: 10,
      simulationsPassed: 5,
      riskLevel: 'low',
      recentActivity: [
        { type: 'quiz', score: 90, date: language === 'zh' ? '今天' : language === 'ms' ? 'Hari ini' : 'Today' },
        { type: 'lesson', topic: language === 'zh' ? '银行诈骗' : language === 'ms' ? 'Penipuan Bank' : 'Bank Scams', date: language === 'zh' ? '昨天' : language === 'ms' ? 'Semalam' : 'Yesterday' }
      ]
    },
    {
      name: language === 'zh' ? '爸爸' : language === 'ms' ? 'Ayah' : 'Dad',
      lastActive: language === 'zh' ? '1天前' : language === 'ms' ? '1 hari lalu' : '1 day ago',
      progress: 45,
      quizScore: 12,
      totalQuiz: 20,
      lessonsCompleted: 4,
      totalLessons: 10,
      simulationsPassed: 2,
      riskLevel: 'medium',
      recentActivity: [
        { type: 'lesson', topic: language === 'zh' ? '政府诈骗' : language === 'ms' ? 'Penipuan Kerajaan' : 'Government Scams', date: language === 'zh' ? '2天前' : language === 'ms' ? '2 hari lalu' : '2 days ago' }
      ]
    }
  ];

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskLabel = (level: string) => {
    const labels = {
      low: { en: 'Well Protected', zh: '防护良好', ms: 'Dilindungi Baik' },
      medium: { en: 'Needs Practice', zh: '需要练习', ms: 'Perlu Latihan' },
      high: { en: 'At Risk', zh: '有风险', ms: 'Berisiko' }
    };
    return labels[level as keyof typeof labels][language];
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button variant="ghost" onClick={() => setLocation('/')} className="mb-6">
        <ChevronLeft className="w-4 h-4 mr-2" />
        {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-10 h-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">
              {language === 'zh' ? '家庭进度' : language === 'ms' ? 'Kemajuan Keluarga' : 'Family Progress'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'zh' ? '监控您亲人的学习进度' : 
               language === 'ms' ? 'Pantau kemajuan ahli keluarga' : 
               'Monitor your loved ones\' learning progress'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {familyMembers.map((member, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {language === 'zh' ? '最后活跃：' : language === 'ms' ? 'Aktif terakhir: ' : 'Last active: '}{member.lastActive}
                  </p>
                </div>
              </div>

              <Badge className={`${getRiskColor(member.riskLevel)} border`}>
                <Shield className="w-4 h-4 mr-2" />
                {getRiskLabel(member.riskLevel)}
              </Badge>
            </div>

            {/* Overall Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  {language === 'zh' ? '整体进度' : language === 'ms' ? 'Kemajuan Keseluruhan' : 'Overall Progress'}
                </span>
                <span className="text-2xl font-bold text-primary">{member.progress}%</span>
              </div>
              <Progress value={member.progress} className="h-3" />
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'zh' ? '测验分数' : language === 'ms' ? 'Skor Kuiz' : 'Quiz Score'}
                    </p>
                    <p className="text-2xl font-bold">{member.quizScore}/{member.totalQuiz}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-blue-600" />
                </div>
              </Card>

              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'zh' ? '课程完成' : language === 'ms' ? 'Pelajaran Selesai' : 'Lessons Done'}
                    </p>
                    <p className="text-2xl font-bold">{member.lessonsCompleted}/{member.totalLessons}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
              </Card>

              <Card className="p-4 bg-purple-50 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'zh' ? '模拟通过' : language === 'ms' ? 'Simulasi Lulus' : 'Simulations Passed'}
                    </p>
                    <p className="text-2xl font-bold">{member.simulationsPassed}</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {language === 'zh' ? '最近活动' : language === 'ms' ? 'Aktiviti Terkini' : 'Recent Activity'}
              </h3>
              <div className="space-y-2">
                {member.recentActivity.map((activity, idx) => (
                  <Card key={idx} className="p-3 bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {activity.type === 'quiz' ? (
                          <Trophy className="w-5 h-5 text-blue-600" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-green-600" />
                        )}
                        <div>
                          <p className="font-medium">
                            {activity.type === 'quiz' 
                              ? (language === 'zh' ? `完成测验 - ${activity.score}%` : 
                                 language === 'ms' ? `Kuiz Selesai - ${activity.score}%` : 
                                 `Completed Quiz - ${activity.score}%`)
                              : activity.topic}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{activity.date}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
