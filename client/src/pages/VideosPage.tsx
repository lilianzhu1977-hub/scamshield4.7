import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import VideoCard from "@/components/VideoCard";
import { useApp } from "@/contexts/AppContext";

export default function VideosPage() {
  const [, setLocation] = useLocation();
  const { language } = useApp();

  const videos = [
    {
      id: '1',
      title: language === 'zh' ? '识别电话诈骗' : language === 'ms' ? 'Kenali Penipuan Telefon' : 'Recognize Phone Scams',
      description: language === 'zh' ? '学习如何识别可疑电话并保护自己' : language === 'ms' ? 'Belajar bagaimana mengenali panggilan mencurigakan dan lindungi diri' : 'Learn how to identify suspicious phone calls and protect yourself',
      thumbnail: '📞',
      testId: 'card-video-phone'
    },
    {
      id: '2',
      title: language === 'zh' ? '诈骗者的伎俩' : language === 'ms' ? 'Taktik Penipu' : 'How Scammers Trick Victims',
      description: language === 'zh' ? '了解诈骗者常用的心理操纵技巧' : language === 'ms' ? 'Fahami teknik manipulasi psikologi yang digunakan penipu' : 'Understand the psychological manipulation techniques scammers use',
      thumbnail: '🎭',
      testId: 'card-video-tactics'
    },
    {
      id: '3',
      title: language === 'zh' ? 'ACT原则：询问、核实、告知' : language === 'ms' ? 'ACT: Tanya, Semak, Beritahu' : 'ACT: Ask, Check, Tell',
      description: language === 'zh' ? '三步保护自己免受诈骗' : language === 'ms' ? 'Tiga langkah untuk melindungi diri dari penipuan' : 'Three steps to protect yourself from scams',
      thumbnail: '✅',
      testId: 'card-video-act'
    },
    {
      id: '4',
      title: language === 'zh' ? '网络钓鱼识别' : language === 'ms' ? 'Kenali Pancingan Data' : 'Spot Phishing Attempts',
      description: language === 'zh' ? '识别虚假电子邮件和网站' : language === 'ms' ? 'Kenali e-mel dan laman web palsu' : 'Identify fake emails and websites',
      thumbnail: '🎣',
      testId: 'card-video-phishing'
    },
    {
      id: '5',
      title: language === 'zh' ? '保护您的个人信息' : language === 'ms' ? 'Lindungi Maklumat Peribadi' : 'Protect Your Personal Information',
      description: language === 'zh' ? '了解如何安全地保管您的敏感数据' : language === 'ms' ? 'Ketahui cara menjaga data sensitif anda dengan selamat' : 'Learn how to keep your sensitive data safe',
      thumbnail: '🔒',
      testId: 'card-video-privacy'
    },
    {
      id: '6',
      title: language === 'zh' ? '遇到诈骗怎么办' : language === 'ms' ? 'Apa Yang Perlu Dilakukan Jika Tertipu' : 'What To Do If You\'ve Been Scammed',
      description: language === 'zh' ? '被骗后的即时行动步骤' : language === 'ms' ? 'Langkah segera selepas ditipu' : 'Immediate steps to take after being scammed',
      thumbnail: '🆘',
      testId: 'card-video-response'
    }
  ];

  const handlePlayVideo = (title: string) => {
    console.log('Playing video:', title);
    alert(`${language === 'zh' ? '视频播放功能即将推出' : language === 'ms' ? 'Fungsi main video akan datang tidak lama lagi' : 'Video playback coming soon'}: ${title}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          data-testid="button-back"
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-4"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          {language === 'zh' ? '返回' : language === 'ms' ? 'Kembali' : 'Back'}
        </Button>
        <h1 className="text-4xl font-bold mb-2">
          {language === 'zh' ? '教育视频' : language === 'ms' ? 'Video Pendidikan' : 'Educational Videos'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'zh' ? '观看短视频学习防诈骗技巧' : language === 'ms' ? 'Tonton video pendek untuk belajar petua pencegahan penipuan' : 'Watch short clips to learn scam prevention tips'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            description={video.description}
            thumbnail={video.thumbnail}
            onPlay={() => handlePlayVideo(video.title)}
            testId={video.testId}
          />
        ))}
      </div>
    </div>
  );
}
