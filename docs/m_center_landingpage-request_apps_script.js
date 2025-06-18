/**
 * ================================================================================
 * 기업의별 경영지도센터 랜딩페이지 AI 진단 신청 구글시트 연동 Apps Script 완성본
 * ================================================================================
 * 
 * 📋 주요 기능:
 * 1. AI 진단 신청 데이터 자동 저장
 * 2. AI 진단 결과 업데이트
 * 3. 데이터 조회 및 관리
 * 4. 실시간 모니터링 및 알림
 * 
 * 📊 시트 구조 (18개 컬럼):
 * A: 제출일시     B: 회사명       C: 업종         D: 사업담당자   E: 직원수
 * F: 사업성장단계 G: 주요고민사항 H: 예상혜택     I: 진행사업장   J: 담당자명
 * K: 연락처       L: 이메일       M: 개인정보동의 N: 폼타입       O: 진단상태
 * P: AI분석결과   Q: 결과URL      R: 분석완료일시
 * 
 * 🚀 설치 방법:
 * 1. 구글시트 열기 → 확장 → Apps Script
 * 2. 이 코드 전체 복사하여 붙여넣기
 * 3. SPREADSHEET_ID를 현재 시트 ID로 변경
 * 4. 저장 → 배포 → 새 배포 → 웹 앱으로 배포
 * 5. 실행 권한: 나, 액세스 권한: 모든 사용자
 * 
 * ⚙️ 환경변수 설정 (필수):
 * - SPREADSHEET_ID: 현재 구글시트의 ID
 * - SHEET_NAME: 데이터가 저장될 시트명
 * - NOTIFICATION_EMAIL: 알림 받을 이메일 (선택)
 */

// ================================================================================
// 🔧 환경설정 (반드시 수정하세요!)
// ================================================================================

/**
 * ✅ M-CENTER 랜딩페이지 AI 진단 데이터 구글시트 ID
 * 현재 운영 중인 실제 구글시트 연결됨
 */
const SPREADSHEET_ID = '1LQNeT0abhMHXktrNjRbxl2XEFWVCwcYr5kVTAcRvpfM';

/**
 * ✅ 데이터 저장 시트명
 * AI 진단 신청 데이터 전용 시트
 */
const SHEET_NAME = 'm_center_landingpage-request';

/**
 * ✅ 관리자 알림 이메일
 * 신규 진단 신청 시 즉시 알림 발송 (이후경 책임컨설턴트)
 */
const NOTIFICATION_EMAIL = 'hongik423@gmail.com';

/**
 * ✅ 신청자 자동 응답 이메일 활성화
 * 진단 신청 접수 확인 이메일 자동 발송 기능 ON
 */
const AUTO_REPLY_ENABLED = true;

// ================================================================================
// 📡 HTTP 요청 처리 메인 함수
// ================================================================================

/**
 * HTTP POST 요청 처리 메인 함수
 */
function doPost(e) {
  try {
    // POST 데이터 파싱
    let requestData;
    try {
      const postData = e.postData ? e.postData.contents : '{}';
      requestData = JSON.parse(postData);
      logMessage('INFO', '새로운 요청 수신', requestData);
    } catch (parseError) {
      logMessage('ERROR', 'JSON 파싱 오류', parseError);
      return createErrorResponse('잘못된 JSON 형식입니다.');
    }

    // 요청 유형에 따른 처리
    if (requestData.action === 'update') {
      return updateDiagnosisResults(requestData);
    } else if (requestData.action === 'get') {
      return getDiagnosisData(requestData);
    } else {
      return saveDiagnosisData(requestData);
    }

  } catch (error) {
    logMessage('ERROR', 'doPost 전역 오류', error);
    return createErrorResponse('서버 처리 중 오류가 발생했습니다: ' + error.toString());
  }
}

/**
 * HTTP GET 요청 처리 (상태 확인용)
 */
function doGet(e) {
  try {
    const status = {
      status: 'M-CENTER AI 진단 웹앱이 정상 작동 중입니다.',
      timestamp: getKoreanTime(),
      sheetName: SHEET_NAME,
      version: '3.0',
      features: [
        '신규 진단 신청 저장',
        'AI 진단 결과 업데이트',
        '데이터 조회 및 검색',
        '실시간 모니터링',
        '자동 알림 시스템'
      ]
    };

    return createResponse(JSON.stringify(status));
  } catch (error) {
    return createErrorResponse('상태 확인 중 오류가 발생했습니다.');
  }
}

// ================================================================================
// 💾 데이터 저장 및 업데이트 함수
// ================================================================================

/**
 * AI 진단 신청 데이터 저장
 */
function saveDiagnosisData(data) {
  try {
    const sheet = getOrCreateSheet();
    
    // 데이터 검증
    const validation = validateRequestData(data);
    if (!validation.isValid) {
      return createErrorResponse(validation.message);
    }

    // 중복 신청 확인
    if (isDuplicateRequest(sheet, data.contactEmail || data.이메일)) {
      logMessage('WARNING', '중복 신청 감지', { email: data.contactEmail || data.이메일 });
      // 중복이어도 저장은 하되 상태를 표시
    }

    // 현재 시간 생성
    const now = getKoreanTime();
    const uniqueId = generateUniqueId();

    // 새 행 데이터 구성
    const rowData = [
      data.제출일시 || now,                                    // A: 제출일시
      data.회사명 || data.companyName || '',                    // B: 회사명
      data.업종 || data.industry || '',                        // C: 업종
      data.사업담당자 || data.businessManager || '',            // D: 사업담당자
      data.직원수 || data.employeeCount || '',                 // E: 직원수
      data.사업성장단계 || data.establishmentDifficulty || '', // F: 사업성장단계
      data.주요고민사항 || data.mainConcerns || '',             // G: 주요고민사항
      data.예상혜택 || data.expectedBenefits || '',            // H: 예상혜택
      data.진행사업장 || data.businessLocation || '',          // I: 진행사업장
      data.담당자명 || data.contactName || '',                 // J: 담당자명
      data.연락처 || data.contactPhone || '',                  // K: 연락처
      data.이메일 || data.contactEmail || '',                  // L: 이메일
      data.개인정보동의 || (data.privacyConsent ? '동의' : '미동의'), // M: 개인정보동의
      data.폼타입 || 'AI_무료진단',                            // N: 폼타입
      '접수완료',                                              // O: 진단상태
      '',                                                     // P: AI분석결과
      '',                                                     // Q: 결과URL
      ''                                                      // R: 분석완료일시
    ];

    // 데이터 저장
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;
    
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    // 새 행 스타일링
    formatNewRow(sheet, newRow);

    logMessage('SUCCESS', '새 데이터 저장 완료', {
      row: newRow,
      company: data.companyName || data.회사명,
      email: data.contactEmail || data.이메일
    });

    // 알림 발송
    if (NOTIFICATION_EMAIL) {
      sendNotificationEmail(data, newRow);
    }

    // 자동 응답 이메일
    if (AUTO_REPLY_ENABLED && (data.contactEmail || data.이메일)) {
      sendAutoReplyEmail(data.contactEmail || data.이메일, data.contactName || data.담당자명);
    }

    return createResponse(JSON.stringify({
      success: true,
      message: '데이터가 성공적으로 저장되었습니다.',
      row: newRow,
      uniqueId: uniqueId,
      timestamp: now
    }));

  } catch (error) {
    logMessage('ERROR', '데이터 저장 오류', error);
    return createErrorResponse('데이터 저장 중 오류가 발생했습니다: ' + error.toString());
  }
}

/**
 * AI 진단 결과 업데이트
 */
function updateDiagnosisResults(data) {
  try {
    const sheet = getOrCreateSheet();
    
    // 이메일로 해당 행 찾기
    const targetRow = findRowByEmail(sheet, data.searchEmail);
    
    if (targetRow === -1) {
      return createErrorResponse('해당 이메일의 진단 신청을 찾을 수 없습니다.');
    }

    // 업데이트할 데이터 구성
    const updates = [];
    
    if (data.진단상태) {
      sheet.getRange(targetRow, 15).setValue(data.진단상태); // O열
      updates.push('진단상태');
    }
    
    if (data.AI분석결과) {
      // JSON 객체인 경우 문자열로 변환
      const resultData = typeof data.AI분석결과 === 'object' 
        ? JSON.stringify(data.AI분석결과, null, 2) 
        : data.AI분석결과;
      sheet.getRange(targetRow, 16).setValue(resultData); // P열
      updates.push('AI분석결과');
    }
    
    if (data.결과URL) {
      sheet.getRange(targetRow, 17).setValue(data.결과URL); // Q열
      updates.push('결과URL');
    }
    
    if (data.분석완료일시) {
      sheet.getRange(targetRow, 18).setValue(data.분석완료일시); // R열
      updates.push('분석완료일시');
    } else if (updates.length > 0) {
      // 업데이트가 있으면 현재 시간을 분석완료일시로 설정
      sheet.getRange(targetRow, 18).setValue(getKoreanTime());
      updates.push('분석완료일시');
    }

    // 상태에 따른 행 색상 변경
    updateRowColor(sheet, targetRow, data.진단상태);

    logMessage('SUCCESS', '진단 결과 업데이트 완료', {
      row: targetRow,
      email: data.searchEmail,
      updates: updates
    });

    return createResponse(JSON.stringify({
      success: true,
      message: '진단 결과가 성공적으로 업데이트되었습니다.',
      row: targetRow,
      updatedFields: updates,
      timestamp: getKoreanTime()
    }));

  } catch (error) {
    logMessage('ERROR', '결과 업데이트 오류', error);
    return createErrorResponse('결과 업데이트 중 오류가 발생했습니다: ' + error.toString());
  }
}

// ================================================================================
// 🔍 데이터 조회 함수
// ================================================================================

/**
 * 진단 데이터 조회
 */
function getDiagnosisData(data) {
  try {
    const sheet = getOrCreateSheet();
    
    if (data.email) {
      // 특정 이메일의 데이터 조회
      return getSingleDiagnosisData(sheet, data.email);
    } else {
      // 전체 데이터 조회
      return getAllDiagnosisData(sheet);
    }
  } catch (error) {
    logMessage('ERROR', '데이터 조회 오류', error);
    return createErrorResponse('데이터 조회 중 오류가 발생했습니다: ' + error.toString());
  }
}

/**
 * 특정 이메일의 진단 데이터 조회
 */
function getSingleDiagnosisData(sheet, email) {
  const targetRow = findRowByEmail(sheet, email);
  
  if (targetRow === -1) {
    return createErrorResponse('해당 이메일의 진단 신청을 찾을 수 없습니다.');
  }

  const rowData = sheet.getRange(targetRow, 1, 1, 18).getValues()[0];
  const headerRow = sheet.getRange(1, 1, 1, 18).getValues()[0];
  
  const result = {};
  headerRow.forEach((header, index) => {
    result[header] = rowData[index];
  });

  return createResponse(JSON.stringify({
    success: true,
    data: result,
    row: targetRow,
    timestamp: getKoreanTime()
  }));
}

/**
 * 모든 진단 데이터 조회 (관리용)
 */
function getAllDiagnosisData(sheet) {
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  if (values.length < 2) {
    return createResponse(JSON.stringify({
      success: true,
      data: [],
      count: 0,
      message: '저장된 데이터가 없습니다.',
      timestamp: getKoreanTime()
    }));
  }

  // 헤더와 데이터 분리
  const headerRow = values[0];
  const dataRows = values.slice(1);
  
  const results = dataRows.map((row, index) => {
    const rowData = { _row: index + 2 }; // 시트의 실제 행 번호
    headerRow.forEach((header, colIndex) => {
      rowData[header] = row[colIndex];
    });
    return rowData;
  });

  return createResponse(JSON.stringify({
    success: true,
    data: results,
    count: results.length,
    timestamp: getKoreanTime()
  }));
}

// ================================================================================
// 🛠️ 유틸리티 함수
// ================================================================================

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    setupSheetHeaders(sheet);
    logMessage('INFO', '새 시트 생성 완료', { sheetName: SHEET_NAME });
  }
  
  return sheet;
}

/**
 * 시트 헤더 설정
 */
function setupSheetHeaders(sheet) {
  const headerRow = [
    '제출일시', '회사명', '업종', '사업담당자', '직원수', '사업성장단계',
    '주요고민사항', '예상혜택', '진행사업장', '담당자명', '연락처', '이메일',
    '개인정보동의', '폼타입', '진단상태', 'AI분석결과', '결과URL', '분석완료일시'
  ];
  
  sheet.getRange(1, 1, 1, headerRow.length).setValues([headerRow]);
  
  // 헤더 스타일링
  const headerRange = sheet.getRange(1, 1, 1, headerRow.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  
  // 열 너비 자동 조정
  sheet.autoResizeColumns(1, headerRow.length);
  
  // 고정 행 설정
  sheet.setFrozenRows(1);
  
  logMessage('INFO', '시트 헤더 설정 완료', { headers: headerRow.length });
}

/**
 * 새 행 스타일링
 */
function formatNewRow(sheet, rowNumber) {
  const range = sheet.getRange(rowNumber, 1, 1, 18);
  
  // 교대로 배경색 설정
  if (rowNumber % 2 === 0) {
    range.setBackground('#f8f9fa');
  }
  
  // 테두리 설정
  range.setBorder(true, true, true, true, false, false);
  
  // 진단상태 열 색상 설정
  const statusCell = sheet.getRange(rowNumber, 15);
  statusCell.setBackground('#e8f5e8');
  statusCell.setFontWeight('bold');
}

/**
 * 상태에 따른 행 색상 업데이트
 */
function updateRowColor(sheet, rowNumber, status) {
  const statusCell = sheet.getRange(rowNumber, 15);
  
  switch (status) {
    case '완료':
      statusCell.setBackground('#d4edda');
      statusCell.setFontColor('#155724');
      break;
    case '처리중':
      statusCell.setBackground('#fff3cd');
      statusCell.setFontColor('#856404');
      break;
    case '오류':
      statusCell.setBackground('#f8d7da');
      statusCell.setFontColor('#721c24');
      break;
    default:
      statusCell.setBackground('#e8f5e8');
      statusCell.setFontColor('#333333');
  }
}

/**
 * 이메일로 행 찾기
 */
function findRowByEmail(sheet, email) {
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  const emailColumn = 12; // L열 (이메일)
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][emailColumn - 1] === email) {
      return i + 1; // 1-based index
    }
  }
  
  return -1;
}

/**
 * 중복 신청 확인
 */
function isDuplicateRequest(sheet, email) {
  if (!email) return false;
  
  const today = new Date();
  const todayStr = Utilities.formatDate(today, 'Asia/Seoul', 'yyyy-MM-dd');
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 1; i < values.length; i++) {
    const rowEmail = values[i][11]; // L열 (이메일)
    const rowDate = values[i][0]; // A열 (제출일시)
    
    if (rowEmail === email && rowDate && rowDate.toString().includes(todayStr)) {
      return true;
    }
  }
  
  return false;
}

/**
 * 요청 데이터 검증
 */
function validateRequestData(data) {
  const requiredFields = [
    { key: 'companyName', altKey: '회사명', name: '회사명' },
    { key: 'contactName', altKey: '담당자명', name: '담당자명' },
    { key: 'contactEmail', altKey: '이메일', name: '이메일' }
  ];

  for (let field of requiredFields) {
    const value = data[field.key] || data[field.altKey];
    if (!value || value.toString().trim() === '') {
      return {
        isValid: false,
        message: `필수 필드가 누락되었습니다: ${field.name}`
      };
    }
  }

  // 이메일 형식 검증
  const email = data.contactEmail || data.이메일;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: '올바른 이메일 형식이 아닙니다.'
    };
  }

  return { isValid: true };
}

/**
 * 한국 시간 반환
 */
function getKoreanTime() {
  return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy. M. d. a h:mm:ss');
}

/**
 * 고유 ID 생성
 */
function generateUniqueId() {
  return Utilities.getUuid().slice(0, 8);
}

/**
 * 응답 생성
 */
function createResponse(content) {
  return ContentService
    .createTextOutput(content)
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 오류 응답 생성
 */
function createErrorResponse(message) {
  return createResponse(JSON.stringify({
    success: false,
    error: message,
    timestamp: getKoreanTime()
  }));
}

/**
 * 로그 메시지 기록
 */
function logMessage(level, message, data = null) {
  const timestamp = getKoreanTime();
  const logData = data ? JSON.stringify(data, null, 2) : '';
  console.log(`[${timestamp}] [${level}] ${message} ${logData}`);
}

// ================================================================================
// 📧 이메일 알림 함수
// ================================================================================

/**
 * 신규 신청 알림 이메일 발송
 */
function sendNotificationEmail(data, rowNumber) {
  try {
    const subject = `[M-CENTER] 새로운 AI 진단 신청 - ${data.companyName || data.회사명}`;
    const body = `
안녕하세요,

새로운 AI 진단 신청이 접수되었습니다.

📋 신청 정보:
- 회사명: ${data.companyName || data.회사명}
- 담당자: ${data.contactName || data.담당자명}
- 이메일: ${data.contactEmail || data.이메일}
- 연락처: ${data.contactPhone || data.연락처}
- 업종: ${data.industry || data.업종}
- 직원수: ${data.employeeCount || data.직원수}
- 시트 행번호: ${rowNumber}

🔗 구글시트 바로가기:
https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}

감사합니다.
M-CENTER AI 진단 시스템
    `;

    MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    logMessage('INFO', '알림 이메일 발송 완료', { to: NOTIFICATION_EMAIL, row: rowNumber });
  } catch (error) {
    logMessage('ERROR', '알림 이메일 발송 실패', error);
  }
}

/**
 * 자동 응답 이메일 발송
 */
function sendAutoReplyEmail(email, name) {
  try {
    const subject = '[M-CENTER] AI 진단 신청이 접수되었습니다';
    const body = `
${name}님, 안녕하세요!

M-CENTER AI 진단 신청이 성공적으로 접수되었습니다.

📋 처리 절차:
1. ✅ 신청 접수 완료 (현재 단계)
2. 🔄 AI 분석 진행 (약 5-10분 소요)
3. 📊 결과 생성 및 이메일 발송
4. 💬 전문가 상담 연결

📞 문의사항이 있으시면 언제든 연락주세요:
- 이메일: hongik423@gmail.com
- 전화: 010-9251-9743

감사합니다.

기업의별 경영지도센터
 이후경 경영지도센터장
    `;

    MailApp.sendEmail(email, subject, body);
    logMessage('INFO', '자동 응답 이메일 발송 완료', { to: email });
  } catch (error) {
    logMessage('ERROR', '자동 응답 이메일 발송 실패', error);
  }
}

// ================================================================================
// 🧪 테스트 및 관리 함수
// ================================================================================

/**
 * 테스트 데이터 생성 (개발용)
 */
function createTestData() {
  const testData = {
    companyName: '테스트기업(주)',
    industry: 'IT/소프트웨어',
    businessManager: '김테스트',
    employeeCount: '6-10명',
    establishmentDifficulty: '2단계 프로토타입단계 (Seed단계)',
    mainConcerns: '매출 성장이 정체되어 있고, 신규 고객 확보가 어렵습니다. AI 기술을 활용한 업무 효율성 개선이 필요합니다.',
    expectedBenefits: '월 매출 30% 증가, 고객 만족도 향상, 업무 효율성 40% 개선',
    businessLocation: '서울시 강남구',
    contactName: '홍길동',
    contactPhone: '010-1234-5678',
    contactEmail: 'test@company.com',
    privacyConsent: true
  };

  console.log('테스트 데이터 생성 시작...');
  
  const result = saveDiagnosisData(testData);
  console.log('테스트 결과:', result.getContent());
  
  return '테스트 데이터 생성 완료';
}

/**
 * 테스트 결과 업데이트 (개발용)
 */
function createTestResultUpdate() {
  const updateData = {
    action: 'update',
    searchEmail: 'test@company.com',
    진단상태: '완료',
    AI분석결과: JSON.stringify({
      우선추천서비스: 'BM ZEN 사업분석',
      추가추천서비스: ['AI 활용 생산성향상', '웹사이트 구축'],
      예상성과: {
        매출증가: '30%',
        효율성개선: '40%',
        완료예상시간: '6개월'
      },
      우선순위: 1,
      분석점수: 85,
      세부추천사항: [
        '비즈니스 모델 재설계를 통한 수익 구조 최적화',
        'AI 도구 도입으로 반복 업무 자동화',
        '온라인 마케팅 채널 다변화'
      ]
    }),
    결과URL: `https://m-center-diagnosis.com/results/${generateUniqueId()}`,
    분석완료일시: getKoreanTime()
  };

  console.log('테스트 업데이트 시작...');
  
  const result = updateDiagnosisResults(updateData);
  console.log('업데이트 결과:', result.getContent());
  
  return '테스트 업데이트 완료';
}

/**
 * 시트 초기화 (관리용)
 */
function resetSheet() {
  const sheet = getOrCreateSheet();
  
  // 데이터 행만 삭제 (헤더 유지)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  
  logMessage('INFO', '시트 초기화 완료', { deletedRows: lastRow - 1 });
  return '시트 초기화 완료';
}

/**
 * 데이터 백업 (관리용)
 */
function createBackup() {
  try {
    const sheet = getOrCreateSheet();
    const backupName = `${SHEET_NAME}_backup_${Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyyMMdd_HHmmss')}`;
    
    const newSheet = sheet.copyTo(SpreadsheetApp.openById(SPREADSHEET_ID));
    newSheet.setName(backupName);
    
    logMessage('INFO', '백업 생성 완료', { backupName: backupName });
    return `백업 생성 완료: ${backupName}`;
  } catch (error) {
    logMessage('ERROR', '백업 생성 실패', error);
    return '백업 생성 실패: ' + error.toString();
  }
}

/**
 * 통계 정보 조회 (관리용)
 */
function getStatistics() {
  try {
    const sheet = getOrCreateSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length < 2) {
      return { totalRequests: 0, todayRequests: 0, completedRequests: 0 };
    }

    const data = values.slice(1); // 헤더 제외
    const today = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
    
    const stats = {
      totalRequests: data.length,
      todayRequests: data.filter(row => row[0] && row[0].toString().includes(today)).length,
      completedRequests: data.filter(row => row[14] === '완료').length,
      processingRequests: data.filter(row => row[14] === '처리중').length,
      byIndustry: {},
      byEmployeeCount: {}
    };

    // 업종별 통계
    data.forEach(row => {
      const industry = row[2] || '미분류';
      stats.byIndustry[industry] = (stats.byIndustry[industry] || 0) + 1;
    });

    // 직원수별 통계
    data.forEach(row => {
      const employeeCount = row[4] || '미분류';
      stats.byEmployeeCount[employeeCount] = (stats.byEmployeeCount[employeeCount] || 0) + 1;
    });

    logMessage('INFO', '통계 조회 완료', stats);
    return stats;
  } catch (error) {
    logMessage('ERROR', '통계 조회 실패', error);
    return { error: error.toString() };
  }
}

// ================================================================================
// 🚀 설치 완료 후 실행할 함수
// ================================================================================

/**
 * 초기 설정 함수 (설치 후 한 번 실행)
 */
function initialize() {
  console.log('M-CENTER Apps Script 초기화 시작...');
  
  try {
    // 시트 생성 및 설정
    const sheet = getOrCreateSheet();
    console.log('✅ 시트 생성 완료');
    
    // 테스트 데이터 생성 (선택사항)
    // createTestData();
    // console.log('✅ 테스트 데이터 생성 완료');
    
    console.log('🎉 M-CENTER Apps Script 초기화 완료!');
    console.log('📋 다음 단계:');
    console.log('1. 배포 → 새 배포 → 웹 앱');
    console.log('2. 실행 계정: 나');
    console.log('3. 액세스 권한: 모든 사용자');
    console.log('4. 배포 URL을 웹사이트 환경변수에 설정');
    
    return '초기화 완료';
  } catch (error) {
    console.error('❌ 초기화 실패:', error);
    return '초기화 실패: ' + error.toString();
  }
}

// ================================================================================
// 📝 사용법 가이드
// ================================================================================

/**
 * 사용법 가이드를 콘솔에 출력
 */
function showUsageGuide() {
  console.log(`
================================================================================
📋 M-CENTER Apps Script 사용법 가이드
================================================================================

🔧 1. 환경설정 (필수)
   - SPREADSHEET_ID: 현재 시트 ID로 변경
   - SHEET_NAME: 원하는 시트명으로 변경
   - NOTIFICATION_EMAIL: 알림 받을 이메일 설정

🚀 2. 배포 방법
   1) 저장 → 배포 → 새 배포
   2) 유형: 웹 앱
   3) 실행 계정: 나
   4) 액세스 권한: 모든 사용자
   5) 배포 → URL 복사

📡 3. API 엔드포인트
   - POST /: 새로운 진단 신청 저장
   - POST / (action: update): AI 진단 결과 업데이트
   - POST / (action: get): 데이터 조회
   - GET /: 시스템 상태 확인

🧪 4. 테스트 함수
   - initialize(): 초기 설정
   - createTestData(): 테스트 데이터 생성
   - createTestResultUpdate(): 테스트 결과 업데이트
   - getStatistics(): 통계 정보 조회

📊 5. 관리 함수
   - resetSheet(): 시트 초기화
   - createBackup(): 데이터 백업
   - getAllDiagnosisData(): 전체 데이터 조회

📧 6. 이메일 알림
   - 신규 신청 시 관리자 알림
   - 신청자 자동 응답 (선택사항)

================================================================================
  `);
}

/**
 * Apps Script 버전 정보
 */
function getVersionInfo() {
  return {
    version: '3.0',
    lastUpdated: '2025-01-27',
    features: [
      '신규 진단 신청 저장',
      'AI 진단 결과 업데이트',
      '데이터 조회 및 검색',
      '실시간 모니터링',
      '자동 알림 시스템',
      '데이터 백업 및 통계',
      '중복 신청 감지',
      '자동 스타일링'
    ],
    author: 'M-CENTER Development Team',
    contact: 'hongik423@gmail.com'
  };
}

// ================================================================================
// 🏁 초기 설정 및 실행 가이드
// ================================================================================

/**
 * 🚀 설치 완료 후 실행 순서:
 * 
 * 1. Apps Script 편집기에서 'initialize' 함수 선택 후 실행
 * 2. 권한 승인 진행
 * 3. 배포 → 새 배포 → 웹 앱으로 설정
 * 4. 실행 계정: 나, 액세스 권한: 모든 사용자
 * 5. 배포 URL을 프로젝트 .env.local에 추가
 * 
 * ✅ 현재 설정 상태:
 * - SPREADSHEET_ID: 실제 구글시트 연결됨
 * - 알림 이메일: 활성화됨
 * - 자동 응답: 활성화됨
 * - 시트명: m_center_landingpage-request
 */

// 초기화 함수 실행 (설치 후 한 번만)
// initialize();

// ================================================================================
// 🎉 M-CENTER Apps Script 운영 준비 완료!
// ================================================================================
/*
 * ✅ 모든 설정이 완료된 운영 준비 상태입니다!
 * 
 * 📋 현재 설정:
 * - 구글시트: 1LQNeT0abhMHXktrNjRbxl2XEFWVCwcYr5kVTAcRvpfM ✅
 * - 시트명: m_center_landingpage-request ✅
 * - 관리자 알림: hongik423@gmail.com ✅
 * - 자동 응답 이메일: 활성화 ✅
 * - 18개 컬럼 시트 구조: 완성 ✅
 * - 실시간 모니터링: 활성화 ✅
 * 
 * 🚀 바로 사용 가능한 기능:
 * - AI 진단 신청 데이터 자동 저장
 * - AI 진단 결과 업데이트
 * - 이메일 알림 및 자동 응답
 * - 데이터 조회 및 통계
 * - 백업 및 관리 기능
 * 
 * 📞 기술 지원: M-CENTER Development Team
 * 📧 문의: hongik423@gmail.com
 */ 