'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Facebook, 
  Youtube, 
  Award,
  Shield,
  Leaf,
  Globe,
  FileText,
  Users,
  Building2,
  GraduationCap
} from 'lucide-react';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/esgr_logo.svg" 
                alt="ESG 인증원" 
                className="h-16 w-auto"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xl text-white">{COMPANY_INFO.name}</span>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">KAB 인정</span>
                </div>
                <p className="text-gray-300 text-sm">{COMPANY_INFO.description}</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 text-sm leading-relaxed max-w-md">
              {COMPANY_INFO.slogan}<br />
              {COMPANY_INFO.vision}
            </p>
            
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Building2 className="w-4 h-4 text-green-400" />
                <span>대표이사: {COMPANY_INFO.ceoName}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="font-medium text-green-300">{CONTACT_INFO.mainPhone}</span>
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">{CONSULTANT_INFO.fullTitle}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span>{CONTACT_INFO.mainEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span>대표전화: {CONTACT_INFO.officePhone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* 인증 서비스 */}
          <div>
            <h4 className="font-semibold mb-6 text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              인증 서비스
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link 
                  href="/esg-certification/services" 
                  className="hover:text-green-400 transition-colors text-sm flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-blue-400" />
                  ISO 9001 품질경영
                </Link>
              </li>
              <li>
                <Link 
                  href="/esg-certification/services" 
                  className="hover:text-green-400 transition-colors text-sm flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4 text-green-400" />
                  ISO 14001 환경경영
                </Link>
              </li>
              <li>
                <Link 
                  href="/esg-certification/services" 
                  className="hover:text-green-400 transition-colors text-sm flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-orange-400" />
                  ISO 45001 안전보건
                </Link>
              </li>
              <li>
                <Link 
                  href="/esg-certification/services" 
                  className="hover:text-green-400 transition-colors text-sm flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-purple-400" />
                  ESG 경영시스템
                </Link>
              </li>
              <li>
                <Link 
                  href="/education" 
                  className="hover:text-green-400 transition-colors text-sm flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-yellow-400" />
                  교육 서비스
                </Link>
              </li>
            </ul>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">빠른 링크</h4>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-green-400 transition-colors text-sm"
                >
                  회사소개
                </Link>
              </li>
              <li>
                <Link 
                  href="/esg-certification/consultation" 
                  className="hover:text-green-400 transition-colors text-sm"
                >
                  인증 신청
                </Link>
              </li>
              <li>
                <Link 
                  href="/resources/iso-documents" 
                  className="hover:text-green-400 transition-colors text-sm"
                >
                  ISO 자료실
                </Link>
              </li>
              <li>
                <Link 
                  href="/support/faq" 
                  className="hover:text-green-400 transition-colors text-sm"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link 
                  href="/consultation" 
                  className="hover:text-green-400 transition-colors text-sm"
                >
                  전문가 상담
                </Link>
              </li>
              <li>
                <Link 
                  href="/iso-diagnosis" 
                  className="hover:text-green-400 transition-colors text-sm"
                >
                  ISO 인증 진단
                </Link>
              </li>
            </ul>
            
            {/* 인증 마크 */}
            <div>
              <h5 className="font-medium text-sm mb-3 text-gray-300">인증 마크</h5>
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-green-400">KAB</span>
                </div>
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-400">IAF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 {COMPANY_INFO.name}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                사업자등록번호: {COMPANY_INFO.businessNumber}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                이용약관
              </Link>
              <Link 
                href="/sitemap" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                사이트맵
              </Link>
            </div>
          </div>
          
          {/* ESG 핵심 가치 */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <h5 className="font-medium text-sm mb-3 text-green-300">ESG 인증원 핵심 가치</h5>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                {COMPANY_INFO.coreValues.map((value, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 경영 컨설팅 서비스 유지 */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <h5 className="font-medium text-sm mb-3 text-blue-300">경영 컨설팅 서비스</h5>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                <Link href="/services/business-analysis" className="hover:text-blue-400 transition-colors">
                  사업분석
                </Link>
                <span className="text-gray-600">•</span>
                <Link href="/services/ai-productivity" className="hover:text-blue-400 transition-colors">
                  AI일터혁신
                </Link>
                <span className="text-gray-600">•</span>
                <Link href="/services/policy-funding" className="hover:text-blue-400 transition-colors">
                  정책자금
                </Link>
                <span className="text-gray-600">•</span>
                <Link href="/services/tech-startup" className="hover:text-blue-400 transition-colors">
                  기술창업
                </Link>
                <span className="text-gray-600">•</span>
                <Link href="/services/certification" className="hover:text-blue-400 transition-colors">
                  인증지원
                </Link>
                <span className="text-gray-600">•</span>
                <Link href="/services/website" className="hover:text-blue-400 transition-colors">
                  웹사이트
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 