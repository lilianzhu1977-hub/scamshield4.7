import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, AlertTriangle, ThumbsUp, Share2, Clock, Users, Plus } from "lucide-react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function CommunityPage() {
  const [, setLocation] = useLocation();
  const { language, speak } = useApp();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    scamType: '',
    description: '',
    phoneNumber: '',
    url: '',
    amount: ''
  });

  const { data: reports, isLoading } = useQuery({
    queryKey: ['/api/scam-reports'],
  });

  const createReportMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/scam-reports', data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/scam-reports'] });
      setIsDialogOpen(false);
      setFormData({ scamType: '', description: '', phoneNumber: '', url: '', amount: '' });
      toast({
        title: language === 'en' ? 'Report Submitted' : language === 'zh' ? '报告已提交' : 'Laporan Dihantar',
        description: language === 'en' ? 'Thank you for helping protect the community!' : 
                     language === 'zh' ? '感谢您帮助保护社区！' : 
                     'Terima kasih kerana membantu melindungi komuniti!'
      });
    }
  });

  const upvoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest('POST', `/api/scam-reports/${id}/upvote`, {});
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/scam-reports'] });
    }
  });

  const titles = {
    en: {
      title: 'Community Scam Reports',
      subtitle: 'Share and learn from real scam experiences',
      backBtn: 'Back',
      reportBtn: 'Report a Scam',
      newReport: 'New Scam Report',
      scamType: 'Type of Scam',
      description: 'Description',
      phoneNumber: 'Phone Number (optional)',
      website: 'Website/URL (optional)',
      amount: 'Amount Lost (optional)',
      submit: 'Submit Report',
      upvotes: 'Helpful',
      reported: 'Reported',
      verified: 'Verified',
      noReports: 'No reports yet. Be the first to share!'
    },
    zh: {
      title: '社区诈骗举报',
      subtitle: '分享和学习真实的诈骗经历',
      backBtn: '返回',
      reportBtn: '举报诈骗',
      newReport: '新诈骗举报',
      scamType: '诈骗类型',
      description: '描述',
      phoneNumber: '电话号码（可选）',
      website: '网站/链接（可选）',
      amount: '损失金额（可选）',
      submit: '提交举报',
      upvotes: '有帮助',
      reported: '举报于',
      verified: '已验证',
      noReports: '暂无举报。成为第一个分享的人！'
    },
    ms: {
      title: 'Laporan Penipuan Komuniti',
      subtitle: 'Kongsi dan belajar dari pengalaman penipuan sebenar',
      backBtn: 'Kembali',
      reportBtn: 'Laporkan Penipuan',
      newReport: 'Laporan Penipuan Baharu',
      scamType: 'Jenis Penipuan',
      description: 'Penerangan',
      phoneNumber: 'Nombor Telefon (pilihan)',
      website: 'Laman Web/URL (pilihan)',
      amount: 'Jumlah Kerugian (pilihan)',
      submit: 'Hantar Laporan',
      upvotes: 'Berguna',
      reported: 'Dilaporkan',
      verified: 'Disahkan',
      noReports: 'Tiada laporan lagi. Jadilah yang pertama untuk berkongsi!'
    }
  };

  const t = titles[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.scamType || !formData.description) return;
    
    createReportMutation.mutate({
      ...formData
    });
  };

  const getSeverityColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('government') || lowerType.includes('police') || lowerType.includes('bank')) {
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
    if (lowerType.includes('investment') || lowerType.includes('romance')) {
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    }
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  };

  return (
    <div className="px-4 py-8 min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setLocation('/')} data-testid="button-back">
            <ChevronLeft className="w-5 h-5 mr-2" />
            {t.backBtn}
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-new-report">
                <Plus className="w-4 h-4" />
                {t.reportBtn}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t.newReport}</DialogTitle>
                <DialogDescription>
                  {language === 'en' ? 'Help others by sharing your experience' :
                   language === 'zh' ? '分享您的经历以帮助他人' :
                   'Bantu orang lain dengan berkongsi pengalaman anda'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t.scamType}</label>
                  <Input
                    data-testid="input-scam-type"
                    value={formData.scamType}
                    onChange={(e) => setFormData({ ...formData, scamType: e.target.value })}
                    placeholder={language === 'en' ? 'e.g., Bank Phishing' : language === 'zh' ? '例如：银行钓鱼' : 'cth: Pancingan Bank'}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t.description}</label>
                  <Textarea
                    data-testid="input-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={language === 'en' ? 'Describe what happened...' : 
                                language === 'zh' ? '描述发生了什么...' : 
                                'Terangkan apa yang berlaku...'}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t.phoneNumber}</label>
                  <Input
                    data-testid="input-phone"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+65 XXXX XXXX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t.website}</label>
                  <Input
                    data-testid="input-url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t.amount}</label>
                  <Input
                    data-testid="input-amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="$XXX"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={createReportMutation.isPending} data-testid="button-submit-report">
                  {t.submit}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3" data-testid="text-page-title">
            <Users className="w-10 h-10" />
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="text-page-subtitle">{t.subtitle}</p>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Loading...</p>
              </CardContent>
            </Card>
          ) : reports && Array.isArray(reports) && reports.length > 0 ? (
            reports.map((report: any, index: number) => (
              <Card key={report.id} className="hover-elevate" data-testid={`report-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <CardTitle className="text-lg" data-testid={`report-type-${index}`}>{report.scamType}</CardTitle>
                        {report.isVerified && (
                          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900">
                            {t.verified}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-2 text-xs">
                        <Clock className="w-3 h-3" />
                        {t.reported} {new Date(report.reportedAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getSeverityColor(report.scamType)}>
                      {report.scamType.split(' ')[0]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4" data-testid={`report-desc-${index}`}>{report.description}</p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    {report.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">📞</span>
                        <span data-testid={`report-phone-${index}`}>{report.phoneNumber}</span>
                      </div>
                    )}
                    {report.url && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">🔗</span>
                        <span className="break-all" data-testid={`report-url-${index}`}>{report.url}</span>
                      </div>
                    )}
                    {report.amount && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">💰</span>
                        <span data-testid={`report-amount-${index}`}>{report.amount}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => upvoteMutation.mutate(report.id)}
                      disabled={upvoteMutation.isPending}
                      data-testid={`button-upvote-${index}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {t.upvotes} ({report.upvotes || 0})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      data-testid={`button-share-${index}`}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground" data-testid="text-no-reports">{t.noReports}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
