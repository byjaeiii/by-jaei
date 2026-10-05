BY JAEI 웹앱

구성
- index.html : 고객용 BY JAEI
- admin.html : 관리자 페이지
- config.js : Supabase 연결 설정

이번 수정
1. 주문서의 주소검색 기능을 완전히 제거했습니다.
   - 주소검색 버튼 제거
   - 카카오 주소검색 스크립트 제거
   - 상세주소 입력란 제거
   - 배송지는 한 칸에 고객이 직접 수기로 입력합니다.
2. 관리자 페이지의 기존 기능은 유지하고 검색 기능만 추가했습니다.
   - 회원 관리: 고객 이름 + 가입일 시작/종료 검색
   - 주문 관리: 고객 이름 + 주문일 시작/종료 검색

주의
- Supabase의 orders 테이블에 admin_memo 컬럼이 필요합니다.
- 기존 Supabase URL/Publishable Key는 config.js에 있습니다.
