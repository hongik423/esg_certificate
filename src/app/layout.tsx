import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FloatingChatbot from '@/components/layout/floating-chatbot';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_BASE_URL || 'https://esg-certificate.vercel.app'
    : 'http://localhost:3000'
  ),
  title: {
    default: 'ESG 인증원 | KAB 인정 ESG 경영시스템 시범 인증기관',
    template: '%s | ESG 인증원'
  },
  description: 'ESG 인증원 - KAB 인정 ESG 경영시스템 시범 인증기관. AI 기반 ISO 9001, ISO 14001, ISO 45001, ESG 인증 서비스와 24시간 AI 상담, 세금계산기, 투자분석기를 제공합니다.',
  keywords: [
    'ESG 인증원', 'KAB 인정', 'ESG 경영시스템', 'ISO 9001', 'ISO 14001', 'ISO 45001',
    'AI 인증', '품질경영시스템', '환경경영시스템', '안전보건경영시스템',
    'AI 챗봇', '세금계산기', '투자타당성분석기', '24시간 상담',
    '이후경영지도사', '인증 컨설팅', '기업 진단'
  ],
  authors: [{ name: 'ESG 인증원', url: 'https://esg-certificate.vercel.app' }],
  creator: 'ESG 인증원',
  publisher: 'ESG 인증원',
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
    url: 'https://esg-certificate.vercel.app',
    title: 'ESG 인증원 | KAB 인정 ESG 경영시스템 시범 인증기관',
    description: 'AI 기반 ISO 9001, ISO 14001, ISO 45001, ESG 인증 서비스. 24시간 AI 상담, 세금계산기, 투자분석기 제공. 공평성을 최고의 가치로 신뢰받는 인증서비스.',
    siteName: 'ESG 인증원',
    images: [
      {
        url: 'https://esg-certificate.vercel.app/esgr_logo.svg',
        width: 1200,
        height: 630,
        alt: 'ESG 인증원 - KAB 인정 ESG 경영시스템 시범 인증기관',
        type: 'image/svg+xml',
      },
      {
        url: 'https://esg-certificate.vercel.app/company-logo-new.svg',
        width: 800,
        height: 600,
        alt: 'ESG 인증원 로고',
        type: 'image/svg+xml',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@esg_certificate',
    creator: '@esg_certificate',
    title: 'ESG 인증원 | KAB 인정 ESG 경영시스템 시범 인증기관',
    description: 'AI 기반 ISO 인증 서비스와 24시간 AI 상담, 세금계산기, 투자분석기를 제공하는 신뢰받는 인증기관입니다.',
    images: ['https://esg-certificate.vercel.app/esgr_logo.svg'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  other: {
    'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
    'og:phone_number': '010-9251-9743',
    'og:email': 'hongik423@gmail.com',
    'og:locality': '서울특별시',
    'og:region': '강남구',
    'og:country-name': '대한민국',
    'og:site_name': 'ESG 인증원',
    'og:type': 'website',
    'og:logo': 'https://esg-certificate.vercel.app/esgr_logo.svg',
    'article:author': 'ESG 인증원',
    'article:publisher': 'ESG 인증원',
    'business:contact_data:street_address': '서울특별시 강남구',
    'business:contact_data:locality': '서울특별시',
    'business:contact_data:region': '강남구',
    'business:contact_data:postal_code': '06000',
    'business:contact_data:country_name': '대한민국',
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
        <meta name="version" content="3.0" />
        
        {/* 🔧 한글 폰트 최적화 - Pretendard만 사용 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* 🔧 성능 최적화: DNS 프리페치 - Google Apps Script 기반 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//script.google.com" />
        <link rel="dns-prefetch" href="//generativelanguage.googleapis.com" />
        
        {/* PWA 및 모바일 최적화 메타 태그 */}
        <meta name="theme-color" content="#16a34a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ESG 인증원" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* 모바일 성능 최적화 */}
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-orientations" content="portrait-any" />
        
        {/* Vercel 배포 최적화 설정 */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://esg-certificate.vercel.app'} />
        
        {/* 구조화된 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ESG 인증원",
              "alternateName": "ESGR",
              "description": "KAB 인정 ESG 경영시스템 시범 인증기관. AI 기반 ISO 9001, ISO 14001, ISO 45001, ESG 인증 서비스 제공.",
              "url": "https://esg-certificate.vercel.app",
              "logo": "https://esg-certificate.vercel.app/esgr_logo.svg",
              "image": "https://esg-certificate.vercel.app/esgr_logo.svg",
              "telephone": "010-9251-9743",
              "email": "hongik423@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressRegion": "서울특별시",
                "addressLocality": "강남구",
                "postalCode": "06000",
                "streetAddress": "서울특별시 강남구"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "010-9251-9743",
                "contactType": "customer service",
                "availableLanguage": "Korean"
              },
              "sameAs": [
                "https://esg-certificate.vercel.app"
              ],
              "founder": {
                "@type": "Person",
                "name": "이후경영지도사",
                "jobTitle": "ESG인증원 선임심사원"
              },
              "areaServed": "KR",
              "knowsAbout": [
                "ESG 경영시스템 인증",
                "ISO 9001 품질경영시스템",
                "ISO 14001 환경경영시스템", 
                "ISO 45001 안전보건경영시스템",
                "AI 기반 인증 서비스"
              ]
            })
          }}
        />

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
