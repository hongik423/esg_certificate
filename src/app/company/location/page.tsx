'use client'

import React, { useState } from 'react'
import { 
  MapPin, 
  Train, 
  Car, 
  Bus,
  Phone,
  Mail,
  Clock,
  Building,
  Navigation,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LocationPage() {
  const [activeTab, setActiveTab] = useState('public')

  // 주소 복사
  const copyAddress = () => {
    navigator.clipboard.writeText('서울특별시 구로구 디지털로26길 87 (구로동) 703호')
    alert('주소가 클립보드에 복사되었습니다.')
  }

  // 네이버/카카오 지도 열기
  const openNaverMap = () => {
    window.open('https://map.naver.com/v5/search/서울특별시%20구로구%20디지털로26길%2087', '_blank')
  }

  const openKakaoMap = () => {
    window.open('https://map.kakao.com/?q=서울특별시%20구로구%20디지털로26길%2087', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">오시는 길</h1>
          <p className="text-xl">ESG 인증원 본사 위치 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 주소 및 연락처 정보 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">주소</h3>
                  <p className="text-gray-600">
                    서울특별시 구로구 디지털로26길 87<br />
                    (구로동) 703호
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={copyAddress}
                  >
                    주소 복사
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">연락처</h3>
                  <p className="text-gray-600">
                                    전화: 010-9251-9743<br />
                팩스: 02-6280-2084
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">업무시간</h3>
                  <p className="text-gray-600">
                    평일: 09:00 - 18:00<br />
                    점심: 12:00 - 13:00
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 지도 영역 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>위치 지도</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 실제로는 네이버/카카오 지도 API를 사용 */}
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">지도 영역</p>
                <p className="text-sm text-gray-500">네이버/카카오 지도 API 연동 예정</p>
              </div>
            </div>

            {/* 지도 앱으로 보기 버튼 */}
            <div className="flex gap-4 justify-center">
              <Button onClick={openNaverMap} variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                네이버 지도로 보기
              </Button>
              <Button onClick={openKakaoMap} variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                카카오맵으로 보기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 교통편 안내 */}
        <Card>
          <CardHeader>
            <CardTitle>교통편 안내</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="public">대중교통</TabsTrigger>
                <TabsTrigger value="car">자가용</TabsTrigger>
                <TabsTrigger value="landmarks">주변 시설</TabsTrigger>
              </TabsList>

              {/* 대중교통 */}
              <TabsContent value="public" className="mt-6">
                <div className="space-y-6">
                  {/* 지하철 */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Train className="h-5 w-5 text-blue-600" />
                      지하철
                    </h4>
                    <div className="space-y-3 pl-7">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900">2호선 구로디지털단지역</p>
                        <p className="text-sm text-blue-700">
                          • 6번 출구에서 도보 8분<br />
                          • 대륭포스트타워 5차 방향
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="font-medium text-purple-900">7호선 남구로역</p>
                        <p className="text-sm text-purple-700">
                          • 3번 출구에서 도보 10분<br />
                          • 구로디지털단지 방향
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 버스 */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Bus className="h-5 w-5 text-green-600" />
                      버스
                    </h4>
                    <div className="space-y-2 pl-7">
                      <div className="p-3 bg-gray-50 rounded">
                        <span className="font-medium">간선버스:</span>
                        <span className="text-gray-600 ml-2">571, 652, 653</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <span className="font-medium">지선버스:</span>
                        <span className="text-gray-600 ml-2">5012, 5528, 5714</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <span className="font-medium">마을버스:</span>
                        <span className="text-gray-600 ml-2">구로08, 구로09</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 자가용 */}
              <TabsContent value="car" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Car className="h-5 w-5 text-red-600" />
                      자가용 이용 시
                    </h4>
                    <div className="space-y-4 pl-7">
                      <div>
                        <p className="font-medium mb-2">서울 방면에서 오시는 길</p>
                        <p className="text-sm text-gray-600">
                          남부순환로 → 구로디지털단지 방향 → 디지털로26길 진입
                        </p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">경기 방면에서 오시는 길</p>
                        <p className="text-sm text-gray-600">
                          서부간선도로 → 구로IC → 구로디지털단지 방향
                        </p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">강남 방면에서 오시는 길</p>
                        <p className="text-sm text-gray-600">
                          강남대로 → 사당역 → 남부순환로 → 구로디지털단지
                        </p>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>주차 안내</strong><br />
                      건물 지하 주차장 이용 가능 (유료)<br />
                      주차요금: 10분당 500원 / 일일 최대 15,000원
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>

              {/* 주변 시설 */}
              <TabsContent value="landmarks" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Building className="h-5 w-5 text-gray-600 mb-2" />
                    <h5 className="font-medium mb-1">주요 건물</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 대륭포스트타워 5차</li>
                      <li>• 벽산디지털밸리</li>
                      <li>• 에이스하이엔드타워</li>
                      <li>• 디지털엠파이어</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-600 mb-2" />
                    <h5 className="font-medium mb-1">편의시설</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 이마트 구로점 (도보 5분)</li>
                      <li>• 현대백화점 디큐브시티 (도보 10분)</li>
                      <li>• 구로구청 (차량 10분)</li>
                      <li>• 고려대학교 구로병원 (차량 15분)</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 방문 예약 안내 */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-2">방문 예약 안내</h3>
            <p className="text-blue-800 mb-3">
              원활한 상담을 위해 방문 전 예약을 권장합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                전화 예약: 010-9251-9743
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                <Mail className="h-4 w-4 mr-2" />
                이메일 예약: hongik423@gmail.com
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 