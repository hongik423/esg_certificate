'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Users, 
  Calendar, 
  Clock, 
  Heart,
  Share2,
  Download,
  Bell,
  Filter,
  Search,
  Star,
  Eye,
  ThumbsUp,
  MessageCircle,
  BookOpen,
  Zap,
  TrendingUp,
  Youtube,
  Globe,
  Award,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Phone,
  Grid,
  Cpu,
  Rocket,
  DollarSign
} from 'lucide-react';

// 세미나 데이터 타입 정의
interface SeminarVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  youtubeId: string;
  duration: string;
  publishDate: string;
  views: number;
  likes: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isLive?: boolean;
  isNew?: boolean;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
}

// 가상의 세미나 데이터
const seminarVideos: SeminarVideo[] = [
  {
    id: '1',
    title: 'BM ZEN 프레임워크로 신규사업 95% 성공시키기',
    description: '25년 경험의 이후경 센터장이 직접 전수하는 BM ZEN 사업분석 방법론',
    thumbnailUrl: 'https://img.youtube.com/vi/SWkmuibSQ4E/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=SWkmuibSQ4E',
    youtubeId: 'SWkmuibSQ4E',
    duration: '45:32',
    publishDate: '2024-01-15',
    views: 12500,
    likes: 456,
    category: 'business',
    level: 'intermediate',
    tags: ['BM ZEN', '사업분석', '신규사업', '세무사'],
    isNew: true,
    instructor: {
      name: '이후경',
      title: 'M-CENTER 센터장',
      avatar: 'https://picsum.photos/100/100?random=10'
    }
  },
  {
    id: '2',
    title: 'ChatGPT로 업무 생산성 40% 높이기',
    description: '실무에 바로 적용하는 ChatGPT & Copilot 활용 전략',
    thumbnailUrl: 'https://img.youtube.com/vi/SWkmuibSQ4E/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=SWkmuibSQ4E',
    youtubeId: 'SWkmuibSQ4E',
    duration: '52:18',
    publishDate: '2024-01-10',
    views: 8900,
    likes: 267,
    category: 'ai',
    level: 'beginner',
    tags: ['AI', '생산성', 'ChatGPT', '자동화'],
    instructor: {
      name: '이후경',
      title: 'M-CENTER 센터장',
      avatar: 'https://picsum.photos/100/100?random=10'
    }
  },
  {
    id: '3',
    title: '정책자금 10억원 확보 전략',
    description: '투자분석과 함께하는 정책자금 신청 성공 노하우',
    thumbnailUrl: 'https://img.youtube.com/vi/SWkmuibSQ4E/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=SWkmuibSQ4E',
    youtubeId: 'SWkmuibSQ4E',
    duration: '38:45',
    publishDate: '2024-01-05',
    views: 6420,
    likes: 189,
    category: 'policy',
    level: 'advanced',
    tags: ['정책자금', '투자분석', 'NPV', 'IRR'],
    instructor: {
      name: '이후경',
      title: 'M-CENTER 센터장',
      avatar: 'https://picsum.photos/100/100?random=10'
    }
  },
  {
    id: '4',
    title: '정부지원 5억원 확보 전략',
    description: '기술창업과 R&D 과제로 정부지원금 확보하는 실전 방법',
    thumbnailUrl: 'https://img.youtube.com/vi/SWkmuibSQ4E/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=SWkmuibSQ4E',
    youtubeId: 'SWkmuibSQ4E',
    duration: '41:27',
    publishDate: '2023-12-28',
    views: 15230,
    likes: 456,
    category: 'startup',
    level: 'intermediate',
    tags: ['정부지원', '창업', 'R&D', '자금조달'],
    isLive: true,
    instructor: {
      name: '이후경',
      title: 'M-CENTER 센터장',
      avatar: 'https://picsum.photos/100/100?random=10'
    }
  },
  {
    id: '5',
    title: '벤처인증으로 세제혜택 5천만원 받기',
    description: '벤처확인, ISO인증, ESG 인증을 통한 세제혜택 완벽 가이드',
    thumbnailUrl: 'https://img.youtube.com/vi/SWkmuibSQ4E/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=SWkmuibSQ4E',
    youtubeId: 'SWkmuibSQ4E',
    duration: '35:12',
    publishDate: '2023-12-20',
    views: 9840,
    likes: 298,
    category: 'certification',
    level: 'beginner',
    tags: ['벤처인증', '세제혜택', 'ISO', 'ESG'],
    instructor: {
      name: '이후경',
      title: 'M-CENTER 센터장',
      avatar: 'https://picsum.photos/100/100?random=10'
    }
  },
  {
    id: '6',
    title: '디지털 마케팅으로 매출 300% 증대',
    description: '온라인 마케팅과 웹사이트 최적화로 매출 극대화하는 방법',
    thumbnailUrl: 'https://img.youtube.com/vi/SWkmuibSQ4E/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=SWkmuibSQ4E',
    youtubeId: 'SWkmuibSQ4E',
    duration: '48:56',
    publishDate: '2023-12-15',
    views: 11750,
    likes: 367,
    category: 'marketing',
    level: 'intermediate',
    tags: ['디지털마케팅', '웹사이트', '매출증대', 'SEO'],
    instructor: {
      name: '이후경',
      title: 'M-CENTER 센터장',
      avatar: 'https://picsum.photos/100/100?random=10'
    }
  }
];

// 카테고리 정의
const categories = [
  { id: 'all', name: '전체', icon: Grid },
  { id: 'business', name: '사업분석', icon: TrendingUp },
  { id: 'ai', name: 'AI활용', icon: Cpu },
  { id: 'startup', name: '기술창업', icon: Rocket },
  { id: 'policy', name: '정책자금', icon: DollarSign },
  { id: 'certification', name: '인증', icon: Award },
];

const seminars = [
  {
    id: 1,
    title: 'BM ZEN 사업분석 마스터클래스',
    description: '세무사를 위한 신규사업 성공률 95% 달성 전략',
    date: '2024년 2월 15일',
    time: '14:00 - 17:00',
    location: '서울 강남 M-Center 교육장',
    instructor: '이후경 센터장',
    category: 'business',
    level: '중급',
    capacity: 30,
    enrolled: 24,
    price: '무료',
    tags: ['BM ZEN', '사업분석', '수익모델', '세무사'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'ChatGPT 실무 활용 워크샵',
    description: '업무 생산성 40% 향상을 위한 AI 도구 활용법',
    date: '2024년 2월 20일',
    time: '10:00 - 12:00',
    location: '온라인 (Zoom)',
    instructor: 'AI 전문가팀',
    category: 'ai',
    level: '초급',
    capacity: 100,
    enrolled: 87,
    price: '무료',
    tags: ['ChatGPT', 'AI', '생산성', '자동화'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  {
    id: 3,
    title: '정책자금 활용 전략 세미나',
    description: '투자분석과 함께하는 정책자금 확보 노하우',
    date: '2024년 2월 22일',
    time: '15:00 - 18:00',
    location: '서울 강남 M-Center 세미나실',
    instructor: '정책자금 전문가',
    category: 'policy',
    level: '중급',
    capacity: 40,
    enrolled: 35,
    price: '무료',
    tags: ['정책자금', '투자분석', 'NPV', 'IRR'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'R&D 정부지원사업 성공전략',
    description: '평균 5억원 정부지원금 확보 방법론',
    date: '2024년 2월 25일',
    time: '14:00 - 17:00',
    location: '온라인 (Zoom)',
    instructor: '기술창업 전문가',
    category: 'startup',
    level: '고급',
    capacity: 50,
    enrolled: 42,
    price: '50,000원',
    tags: ['R&D', '정부지원', '기술사업화', '창업'],
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop'
  },
  {
    id: 5,
    title: '벤처기업 인증 취득 가이드',
    description: '세제혜택 5천만원을 위한 인증 전략',
    date: '2024년 3월 5일',
    time: '10:00 - 12:00',
    location: '서울 강남 M-Center 교육장',
    instructor: '인증 전문가',
    category: 'certification',
    level: '초급',
    capacity: 40,
    enrolled: 28,
    price: '무료',
    tags: ['벤처인증', 'ISO', 'ESG', '세제혜택'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop'
  }
];

export default function SeminarPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<SeminarVideo | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState(false);

  // 필터링된 비디오 목록
  const filteredVideos = seminarVideos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // 유튜브 비디오 재생
  const playYouTubeVideo = (youtubeId: string, videoId?: string) => {
    console.log('playYouTubeVideo 함수 호출됨:', { youtubeId, videoId });
    
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;
    console.log('YouTube 영상 열기:', url);
    const newWindow = window.open(url, '_blank');
    if (!newWindow) {
      console.error('새 창 열기 실패 - 팝업 차단 가능성');
      alert('팝업이 차단되었을 수 있습니다. 브라우저 설정을 확인해주세요.\n\n직접 링크: ' + url);
    }
  };

  // 구독 토글
  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      setNotifications(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      {/* 🎬 Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            {/* 상단 배지 */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-8">
              <Youtube className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium">Live Streaming on YouTube</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* 메인 타이틀 */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                M-CENTER
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-light">세미나 영상</span>
            </h1>
            
            {/* 서브 타이틀 */}
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-12 leading-relaxed">
              25년 경험의 전문가와 함께하는
              <br />
              <span className="font-semibold text-yellow-300">실무 중심 온라인 교육</span>
            </p>
            
            {/* 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              {[
                { label: '총 시청시간', value: '1,250시간', icon: Clock },
                { label: '구독자', value: '12,500명', icon: Users },
                { label: '영상 수', value: '85개', icon: Play },
                { label: '평균 만족도', value: '4.9/5', icon: Star }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
                onClick={() => window.open('https://www.youtube.com/channel/UCmCTUihEcCGhI0WJXlRfqRA', '_blank')}
              >
                <Youtube className="w-6 h-6 mr-3" />
                유튜브 채널 보기
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                onClick={toggleSubscription}
              >
                <Bell className={`w-6 h-6 mr-3 ${isSubscribed ? 'text-yellow-300' : ''}`} />
                {isSubscribed ? '구독중' : '구독하기'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* 떠다니는 도형들 */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-300/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-400/10 rounded-full animate-ping"></div>
      </section>

      {/* 🔍 검색 및 필터 */}
      <section className="py-12 bg-white/50 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* 검색바 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="세미나 영상 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/80 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>
            
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/80 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 📹 비디오 갤러리 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📺 전문가 세미나 영상
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              실무에 바로 적용할 수 있는 전문 지식을 영상으로 만나보세요
            </p>
          </div>

          {/* 비디오 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <Card key={video.id} interactive={true} touchOptimized={true} className="group cursor-pointer overflow-hidden bg-white/80 backdrop-blur-sm border-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2">
                <div className="relative">
                  {/* 썸네일 */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* 재생 버튼 오버레이 */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-2xl"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('재생 버튼 클릭:', video.id, video.youtubeId);
                          playYouTubeVideo(video.youtubeId, video.id);
                        }}
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>
                    
                    {/* 배지들 */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {video.id === '1' && (
                        <Badge className="bg-red-600 text-white flex items-center gap-1">
                          <Youtube className="w-3 h-3" />
                          영상
                        </Badge>
                      )}
                      {video.isLive && (
                        <Badge className="bg-red-500 text-white animate-pulse">
                          🔴 LIVE
                        </Badge>
                      )}
                      {video.isNew && (
                        <Badge className="bg-green-500 text-white">
                          🆕 NEW
                        </Badge>
                      )}
                    </div>
                    
                    {/* 재생시간 */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                      {video.duration}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    {/* 강사 정보 */}
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={video.instructor.avatar} 
                        alt={video.instructor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{video.instructor.name}</div>
                        <div className="text-sm text-gray-600">{video.instructor.title}</div>
                      </div>
                    </div>
                    
                    {/* 제목 */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {video.title}
                    </h3>
                    
                    {/* 설명 */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    
                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {video.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* 통계 */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {video.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {video.likes}
                        </div>
                      </div>
                      <div className="text-gray-500">
                        {new Date(video.publishDate).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                    
                    {/* 액션 버튼들 */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('영상보기 버튼 클릭:', video.id, video.youtubeId);
                          playYouTubeVideo(video.youtubeId, video.id);
                        }}
                      >
                        {video.id === '1' ? (
                          <>
                            <Youtube className="w-4 h-4 mr-2" />
                            영상 보기
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            재생
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline" className="px-3">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="px-3">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          
          {/* 검색 결과 없음 */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600 mb-6">다른 키워드로 검색해보세요</p>
              <Button onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                전체 보기
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 🎯 구독 CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Youtube className="w-20 h-20 mx-auto mb-6 text-red-300" />
            <h2 className="text-4xl font-bold mb-4">
              M-CENTER 유튜브 채널 구독하기
            </h2>
            <p className="text-xl opacity-90 mb-8">
              새로운 세미나 영상과 실무 팁을 가장 빠르게 받아보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Bell, title: '실시간 알림', desc: '새 영상 업로드 즉시 알림' },
              { icon: Star, title: '독점 콘텐츠', desc: '구독자만을 위한 특별 영상' },
              { icon: MessageCircle, title: '라이브 소통', desc: '실시간 Q&A와 상담' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://www.youtube.com/channel/UCmCTUihEcCGhI0WJXlRfqRA?sub_confirmation=1', '_blank')}
            >
              <Youtube className="w-6 h-6 mr-3" />
              유튜브 구독하기
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => window.open('/consultation', '_self')}
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              1:1 상담 신청
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* 📞 문의 및 지원 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            더 궁금한 것이 있으신가요?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            전문가와 직접 상담받고 맞춤형 솔루션을 받아보세요
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">온라인 상담</h3>
                <p className="text-gray-600 mb-4">24시간 내 전문가 답변</p>
                <Button 
                  className="w-full"
                  onClick={() => window.open('/consultation', '_self')}
                >
                  상담 신청하기
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">전화 상담</h3>
                <p className="text-gray-600 mb-4">010-9251-9743</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('tel:010-9251-9743')}
                >
                  전화하기
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 