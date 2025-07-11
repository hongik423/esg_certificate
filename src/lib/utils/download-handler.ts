// ESG 인증 관련 문서 다운로드 유틸리티

export interface DownloadDocument {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'md' | 'html';
  size: string;
  category: 'application' | 'cost' | 'compliance' | 'iso-9001' | 'iso-14001' | 'iso-45001' | 'esg';
  icon: string;
  color: string;
}

// 인증 관련 문서 데이터
export const certificationDocuments: DownloadDocument[] = [
  // 신청서 관련
  {
    id: 'application-form-pdf',
    title: '인증 신청서 양식 (PDF)',
    description: '인증 신청을 위한 공식 양식 (PDF)',
    fileName: '2인증서비스_심사비용및신청_인증신청서_양식.pdf',
    fileType: 'pdf',
    size: '240KB',
    category: 'application',
    icon: 'FileText',
    color: 'blue'
  },
  {
    id: 'application-form-docx',
    title: '인증 신청서 양식 (Word)',
    description: '편집 가능한 인증 신청서 양식 (Word)',
    fileName: '2인증서비스_심사비용및신청_인증신청서_양식.docx',
    fileType: 'docx',
    size: '36KB',
    category: 'application',
    icon: 'FileText',
    color: 'purple'
  },
  
  // 심사비용 관련
  {
    id: 'cost-criteria',
    title: '인증심사 일수 산정기준',
    description: '인증심사에 필요한 기간 및 비용 산정 기준',
    fileName: '2-2인증서비스_심사비용및신청_인증신청서_인증심사일수_산정기준.pdf',
    fileType: 'pdf',
    size: '135KB',
    category: 'cost',
    icon: 'Calculator',
    color: 'green'
  },
  
  // 기업준수사항 관련
  {
    id: 'customer-promise',
    title: '고객과의 약속 첨부양식',
    description: '기업 준수사항 관련 약속 양식',
    fileName: '2인증서비스_기업준수사항_고객과의약속_첨부양식.pdf',
    fileType: 'pdf',
    size: '209KB',
    category: 'compliance',
    icon: 'Shield',
    color: 'orange'
  },
  {
    id: 'certification-mark-guide',
    title: '인증 마크 & 인증서 사용 및 홍보방법',
    description: '인증 마크와 인증서 활용 가이드',
    fileName: '2인증서비스_기업준수사항_인증_마크_&__인증서_사용_및_홍보방법.pdf',
    fileType: 'pdf',
    size: '165KB',
    category: 'compliance',
    icon: 'Award',
    color: 'indigo'
  },
  
  // ISO 9001 관련
  {
    id: 'iso-9001-overview',
    title: 'ISO 9001 표준개요',
    description: '품질경영시스템 개요 및 요구사항 가이드 (HTML)',
    fileName: 'ISO_9001_표준개요.html',
    fileType: 'html',
    size: '276KB',
    category: 'iso-9001',
    icon: 'BookOpen',
    color: 'blue'
  },
  {
    id: 'iso-9001-guide',
    title: 'ISO 9001 구축가이드북',
    description: '시스템 구축 단계별 상세 가이드 (HTML)',
    fileName: 'ISO_9001_구축가이드북.html',
    fileType: 'html',
    size: '549KB',
    category: 'iso-9001',
    icon: 'BookOpen',
    color: 'teal'
  },
  
  // ISO 14001 관련
  {
    id: 'iso-14001-overview',
    title: 'ISO 14001 표준개요',
    description: '환경경영시스템 개요 및 요구사항 가이드 (HTML)',
    fileName: 'ISO_14001_표준개요.html',
    fileType: 'html',
    size: '481KB',
    category: 'iso-14001',
    icon: 'Leaf',
    color: 'green'
  },
  {
    id: 'iso-14001-env-guide',
    title: 'ISO 14001 환경법규가이드',
    description: '환경법규 준수 실무 가이드 (HTML)',
    fileName: 'ISO_14001_환경법규가이드.html',
    fileType: 'html',
    size: '620KB',
    category: 'iso-14001',
    icon: 'Scale',
    color: 'emerald'
  },
  
  // ISO 45001 관련
  {
    id: 'iso-45001-overview',
    title: 'ISO 45001 표준개요',
    description: '안전보건경영시스템 개요 및 요구사항 가이드 (HTML)',
    fileName: 'ISO_45001_표준개요.html',
    fileType: 'html',
    size: '580KB',
    category: 'iso-45001',
    icon: 'Shield',
    color: 'orange'
  },
  {
    id: 'iso-45001-risk-guide',
    title: 'ISO 45001 위험성평가가이드',
    description: '위험성평가 실무 가이드 (HTML)',
    fileName: 'ISO_45001_위험성평가가이드.html',
    fileType: 'html',
    size: '750KB',
    category: 'iso-45001',
    icon: 'AlertTriangle',
    color: 'red'
  },
  
  // ESG 관련
  {
    id: 'esg-accreditation',
    title: 'ESG 경영시스템 인정서',
    description: 'ESG 경영시스템 인정 공식 문서',
    fileName: '4고객서비스_공지사항_esg경영시스템인정서_붙임._인정서_-_ESGR.pdf',
    fileType: 'pdf',
    size: '140KB',
    category: 'esg',
    icon: 'Award',
    color: 'purple'
  },
  {
    id: 'esg-pilot-certification',
    title: 'ESG 경영시스템 시범 인증기관 스킴확대 인정',
    description: 'ESG 경영시스템 시범 인증기관 관련 공지',
    fileName: '4고객서비스_공지사항_ESG경영시스템_시범_인증기관_스킴확대_인정-ESGR.pdf',
    fileType: 'pdf',
    size: '70KB',
    category: 'esg',
    icon: 'Globe',
    color: 'indigo'
  },
  {
    id: 'safety-accreditation',
    title: '안전보건경영시스템 인정서',
    description: 'ISO 45001 안전보건경영시스템 인정 문서',
    fileName: '4고객서비스_공지사항_안전보건경영체제인증기관인정서_안전보건경영시스템_인정서.pdf',
    fileType: 'pdf',
    size: '5.3MB',
    category: 'iso-45001',
    icon: 'Shield',
    color: 'orange'
  }
];

// 카테고리별 문서 필터링
export const getDocumentsByCategory = (category: string): DownloadDocument[] => {
  return certificationDocuments.filter(doc => doc.category === category);
};

// 공통 다운로드 핸들러
export const handleDownload = (fileName: string, title: string) => {
  try {
    const link = document.createElement('a');
    link.href = `/documents/${fileName}`;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 다운로드 추적 (선택사항)
    console.log(`다운로드 완료: ${title} (${fileName})`);
  } catch (error) {
    console.error('다운로드 중 오류 발생:', error);
    alert('다운로드 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

// 파일 크기 포맷팅
export const formatFileSize = (size: string): string => {
  return size;
};

// 파일 타입별 아이콘 매핑
export const getFileTypeIcon = (fileType: string): string => {
  switch (fileType) {
    case 'pdf':
      return 'FileText';
    case 'doc':
    case 'docx':
      return 'FileText';
    case 'md':
      return 'BookOpen';
    case 'html':
      return 'Globe';
    default:
      return 'FileText';
  }
};

// 파일 타입별 색상 매핑
export const getFileTypeColor = (fileType: string): string => {
  switch (fileType) {
    case 'pdf':
      return 'red';
    case 'doc':
    case 'docx':
      return 'blue';
    case 'md':
      return 'green';
    case 'html':
      return 'indigo';
    default:
      return 'gray';
  }
}; 