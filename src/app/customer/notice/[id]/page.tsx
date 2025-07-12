'use client';

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Eye, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { handleDownload } from '@/lib/utils/download-handler';

// Notice type (same as list page)
interface Notice {
  id: string;
  category: '공지' | '소식' | '행사' | '채용';
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  isNew: boolean;
  isImportant: boolean;
  attachments?: string[];
}

// Mock data (should be refactored to a shared source in real app)
const notices: Notice[] = [
  {
    id: '1',
    category: '공지',
    title: '[기본] 안전보건경영체제 인증기관 인정서',
    content:
      '한국인정지원센터로부터 2024년 12월 11일 안전보건경영체제 인증기관 인정서를 받았습니다.',
    author: '이에스지인증원',
    createdAt: '2024-12-20',
    views: 42,
    isNew: true,
    isImportant: false,
    attachments: ['4고객서비스_공지사항_안전보건경영체제인증기관인정서_안전보건경영시스템_인정서.pdf'],
  },
  {
    id: '2',
    category: '공지',
    title: '[기본] 이에스지인증원 심사원 활동 등록신청서',
    content: `KAB으로부터 ISO 인정을 받은 이에스지인증원의 인정 범위 심사원을 위한 모집합니다.

<심사원 모집>
1. 모집분야: ISO 인증 활동 심사원 (수시모집)
2. 모집분야: ISO9001/14001

3. 근무조건: 비상근 심사원
4. 자격요건: 심사원 등록 자격을 다음 요건을 충족 시에 등록 가능
   - 근무처명: 이에스지인증원 010-2650-9117 또는 010-7614-0875 로 연락바랍니다.

<심사원 등록 과정>
1. 심사원 신청서 접수
2. 심사원 자격: 심사기법 및 심사보고서 작성법 등
3. 이에스지인증원 소속 심사원으로 등록 심사 1회
4. 단독 심사 활동

제출서류
1. 심사원 등록 신청서
2. 이력서
3. 학력증명서
4. 경력증명서 또는 경력증명서
5. 심사자격 관련 교육 수료 증명서 사본
6. 심사원 자격인정서 및 심사원 기타 사본
7. 자격증 사본 (기타 자격증 소지자 제출)`,
    author: '이에스지인증원',
    createdAt: '2022-04-20',
    views: 133,
    isNew: false,
    isImportant: false,
    attachments: [],
  },
  {
    id: '3',
    category: '공지',
    title:
      '[기본] ESG 경영시스템 시범 인증기관 스킴 확대 인정 ((주)ESG인증원)',
    content:
      'ESG 경영시스템 확대되어 시범 인증기관 인정범위가 확대되어 심사원의 심사활동 확대에 활용해 주시기 바랍니다.',
    author: '이에스지인증원',
    createdAt: '2024-06-20',
    views: 93,
    isNew: false,
    isImportant: false,
    attachments: [
      '4고객서비스_공지사항_ESG경영시스템_시범_인증기관_스킴확대_인정-ESGR.pdf',
    ],
  },
  {
    id: '4',
    category: '공지',
    title: '[기본] ESG 경영시스템 인정서 2024.6.19',
    content: 'ESG 경영시스템 시범 인증기관 인정서',
    author: '이에스지인증원',
    createdAt: '2024-06-20',
    views: 128,
    isNew: false,
    isImportant: false,
    attachments: ['4고객서비스_공지사항_esg경영시스템인정서_붙임._인정서_-_ESGR.pdf'],
  },
  {
    id: '5',
    category: '공지',
    title: '[기본] ESG 보고서 검증',
    content: `당 청은 Accountability 청취 등 여러 문헌에서 검증실시(practitioner)의 역할/직업에 대한 검증하게 교정한 과정, 중복된 과정을 중복하는 가지에서 지속가능보고서 검증하는 가지 중복된 과정을 중복한다.

당 청(ESG Register)은 ESG 연계 지속가능보고서 검증(Assurance)에 가장 많이 쓰이는 국제적 검증기준(Assurance Standard)인 영국 Accountability의 "AA1000AS v3"에 관련하여 검증합니다.

2021년 개정 검증기준 "AA1000AS v3"에 따라 검증심사자를 활용하는 가정(provider)은 반드시 포트폴리오(portfolio) 하나로 누가 검증하는지, 어느 기업에서 했는지, 어떤 결과를 거쳤는지 밝혀야 하며 라이선스(e-license)가 도입되어 해당 기관이 과거에 어떤 기업의 지속가능보고서 사후검증을 했는지에 관한 포트폴리오(profile)은 검 수 있게 하고 있습니다. 특, 검증 책임자가 도입되는 것이어서 검증 업무에 있어 책무가 매우 강조된 것이며, 그렇다 이어서는 검증 3대 원칙에 대하여 2021년부터는 "임팩트(Impact)"이 추가되어 4대 원칙으로 바뀌었다는 점을 말씀하고 싶 수 있습니다.

검증 3대 원칙은 "포용성(Inclusivity), 중대성(Materiality), 대응성(Responsiveness)"인데 포용성은 영향을 미치는 이해관계자들을 포함하는지, 중대성은 해당 기업의 중요 이슈를 포함하는지, 대응성은 이해관계자의 요구와 관심에 적절하게 대응하는지 총 3원칙다. 여기에 v3에 추가된 "임팩트(Impact)"는 기업의 활동으로 인한 영향을 모니터링하고 측정할 수 있어야 한다는 원칙을 말합니다.

당 청은 Accountability 청취 등 여러 문헌에서 검증실시(practitioner)의 역할/직업에 대하여 검증하게 교정한 과정, 중복된 과정을 중복하는 가지에서 지속가능보고서 검증 포트폴리오 중복 가능으로 우수한 전문성과 신뢰성을 바탕으로 최고의 서비스를 제공해 드리고 있습니다. 최고의 검증서비스를 제공해 드리기 위해 계속 매진하겠습니다.

이번한 문의를 언제든 당 청으로 연락 주시기 바랍니다.`,
    author: '이에스지인증원',
    createdAt: '2022-04-13',
    views: 136,
    isNew: false,
    isImportant: false,
    attachments: [],
  },
];

export default function NoticeDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const notice = notices.find((n) => n.id === params.id);

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  // Find previous and next notices by date order
  const sorted = [...notices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const currentIndex = sorted.findIndex((n) => n.id === notice.id);
  const prev = sorted[currentIndex - 1];
  const next = sorted[currentIndex + 1];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header banner */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> 목록
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{notice.title}</h1>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span>{notice.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {notice.createdAt}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" /> {notice.views}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge>{notice.category}</Badge>
              {notice.isImportant && <Badge variant="destructive">중요</Badge>}
            </div>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="whitespace-pre-line">{notice.content}</p>

            {/* Attachments */}
            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> 첨부파일
                </h4>
                <ul className="space-y-2">
                  {notice.attachments.map((file) => (
                    <li key={file} className="flex items-center gap-3 text-sm">
                      <Button
                        variant="link"
                        className="p-0 text-green-700 hover:text-green-900"
                        onClick={() => handleDownload(file, file)}
                      >
                        {file}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prev / Next navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev && (
            <Link href={`/customer/notice/${prev.id}`} className="block">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate">이전글: {prev.title}</span>
                </CardContent>
              </Card>
            </Link>
          )}
          {next && (
            <Link href={`/customer/notice/${next.id}`} className="block">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-2 justify-end">
                  <span className="truncate">다음글: {next.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 