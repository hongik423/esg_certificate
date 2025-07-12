'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  GraduationCap,
  Users,
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Award,
  CheckCircle,
  FileText,
  Download,
  Phone,
  Mail,
  BookOpen,
  Target,
  Briefcase,
  Star,
  User,
  Building,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/header';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';

// 교육 과정 상세 데이터
const educationPrograms = {
  'iso-9001-internal': {
    id: 'iso-9001-internal',
    category: 'ISO 9001',
    title: 'ISO 9001 내부심사원 양성과정',
    subtitle: '품질경영시스템 내부심사원 자격 취득',
    description: '품질경영시스템의 효과적인 운영을 위한 내부심사원 양성 전문 과정입니다. ISO 9001:2015 표준의 요구사항을 이해하고 내부심사 기법을 습득하여 조직의 품질경영시스템 개선에 기여할 수 있는 전문가를 양성합니다.',
    duration: '3일 (24시간)',
    target: '품질관리 담당자, 내부심사원 희망자, 품질경영시스템 구축 담당자',
    level: '초급~중급',
    maxParticipants: 20,
    minParticipants: 8,
    price: '450,000원',
    priceDetail: {
      individual: '450,000원',
      group: '400,000원 (3명 이상)',
      early: '400,000원 (2주 전 신청)',
      member: '380,000원 (협회 회원)'
    },
    objectives: [
      'ISO 9001:2015 표준 요구사항의 완전한 이해',
      '효과적인 내부심사 계획 수립 및 실행 능력 습득',
      '체계적인 부적합 사항 식별 및 작성 기법 마스터',
      '시정조치 요구 및 효과성 검증 방법론 습득',
      '심사보고서 작성 및 후속조치 관리 능력 개발',
      '조직의 지속적 개선 활동 주도 역량 강화'
    ],
    curriculum: [
      {
        day: '1일차',
        title: 'ISO 9001 기초 및 요구사항',
        topics: [
          '품질경영시스템 개요 및 발전사',
          'ISO 9001:2015 표준 구조 및 핵심 변경사항',
          '조항별 요구사항 상세 해석 (조항 4~10)',
          '프로세스 접근법과 리스크 기반 사고',
          '문서화 요구사항 및 기록 관리',
          '실습: 요구사항 해석 및 적용 사례'
        ]
      },
      {
        day: '2일차',
        title: '내부심사 방법론 및 기법',
        topics: [
          '내부심사의 목적과 원칙',
          '심사 계획 수립 및 체크리스트 작성',
          '심사 기법 및 인터뷰 스킬',
          '증거 수집 및 평가 방법',
          '부적합 사항 식별 및 분류',
          '실습: 모의 심사 진행 및 피드백'
        ]
      },
      {
        day: '3일차',
        title: '심사보고서 작성 및 종합 실습',
        topics: [
          '부적합 보고서 작성 실무',
          '시정조치 요구 및 검증 방법',
          '심사보고서 작성 및 발표',
          '종합 실습: 실제 사례 기반 심사 시뮬레이션',
          '평가 및 수료증 발급',
          'Q&A 및 현장 애로사항 해결'
        ]
      }
    ],
    instructors: [
      {
        name: '박윤철 대표',
        title: 'ESG 인증원 대표',
        experience: '30년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 9001/14001/45001 선임심사원',
          '경영학박사'
        ],
        description: '30년간의 풍부한 현장 경험을 바탕으로 실무 중심의 교육을 제공하며, 수많은 기업의 품질경영시스템 구축 및 개선을 지원해왔습니다.'
      },
      {
        name: '이후경 경영지도사',
        title: 'ESG 인증원 선임심사원',
        experience: '25년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 9001/14001/45001 선임심사원',
          '경영지도사',
          '기술경영 석사'
        ],
        description: '25년간의 풍부한 현장 경험을 바탕으로 실무 중심의 교육을 제공하며, 수많은 기업의 품질경영시스템 구축 및 개선을 지원해왔습니다.'
      },
      {
        name: '홍용기 경영지도사',
        title: 'ESG 인증원 선임심사원',
        experience: '20년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 9001/14001/45001 선임심사원',
          '경영지도사',
          '컨설팅학 박사'
        ],
        description: '20년간의 풍부한 현장 경험을 바탕으로 실무 중심의 교육을 제공하며, 수많은 기업의 품질경영시스템 구축 및 개선을 지원해왔습니다.'
      }
    ],
    materials: [
      'ISO 9001:2015 표준 원문 (한글판)',
      '내부심사 체크리스트 템플릿',
      '부적합 보고서 양식',
      '심사보고서 작성 가이드',
      '실습용 사례 자료집',
      '수료증 (출석률 80% 이상)'
    ],
    benefits: [
      '체계적인 내부심사 역량 습득',
      '조직의 품질경영시스템 개선 기여',
      '개인 전문성 및 경력 개발',
      '네트워킹 기회 제공',
      '지속적인 사후 지원 서비스',
      '재교육 50% 할인 혜택'
    ],
    schedule: [
      { 
        date: '2025년 1월 15-17일', 
        time: '09:00~18:00',
        status: 'open',
        remaining: 8,
        location: 'ESG 인증원 교육장'
      },
      { 
        date: '2025년 2월 12-14일', 
        time: '09:00~18:00',
        status: 'open',
        remaining: 12,
        location: 'ESG 인증원 교육장'
      },
      { 
        date: '2025년 3월 19-21일', 
        time: '09:00~18:00',
        status: 'planned',
        remaining: 20,
        location: 'ESG 인증원 교육장'
      }
    ],
    certification: {
      name: '내부심사원 수료증',
      issuer: 'ESG 인증원 (ESGR)',
      requirement: '출석률 80% 이상 및 실습 평가 통과',
      validity: '영구',
      recognition: 'KAB 인정기관 발급으로 공신력 확보'
    },
    faq: [
      {
        question: '교육 수료 후 바로 내부심사를 할 수 있나요?',
        answer: '네, 수료증을 받으시면 즉시 조직 내에서 내부심사원으로 활동하실 수 있습니다. 다만 처음 몇 차례는 경험이 있는 심사원과 함께 진행하시는 것을 권장합니다.'
      },
      {
        question: '온라인 교육도 가능한가요?',
        answer: '현재는 오프라인 교육만 진행하고 있습니다. 실습 위주의 교육 특성상 대면 교육이 더 효과적이라고 판단하고 있습니다.'
      },
      {
        question: '교육비 할인 혜택이 있나요?',
        answer: '3명 이상 단체 신청 시 10% 할인, 2주 전 조기 신청 시 10% 할인, 협회 회원은 15% 할인 혜택을 제공합니다.'
      },
      {
        question: '주차는 가능한가요?',
        answer: '건물 내 주차장을 이용하실 수 있으며, 교육 참석자에게는 3시간 무료 주차를 제공합니다.'
      }
    ]
  },
  'iso-14001-internal': {
    id: 'iso-14001-internal',
    category: 'ISO 14001',
    title: 'ISO 14001 내부심사원 양성과정',
    subtitle: '환경경영시스템 내부심사원 자격 취득',
    description: '환경경영시스템의 효과적인 운영을 위한 내부심사원 양성 전문 과정입니다. ISO 14001:2015 표준의 요구사항과 환경법규를 이해하고 환경 내부심사 기법을 습득하여 조직의 환경 성과 개선에 기여할 수 있는 전문가를 양성합니다.',
    duration: '3일 (24시간)',
    target: '환경관리 담당자, 내부심사원 희망자, 환경경영시스템 구축 담당자',
    level: '초급~중급',
    maxParticipants: 20,
    minParticipants: 8,
    price: '450,000원',
    priceDetail: {
      individual: '450,000원',
      group: '400,000원 (3명 이상)',
      early: '400,000원 (2주 전 신청)',
      member: '380,000원 (협회 회원)'
    },
    objectives: [
      'ISO 14001:2015 표준 요구사항의 완전한 이해',
      '환경측면 식별 및 평가 방법론 습득',
      '환경법규 검토 및 준수 평가 능력 개발',
      '효과적인 환경 내부심사 기법 마스터',
      '환경 부적합 사항 식별 및 개선 방안 도출',
      '조직의 환경 성과 개선 활동 주도 역량 강화'
    ],
    curriculum: [
      {
        day: '1일차',
        title: 'ISO 14001 기초 및 환경법규',
        topics: [
          '환경경영시스템 개요 및 동향',
          'ISO 14001:2015 표준 구조 및 요구사항',
          '주요 환경법규 및 규제 동향',
          '환경정책 및 목표 설정 방법',
          '이해관계자 요구사항 파악',
          '실습: 환경법규 검토 및 적용'
        ]
      },
      {
        day: '2일차',
        title: '환경측면 평가 및 관리',
        topics: [
          '환경측면 식별 방법론',
          '환경영향 평가 기법',
          '중요한 환경측면 결정 기준',
          '환경목표 및 세부목표 설정',
          '환경관리 프로그램 수립',
          '실습: 환경측면 평가 시뮬레이션'
        ]
      },
      {
        day: '3일차',
        title: '환경 내부심사 실습 및 평가',
        topics: [
          '환경 내부심사 계획 수립',
          '환경심사 체크리스트 작성',
          '현장 심사 기법 및 증거 수집',
          '환경 부적합 사항 작성 실무',
          '종합 실습: 환경심사 시뮬레이션',
          '평가 및 수료증 발급'
        ]
      }
    ],
    instructors: [
      {
        name: '박윤철 대표',
        title: 'ESG 인증원 대표',
        experience: '30년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 14001/9001/45001 선임심사원',
          '경영지도사 (환경경영)',
          '환경관리기술사'
        ],
        description: '환경경영 분야 30년의 전문 경험을 바탕으로 실무 중심의 교육을 제공하며, 다양한 업종의 환경경영시스템 구축 및 개선을 지원해왔습니다.'
      },
      {
        name: '이후경 경영지도사',
        title: 'ESG 인증원 선임심사원',
        experience: '25년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 14001/9001/45001 선임심사원',
          '경영지도사 (환경경영)',
          '환경관리기술사'
        ],
        description: '환경경영 분야 25년의 전문 경험을 바탕으로 실무 중심의 교육을 제공하며, 다양한 업종의 환경경영시스템 구축 및 개선을 지원해왔습니다.'
      },
      {
        name: '홍용기 경영지도사',
        title: 'ESG 인증원 선임심사원',
        experience: '20년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 14001/9001/45001 선임심사원',
          '경영지도사 (환경경영)',
          '환경관리기술사'
        ],
        description: '환경경영 분야 20년의 전문 경험을 바탕으로 실무 중심의 교육을 제공하며, 다양한 업종의 환경경영시스템 구축 및 개선을 지원해왔습니다.'
      }
    ],
    materials: [
      'ISO 14001:2015 표준 원문 (한글판)',
      '환경법규 요약집',
      '환경측면 평가 워크시트',
      '환경 내부심사 체크리스트',
      '환경 부적합 보고서 양식',
      '수료증 (출석률 80% 이상)'
    ],
    benefits: [
      '체계적인 환경 내부심사 역량 습득',
      '조직의 환경 성과 개선 기여',
      '환경법규 준수 관리 능력 향상',
      '환경 전문가로서 경력 개발',
      '지속적인 사후 지원 서비스',
      '재교육 50% 할인 혜택'
    ],
    schedule: [
      { 
        date: '2025년 1월 22-24일', 
        time: '09:00~18:00',
        status: 'open',
        remaining: 10,
        location: 'ESG 인증원 교육장'
      },
      { 
        date: '2025년 2월 26-28일', 
        time: '09:00~18:00',
        status: 'open',
        remaining: 15,
        location: 'ESG 인증원 교육장'
      },
      { 
        date: '2025년 3월 26-28일', 
        time: '09:00~18:00',
        status: 'planned',
        remaining: 20,
        location: 'ESG 인증원 교육장'
      }
    ],
    certification: {
      name: '환경 내부심사원 수료증',
      issuer: 'ESG 인증원 (ESGR)',
      requirement: '출석률 80% 이상 및 실습 평가 통과',
      validity: '영구',
      recognition: 'KAB 인정기관 발급으로 공신력 확보'
    },
    faq: [
      {
        question: '환경 관련 배경지식이 없어도 수강 가능한가요?',
        answer: '네, 환경경영 기초부터 체계적으로 교육하므로 배경지식이 없어도 충분히 수강 가능합니다. 다만 기본적인 환경 개념에 대한 사전 학습을 권장합니다.'
      },
      {
        question: '최신 환경법규 변경사항도 다루나요?',
        answer: '네, 교육 시점의 최신 환경법규 동향과 변경사항을 반영하여 교육합니다. 특히 탄소중립, ESG 관련 최신 규제도 포함됩니다.'
      },
      {
        question: '현장 실습이 포함되나요?',
        answer: '교육장 내에서 다양한 시뮬레이션과 실습을 진행하며, 실제 기업 사례를 바탕으로 한 케이스 스터디를 통해 현장감 있는 교육을 제공합니다.'
      }
    ]
  },
  'iso-45001-internal': {
    id: 'iso-45001-internal',
    category: 'ISO 45001',
    title: 'ISO 45001 내부심사원 양성과정',
    subtitle: '안전보건경영시스템 내부심사원 자격 취득',
    description: '안전보건경영시스템의 효과적인 운영을 위한 내부심사원 양성 전문 과정입니다. ISO 45001:2018 표준의 요구사항과 안전보건법규를 이해하고 위험성평가 및 안전보건 내부심사 기법을 습득하여 조직의 안전보건 성과 개선에 기여할 수 있는 전문가를 양성합니다.',
    duration: '3일 (24시간)',
    target: '안전보건 담당자, 내부심사원 희망자, 안전보건경영시스템 구축 담당자',
    level: '초급~중급',
    maxParticipants: 20,
    minParticipants: 8,
    price: '450,000원',
    priceDetail: {
      individual: '450,000원',
      group: '400,000원 (3명 이상)',
      early: '400,000원 (2주 전 신청)',
      member: '380,000원 (협회 회원)'
    },
    objectives: [
      'ISO 45001:2018 표준 요구사항의 완전한 이해',
      '체계적인 위험성평가 방법론 습득',
      '안전보건법규 이해 및 준수 평가 능력 개발',
      '효과적인 안전보건 내부심사 기법 마스터',
      '안전보건 부적합 사항 식별 및 개선 방안 도출',
      '조직의 안전보건 문화 개선 활동 주도'
    ],
    curriculum: [
      {
        day: '1일차',
        title: 'ISO 45001 기초 및 안전보건법규',
        topics: [
          '안전보건경영시스템 개요 및 발전사',
          'ISO 45001:2018 표준 구조 및 요구사항',
          '주요 안전보건법규 및 규제 동향',
          '안전보건정책 및 목표 설정',
          '근로자 참여 및 협의 방법',
          '실습: 안전보건법규 검토 및 적용'
        ]
      },
      {
        day: '2일차',
        title: '위험성평가 및 안전보건 관리',
        topics: [
          '위험요인 식별 방법론',
          '위험성평가 기법 및 실습',
          '위험성 결정 및 허용 가능한 위험 수준',
          '안전보건 목표 및 계획 수립',
          '비상사태 대비 및 대응 계획',
          '실습: 위험성평가 시뮬레이션'
        ]
      },
      {
        day: '3일차',
        title: '안전보건 내부심사 실습 및 평가',
        topics: [
          '안전보건 내부심사 계획 수립',
          '안전보건심사 체크리스트 작성',
          '현장 심사 기법 및 안전점검',
          '안전보건 부적합 사항 작성 실무',
          '종합 실습: 안전보건심사 시뮬레이션',
          '평가 및 수료증 발급'
        ]
      }
    ],
    instructors: [
      {
        name: '박윤철 대표',
        title: 'ESG 인증원 대표',
        experience: '30년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 45001/9001/14001 선임심사원',
          '경영지도사 (안전경영)',
          '산업안전기사'
        ],
        description: '안전보건경영 분야 30년의 전문 경험을 바탕으로 실무 중심의 교육을 제공하며, 다양한 업종의 안전보건경영시스템 구축 및 개선을 지원해왔습니다.'
      },
      {
        name: '이후경 경영지도사',
        title: 'ESG 인증원 선임심사원',
        experience: '25년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 45001/9001/14001 선임심사원',
          '경영지도사 (안전경영)',
          '산업안전기사'
        ],
        description: '안전보건경영 분야 25년의 전문 경험을 바탕으로 실무 중심의 교육을 제공하며, 다양한 업종의 안전보건경영시스템 구축 및 개선을 지원해왔습니다.'
      },
      {
        name: '홍용기 경영지도사',
        title: 'ESG 인증원 선임심사원',
        experience: '20년',
        certifications: [
          'KAB 인정 심사원',
          'ISO 45001/9001/14001 선임심사원',
          '경영지도사 (안전경영)',
          '산업안전기사'
        ],
        description: '안전보건경영 분야 20년의 전문 경험을 바탕으로 실무 중심의 교육을 제공하며, 다양한 업종의 안전보건경영시스템 구축 및 개선을 지원해왔습니다.'
      }
    ],
    materials: [
      'ISO 45001:2018 표준 원문 (한글판)',
      '안전보건법규 요약집',
      '위험성평가 워크시트',
      '안전보건 내부심사 체크리스트',
      '안전보건 부적합 보고서 양식',
      '수료증 (출석률 80% 이상)'
    ],
    benefits: [
      '체계적인 안전보건 내부심사 역량 습득',
      '조직의 안전보건 성과 개선 기여',
      '위험성평가 전문 능력 향상',
      '안전보건 전문가로서 경력 개발',
      '지속적인 사후 지원 서비스',
      '재교육 50% 할인 혜택'
    ],
    schedule: [
      { 
        date: '2025년 2월 5-7일', 
        time: '09:00~18:00',
        status: 'open',
        remaining: 12,
        location: 'ESG 인증원 교육장'
      },
      { 
        date: '2025년 3월 5-7일', 
        time: '09:00~18:00',
        status: 'open',
        remaining: 18,
        location: 'ESG 인증원 교육장'
      },
      { 
        date: '2025년 4월 9-11일', 
        time: '09:00~18:00',
        status: 'planned',
        remaining: 20,
        location: 'ESG 인증원 교육장'
      }
    ],
    certification: {
      name: '안전보건 내부심사원 수료증',
      issuer: 'ESG 인증원 (ESGR)',
      requirement: '출석률 80% 이상 및 실습 평가 통과',
      validity: '영구',
      recognition: 'KAB 인정기관 발급으로 공신력 확보'
    },
    faq: [
      {
        question: '안전보건 관련 자격증이 있어야 하나요?',
        answer: '관련 자격증이 없어도 수강 가능합니다. 다만 산업안전보건법 기본 지식이 있으면 교육 이해에 도움이 됩니다.'
      },
      {
        question: '업종별 특성이 반영되나요?',
        answer: '제조업, 건설업, 서비스업 등 다양한 업종의 사례를 다루며, 참석자의 업종에 따라 맞춤형 설명을 제공합니다.'
      },
      {
        question: '위험성평가 실습도 포함되나요?',
        answer: '네, 다양한 위험성평가 기법을 실습을 통해 학습하며, 실제 현장에서 바로 적용할 수 있는 실무 능력을 기를 수 있습니다.'
      }
    ]
  },
  'esg-basic': {
    id: 'esg-basic',
    category: 'ESG',
    title: 'ESG 경영시스템 기본과정',
    subtitle: 'ESG 경영의 이해와 구축 방법론',
    description: 'ESG(환경·사회·지배구조) 경영의 기본 개념부터 실무 적용까지 체계적으로 학습하는 과정입니다. 최신 ESG 동향과 규제를 이해하고 조직에 ESG 경영시스템을 구축할 수 있는 실무 능력을 기를 수 있습니다.',
    duration: '2일 (16시간)',
    target: 'ESG 담당자, 경영진, 관리자, ESG 경영 관심자',
    level: '입문~초급',
    maxParticipants: 25,
    minParticipants: 10,
    price: '350,000원',
    featured: true,
    priceDetail: {
      individual: '350,000원',
      group: '300,000원 (3명 이상)',
      early: '300,000원 (2주 전 신청)',
      member: '280,000원 (협회 회원)'
    },
    objectives: [
      'ESG 개념 및 국내외 동향의 완전한 이해',
      'ESG 경영시스템 구축 방법론 습득',
      'ESG 평가지표 및 측정 방법 이해',
      'ESG 보고서 작성 기초 능력 개발',
      'ESG 리스크 관리 방안 수립',
      '지속가능경영 전략 수립 역량 강화'
    ],
    curriculum: [
      {
        day: '1일차',
        title: 'ESG 개요 및 국내외 동향',
        topics: [
          'ESG 개념 및 중요성',
          '국내외 ESG 규제 동향',
          'EU 택소노미 및 CSRD 이해',
          'K-택소노미 및 국내 ESG 정책',
          'ESG 평가기관 및 평가 기준',
          '실습: ESG 현황 진단 체크리스트'
        ]
      },
      {
        day: '2일차',
        title: 'ESG 경영시스템 구축 실무',
        topics: [
          'ESG 경영전략 수립 방법론',
          'ESG 지표 설정 및 측정 방법',
          'ESG 데이터 수집 및 관리 체계',
          'ESG 보고서 작성 기초',
          'ESG 리스크 관리 및 기회 발굴',
          '실습: ESG 실행계획 수립'
        ]
      }
    ],
    instructors: [
      {
        name: '박윤철 대표',
        title: 'ESG 인증원 대표',
        experience: '30년',
        certifications: [
          'ESG 전문가',
          'KAB 인정 심사원',
          '경영지도사 (ESG경영)',
          '지속가능경영 전문가'
        ],
        description: 'ESG 경영 및 지속가능경영 분야의 선도적 전문가로서, 다양한 기업의 ESG 경영시스템 구축과 개선을 지원하고 있습니다.'
      },
      {
        name: '이후경 경영지도사',
        title: 'ESG 인증원 선임심사원',
        experience: '25년',
        certifications: [
          'ESG 전문가',
          'KAB 인정 심사원',
          '경영지도사 (ESG경영)',
          '지속가능경영 전문가'
        ],
        description: 'ESG 경영 및 지속가능경영 분야의 선도적 전문가로서, 다양한 기업의 ESG 경영시스템 구축과 개선을 지원하고 있습니다.'
      },
      {
        name: '홍용기 경영지도사',
        title: 'ESG 인증원 선임심사원',
        experience: '20년',
        certifications: [
          'ESG 전문가',
          'KAB 인정 심사원',
          '경영지도사 (ESG경영)',
          '지속가능경영 전문가'
        ],
        description: 'ESG 경영 및 지속가능경영 분야의 선도적 전문가로서, 다양한 기업의 ESG 경영시스템 구축과 개선을 지원하고 있습니다.'
      }
    ],
    materials: [
      'ESG 경영 가이드북',
      'ESG 법규 및 규제 요약집',
      'ESG 평가지표 체크리스트',
      'ESG 보고서 템플릿',
      'ESG 실행계획 워크시트',
      '수료증 (출석률 80% 이상)'
    ],
    benefits: [
      'ESG 경영 전문 지식 습득',
      '조직의 ESG 경영 도입 주도',
      'ESG 리스크 관리 능력 향상',
      'ESG 전문가로서 경력 개발',
      '지속적인 사후 지원 서비스',
      '고급과정 20% 할인 혜택'
    ],
    schedule: [
      { 
        date: '2025년 1월 29-30일', 
        time: '09:00~18:00',
        status: 'open',
        remaining: 8,
        location: 'ESG 인증원 교육장'
      },
      { 
        date: '2025년 2월 19-20일', 
        time: '09:00~18:00',
        status: 'open',
        remaining: 15,
        location: 'ESG 인증원 교육장'
      },
      { 
        date: '2025년 3월 12-13일', 
        time: '09:00~18:00',
        status: 'planned',
        remaining: 25,
        location: 'ESG 인증원 교육장'
      }
    ],
    certification: {
      name: 'ESG 경영시스템 수료증',
      issuer: 'ESG 인증원 (ESGR)',
      requirement: '출석률 80% 이상',
      validity: '영구',
      recognition: 'ESG 전문 인증기관 발급'
    },
    faq: [
      {
        question: 'ESG가 처음인데 수강해도 될까요?',
        answer: '네, 이 과정은 ESG 입문자를 위한 기본과정으로 설계되었습니다. ESG 개념부터 차근차근 설명하므로 사전 지식이 없어도 충분히 수강 가능합니다.'
      },
      {
        question: '중소기업에도 적용 가능한 내용인가요?',
        answer: '네, 대기업뿐만 아니라 중소기업의 특성을 고려한 ESG 도입 방안과 실무 사례를 다룹니다. 규모에 맞는 단계적 접근법을 제시합니다.'
      },
      {
        question: '최신 ESG 규제 동향도 다루나요?',
        answer: '네, EU 택소노미, CSRD, K-택소노미 등 최신 ESG 규제와 정책 동향을 상세히 다루며, 기업에 미치는 영향과 대응 방안을 설명합니다.'
      }
    ]
  }
};

export default function EducationProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;
  
  const program = educationPrograms[programId as keyof typeof educationPrograms];
  
  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">교육과정을 찾을 수 없습니다</h1>
          <Button onClick={() => router.push('/education')}>
            교육 목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-blue-600">홈</Link>
              <span>/</span>
              <Link href="/education" className="hover:text-blue-600">교육서비스</Link>
              <span>/</span>
              <span className="text-gray-900">{program.title}</span>
            </div>

            {/* Back Button */}
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => router.push('/education')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              교육 목록으로 돌아가기
            </Button>

            {/* Program Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-sm">
                      {program.category}
                    </Badge>
                    {program.featured && (
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        추천 과정
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {program.level}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {program.subtitle}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {program.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {program.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    1인 기준 / VAT 별도
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-gray-200">
                <div className="text-center">
                  <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">교육 기간</div>
                  <div className="font-semibold">{program.duration}</div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">정원</div>
                  <div className="font-semibold">{program.maxParticipants}명</div>
                </div>
                <div className="text-center">
                  <Target className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">수준</div>
                  <div className="font-semibold">{program.level}</div>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">수료증</div>
                  <div className="font-semibold">발급</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">개요</TabsTrigger>
                    <TabsTrigger value="curriculum">커리큘럼</TabsTrigger>
                    <TabsTrigger value="instructor">강사진</TabsTrigger>
                    <TabsTrigger value="materials">교재/혜택</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>

                  {/* 개요 탭 */}
                  <TabsContent value="overview" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="w-5 h-5 mr-2 text-blue-600" />
                          교육 목표
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {program.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="w-5 h-5 mr-2 text-blue-600" />
                          교육 대상
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{program.target}</p>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="w-5 h-5 mr-2 text-blue-600" />
                          수료증 정보
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">수료증명</span>
                            <span className="font-semibold">{program.certification.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">발급기관</span>
                            <span className="font-semibold">{program.certification.issuer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">발급조건</span>
                            <span className="font-semibold">{program.certification.requirement}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">유효기간</span>
                            <span className="font-semibold">{program.certification.validity}</span>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-sm text-blue-600">{program.certification.recognition}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* 커리큘럼 탭 */}
                  <TabsContent value="curriculum" className="mt-6">
                    <div className="space-y-6">
                      {program.curriculum.map((day, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                {index + 1}
                              </div>
                              {day.day}: {day.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {day.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-start">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* 강사진 탭 */}
                  <TabsContent value="instructor" className="mt-6">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <User className="w-5 h-5 mr-2 text-blue-600" />
                            주강사진 소개
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-8">
                            {program.instructors.map((instructor, index) => (
                              <div key={index} className="flex items-start gap-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <User className="w-12 h-12 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {instructor.name}
                                  </h3>
                                  <p className="text-blue-600 font-semibold mb-2">
                                    {instructor.title}
                                  </p>
                                  <p className="text-gray-600 mb-4">
                                    경력 {instructor.experience}
                                  </p>
                                  <p className="text-gray-700 mb-4">
                                    {instructor.description}
                                  </p>
                                  <div>
                                    <h4 className="font-semibold mb-2">주요 자격</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {instructor.certifications.map((cert, certIndex) => (
                                        <Badge key={certIndex} variant="outline" className="text-xs">
                                          {cert}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* 교재/혜택 탭 */}
                  <TabsContent value="materials" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                            제공 교재
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {program.materials.map((material, index) => (
                              <li key={index} className="flex items-start">
                                <FileText className="w-4 h-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{material}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Star className="w-5 h-5 mr-2 text-blue-600" />
                            교육 혜택
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {program.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                          요금 체계
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">개인 신청</span>
                              <span className="font-semibold">{program.priceDetail.individual}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">단체 신청 (3명 이상)</span>
                              <span className="font-semibold text-green-600">{program.priceDetail.group}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">조기 신청 (2주 전)</span>
                              <span className="font-semibold text-blue-600">{program.priceDetail.early}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">협회 회원</span>
                              <span className="font-semibold text-purple-600">{program.priceDetail.member}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <AlertCircle className="w-4 h-4 inline mr-1" />
                            모든 요금은 VAT 별도이며, 할인 혜택은 중복 적용되지 않습니다.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* FAQ 탭 */}
                  <TabsContent value="faq" className="mt-6">
                    <div className="space-y-4">
                      {program.faq.map((item, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg text-gray-900">
                              Q. {item.question}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700">A. {item.answer}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  {/* 교육 일정 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                        교육 일정
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {program.schedule.map((schedule, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Badge 
                                variant={schedule.status === 'open' ? 'default' : 'secondary'}
                                className={schedule.status === 'open' ? 'bg-green-600' : ''}
                              >
                                {schedule.status === 'open' ? '모집중' : '예정'}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                잔여 {schedule.remaining}석
                              </span>
                            </div>
                            <div className="text-sm space-y-1">
                              <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                                <span>{schedule.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                <span>{schedule.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                <span>{schedule.location}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 신청 버튼 */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <Link href="/education/apply">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            <GraduationCap className="w-5 h-5 mr-2" />
                            교육 신청하기
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full">
                          <Download className="w-5 h-5 mr-2" />
                          교육 자료 다운로드
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 문의 정보 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-blue-600" />
                        교육 문의
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">{CONTACT_INFO.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">{CONTACT_INFO.email}</span>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                          <span className="text-sm">{COMPANY_INFO.address}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 