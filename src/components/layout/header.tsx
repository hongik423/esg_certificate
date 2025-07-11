'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown,
  Award,
  GraduationCap,
  Building2,
  FileText,
  Users,
  FolderOpen,
  MapPin,
  Calculator,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { getImagePath } from '@/lib/utils';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 메뉴 클릭 시 닫기
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // ESG 인증원 메뉴 구조
  const mainNavItems = [
    { 
      href: '/about', 
      label: '회사소개',
      icon: Building2,
      submenu: [
        { href: '/about', label: '기관소개' },
        { href: '/company/impartiality', label: '공평성 선언' },
        { href: '/company/location', label: '오시는 길' }
      ]
    },
    { 
      href: '/esg-certification/services', 
      label: '인증서비스',
      icon: Award,
      submenu: [
        { href: '/esg-certification/services/process', label: '인증절차' },
        { href: '/esg-certification/services/cost', label: '심사비용 및 신청' },
        { href: '/esg-certification/services/compliance', label: '기업준수사항' },
        { href: '/support/downloads', label: '인증관련자료다운로드' }
      ]
    },
    { 
      href: '/education', 
      label: '교육서비스',
      icon: GraduationCap,
      submenu: [
        { href: '/education', label: '교육소개' },
        { href: '/education/schedule', label: '교육일정' },
        { href: '/education/apply', label: '교육신청' }
      ]
    },
    { 
      href: '/customer/notice', 
      label: '고객서비스',
      icon: Users,
      submenu: [
        { href: '/customer/notice', label: '공지사항' },
        { href: '/customer/complaint', label: '불만 및 이의제기' },
        { href: '/customer/faq', label: 'FAQ' }
      ]
    },
    { 
      href: '/resources', 
      label: '자료실',
      icon: FolderOpen,
      submenu: [
        { href: '/resources/iso-documents', label: 'ISO자료' },
        { href: '/resources/auditor-list', label: '심사원리스트' }
      ]
    }
  ];

  // 기존 5대 서비스 (인증지원 제외됨)
  const serviceNavItems = [
    { href: '/services/business-analysis', label: '사업분석' },
    { href: '/services/ai-productivity', label: 'AI일터혁신' },
    { href: '/services/policy-funding', label: '정책자금' },
    { href: '/services/tech-startup', label: '기술창업' },
    { href: '/services/website', label: '웹사이트' }
  ];

  // 금융 도구 섹션 추가
  const financialToolsItems = [
    { href: '/tax-calculator', label: '세금계산기', icon: Calculator },
    { href: '/services/policy-funding/investment-analysis', label: '투자분석', icon: TrendingUp }
  ];

  const actionItems = [
    { href: '/esg-certification/consultation', label: '인증 신청', green: true },
    { href: '/consultation', label: '상담신청', green: true },
    { href: '/diagnosis', label: '무료경영진단', orange: true },
    { href: '/iso-diagnosis', label: 'ISO 인증진단', blue: true }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-xl shadow-md border-b border-gray-100' 
        : 'bg-white/95 backdrop-blur-xl border-b border-gray-100'
    }`}>
      <div className="w-full px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center" onClick={handleMenuClose}>
            <div className="flex items-center space-x-2">
              <img 
                src="/esgr_logo.svg" 
                alt="ESG 인증원" 
                className="h-12 w-auto"
              />
              <div className="hidden sm:block">
                <p className="text-xs text-gray-600">KAB 인정 인증기관</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - 반응형 개선 */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {/* ESG 인증원 메뉴 */}
              {mainNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                
                return (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`flex items-center text-xs xl:text-sm font-medium transition-all duration-300 whitespace-nowrap px-1 xl:px-2 py-2 rounded-md ${
                        isActive
                          ? 'text-green-600 bg-green-50'
                          : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      <item.icon className="w-3 h-3 xl:w-4 xl:h-4 mr-1" />
                      {item.label}
                    </Link>
                    
                    {/* Dropdown submenu */}
                    {item.submenu && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* 구분선 */}
              <div className="h-4 w-px bg-gray-300 mx-1"></div>
              
              {/* 5대 서비스 */}
              {serviceNavItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs xl:text-sm font-medium transition-all duration-300 whitespace-nowrap px-1 xl:px-2 py-2 rounded-md ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* 구분선 */}
              <div className="h-4 w-px bg-gray-300 mx-1"></div>

              {/* 금융 도구 */}
              {financialToolsItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center text-xs xl:text-sm font-medium transition-all duration-300 whitespace-nowrap px-1 xl:px-2 py-2 rounded-md ${
                      isActive
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <item.icon className="w-3 h-3 xl:w-4 xl:h-4 mr-1" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Desktop Action Items - 전화번호 삭제 */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            {actionItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs xl:text-sm font-semibold transition-all duration-300 whitespace-nowrap px-3 xl:px-4 py-2 rounded-full border ${
                    item.green
                      ? isActive
                        ? 'bg-green-600 text-white shadow-lg border-green-600 transform scale-105'
                        : 'bg-green-500 text-white hover:bg-green-600 border-green-500 shadow-md hover:shadow-lg hover:transform hover:scale-105'
                      : item.orange
                        ? isActive
                          ? 'bg-orange-600 text-white shadow-lg border-orange-600 transform scale-105'
                          : 'bg-orange-500 text-white hover:bg-orange-600 border-orange-500 shadow-md hover:shadow-lg hover:transform hover:scale-105'
                        : item.blue
                          ? isActive
                            ? 'bg-blue-600 text-white shadow-lg border-blue-600 transform scale-105'
                            : 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500 shadow-md hover:shadow-lg hover:transform hover:scale-105'
                          : isActive
                            ? 'text-gray-900 bg-gray-100 border-gray-200'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -mr-1 rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            style={{ 
              minWidth: '44px', 
              minHeight: '44px',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4">
              {/* ESG 인증원 메뉴 */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  ESG 인증원
                </h3>
                <div className="space-y-1">
                  {mainNavItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    
                    return (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          onClick={handleMenuClose}
                          className={`flex items-center py-3 px-3 text-base font-medium transition-all duration-200 rounded-lg touch-manipulation ${
                            isActive
                              ? 'text-green-600 bg-green-50 border-l-4 border-green-500'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                          }`}
                          style={{ 
                            minHeight: '48px',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                        >
                          <item.icon className="w-5 h-5 mr-2" />
                          {item.label}
                        </Link>
                        
                        {/* Submenu items */}
                        {item.submenu && (
                          <div className="ml-8 mt-1 space-y-1">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={handleMenuClose}
                                className="block py-2 px-3 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5대 서비스 */}
              <div className="mb-6 border-t border-gray-200 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  경영 컨설팅
                </h3>
                <div className="space-y-1">
                  {serviceNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleMenuClose}
                        className={`block py-3 px-3 text-base font-medium transition-all duration-200 rounded-lg touch-manipulation ${
                          isActive
                            ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                        style={{ 
                          minHeight: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* 금융 도구 */}
              <div className="mb-6 border-t border-gray-200 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  금융 도구
                </h3>
                <div className="space-y-1">
                  {financialToolsItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleMenuClose}
                        className={`flex items-center py-3 px-3 text-base font-medium transition-all duration-200 rounded-lg touch-manipulation ${
                          isActive
                            ? 'text-purple-600 bg-purple-50 border-l-4 border-purple-500'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                        style={{ 
                          minHeight: '48px',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        <item.icon className="w-5 h-5 mr-2" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Action Items */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  바로가기
                </h3>
                <div className="space-y-2">
                  {actionItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleMenuClose}
                        className={`block py-3 px-3 text-base font-semibold transition-all duration-200 rounded-lg touch-manipulation ${
                          item.green
                            ? 'text-white bg-green-500 hover:bg-green-600 active:bg-green-700 shadow-md'
                            : item.orange
                              ? 'text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 shadow-md'
                              : item.blue
                                ? 'text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-md'
                                : isActive
                                  ? 'text-gray-900 bg-gray-100'
                                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                        style={{ 
                          minHeight: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 