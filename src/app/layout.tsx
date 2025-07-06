import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FloatingChatbot from '@/components/layout/floating-chatbot';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

// 안정성을 위한 단순화

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'https://m-center-landingpage.vercel.app'
    : 'http://localhost:3000'
  ),
  title: {
    default: 'M-CENTER | AI 기업진단 및 경영컨설팅',
    template: '%s | M-CENTER'
  },
  description: 'M-CENTER 기업의별 경영지도센터 - AI 기반 무료 진단과 전문 컨설팅으로 중소기업 성장을 지원합니다.',
  keywords: [
    'M-CENTER', '기업진단', 'AI진단', '경영컨설팅', '중소기업', 
    '사업분석', 'BM ZEN', 'AI생산성', '공장경매', '기술창업', 
    '인증지원', '웹사이트구축', '세금계산기'
  ],
  authors: [{ name: 'M-CENTER 경영지도센터' }],
  creator: 'M-CENTER',
  publisher: 'M-CENTER',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://m-center-landingpage.vercel.app',
    title: 'M-CENTER | AI 기업진단 및 경영컨설팅',
    description: 'AI 기반 무료 진단과 전문 컨설팅으로 중소기업 성장을 지원합니다.',
    siteName: 'M-CENTER',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M-CENTER | AI 기업진단 및 경영컨설팅',
    description: 'AI 기반 무료 진단과 전문 컨설팅으로 중소기업 성장을 지원합니다.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 🔧 UTF-8 인코딩 명시적 설정 - GitHub Pages 한글 깨짐 방지 */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="Content-Language" content="ko" />
        
        {/* 🔧 모바일 뷰포트 최적화 - 향상된 터치 지원 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=yes, date=no, email=yes, address=no" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-optimized" content="width=device-width, initial-scale=1.0" />
        
        {/* 🔧 최적화된 캐시 설정 */}
        <meta name="version" content="2.0" />
        
        {/* 🔧 한글 폰트 최적화 - Pretendard만 사용 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 🔧 성능 최적화: DNS 프리페치 - Google Apps Script 기반 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//script.google.com" />
        <link rel="dns-prefetch" href="//generativelanguage.googleapis.com" />
        
        {/* PWA 및 모바일 최적화 메타 태그 */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="M-CENTER" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* 모바일 성능 최적화 */}
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-orientations" content="portrait-any" />
        

        
        {/* Vercel 배포 최적화 설정 */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://m-center-landingpage.vercel.app'} />
        

      </head>
      <body className={inter.className} suppressHydrationWarning>        
        <Providers>
          <div className="min-h-screen flex flex-col" suppressHydrationWarning>
            <Header />
            <main className="flex-1" suppressHydrationWarning>
              {children}
            </main>
            <Footer />
            <FloatingChatbot />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
