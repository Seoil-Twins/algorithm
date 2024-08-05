# algorithm
알고리즘 문제 및 해설 웹 사이트

## 프로젝트 소개
- 코딩 테스트를 위해 준비하는 사람들을 위한 알고리즘 문제 풀이 및 해설 사이트입니다.
- 코딩 테스트 문제를 풀고, 모르는 것을 질문하고, 알고리즘에 대한 피드백을 남길 수 있습니다.
- 알고리즘에 대해 공유를 할 수 있고, 학습 참여도를 높이기 위해 랭킹 시스템을 도입하였습니다.
- 지식인, 스택오버플로우와 같이 질문에 답변을 남기고, 채택 시스템을 사용할 수 있습니다.

  ### 팀원 구성
  - 김승용
    - 기획
    - DB 설계
    - API 설계
    - 디자인
    - Frontend
    - Backend
  - 윤성빈
    - DB 설계
    - API 설계
    - Backend
   
### 1. 개발환경
- Backend
  - Spring Boot 3
  - Java 17
  - gradle
  - JPA
- Frontend
  - Next JS 14
  - React 18
- DB
  - MySQL 8.1
  - Redis
- 코드 컨벤션
  - FrontEnd -> Prettier + Eslint

## 2. 협업 툴
- PostMan
- Github issue
- Notion
- Figma

## 3. 해당 프로젝트를 한 이유
백준 온라인 저지 사이트는 방대한 코딩 문제를 제공하지만, 해설 자체를 제공해주지 않고 있습니다.

많은 사람들은 백준 문제를 풀다가 모르겠으면 "백준 N번"을 구글에 검색하여 다른 사람이 짠 코드를 참고하고 있습니다. 또는 백준에서 정답 제출 내역에 가서 남이 짠 코드를 확인하지만, 남이 짠 코드를 이해하기에는 다소 어려움이 있습니다.

그러기에, 해당 프로젝트는 다른 사람과의 소통을 중요시하고, 사이트 내에서 자체적으로 해설을 제공하여 구글 검색의 번거로움을 최소화 하였습니다.

## 4. 해당 기술을 채택한 이유
많은 사람들이 해당 알고리즘 문제를 검색하였을 때 검색 결과가 잘 떠야하며, 사이트에서는 게시판의 구조를 가지고 있습니다.

그러기에, CSR 방식인 React, Vue 보다는 SEO 최적화에 유리한 Next JS를 채택하였습니다.

가장 접근성이 좋은 Spring Boot를 선택하고, Next JS Backend 단을 활용하여 외부 API 주소를 노출시키지 않게 프록시 서버로 사용하였습니다.

## 5. 브랜치 전략
- main 브랜치는 언제나 배포 가능한 상태여야 한다.
- develop 브랜치는 기능 개발 또는 일정 기간 개발을 모아두는 브랜치이다.
- main , develop 제외 모든 파생 브랜치들은 "기준_브랜치명-브랜치_생성_날짜-이름_이니셜"로 이루어진다.
- 최대한 기능 단위로 commit을 시도하고, 원격 브랜치에 push를 한다.
- 중간 보고마다 브랜치를 develop에 merge 하고, 에러 또는 충돌을 해결한다.

## 6. 페이지별 기능
### 메인 화면
- 강의 동영상
- 추천 알고리즘 (일주일 안에 사람들이 많이 시도한 알고리즘)
- 추천 게시글 (조회수, 좋아요 등을 활용해 가장 인기 있는 알고리즘)
- 유저 알림
- 다크모드 제공
![image](https://github.com/user-attachments/assets/4a67d07d-ab72-4b44-a3eb-990135d1cbf2)
![image](https://github.com/user-attachments/assets/f5dcb939-e07e-4b74-9b20-3d37b154c234)
![image](https://github.com/user-attachments/assets/b7bf88ad-47c9-4837-83e9-9e4d7f7c8d01)

### 로그인
- 이메일, 비밀번호를 통한 로그인
![image](https://github.com/user-attachments/assets/9ebbef77-05aa-4afe-881f-dfc9b35c1643)

### 회원가입
- 닉네임, 이메일, 비밀번호를 입력
- 이메일 인증을 통해 사용자 인증
![image](https://github.com/user-attachments/assets/bfea3523-5ae9-4b15-bcba-1298bb66aa1f)
![image](https://github.com/user-attachments/assets/f5ff0e89-cafa-464b-a2b4-8721a5d860a6)

### 개정 관리
- 닉네임, 이메일 변경
- 계정 연동 (Github, Google, Naver, Kakao)
- 계정 삭제
![image](https://github.com/user-attachments/assets/de532a5d-e4bf-42d7-b5eb-2c2d04204a64)
![image](https://github.com/user-attachments/assets/834db2ae-8b74-4b00-9525-568f183532c6)

### 나의 활동
![image](https://github.com/user-attachments/assets/336404e7-3c77-47f8-a94a-69609c939495)

### 알림 설정
![image](https://github.com/user-attachments/assets/49d1636e-bc22-4887-ac98-f42de1c9eeb5)

### 문제 목록
- 최신순, 오래된순
- 알고리즘 레벨 (0 ~ 5)
- 정답률 높은순, 낮은순
- 알고리즘 분류 (수학, 구현, 동적프로그래밍, 자료구조, 그래프, 그리디, 브루트포스, 정렬, 기하학, 트리, 세그먼트, BFS, DFS, 기타 등)
- 알고리즘 검색 제공
- 해결 여부 상태, 제목, 난이도, 분류, 정답률 제공
![image](https://github.com/user-attachments/assets/0b58cd77-2450-47e9-b4c6-a3bc3e8d617b)

### 문제 상세
- 문제 내용 제공
- 코드 에디터 제공
- 실행 결과
- 테스트 케이스
- 언어는 Java, C++, Python 제공
![image](https://github.com/user-attachments/assets/49f436f3-3e0d-4db0-807e-71ce3de06262)
![image](https://github.com/user-attachments/assets/f711855d-62a9-448b-8734-b1e2108b381b)
![image](https://github.com/user-attachments/assets/80d39fe9-131b-4a36-a627-7614c8553c46)

### 알고리즘 질문 및 피드백
- 해결 여부 상태, 닉네임, 분류, 일자 제공
![image](https://github.com/user-attachments/assets/6bf1767d-5187-40cc-83f4-90d522c2e33a)

### 글쓰기
- 에디터 제공
- Markdown 사용 가능
![image](https://github.com/user-attachments/assets/c9b953bb-1e31-4f04-b476-335e32250dc0)

### 글 상세
- 제목
- 각종 폰트
- 블락 쿼터, 링크, 이미지, 유튜브 임베드, 라인
- 댓글
- 글 수정, 삭제
- 좋아요
![image](https://github.com/user-attachments/assets/64946f22-30d0-41a1-a3c6-7700e0c5c534)
![image](https://github.com/user-attachments/assets/d57debf1-0442-4f0c-81ba-787b0afaeb59)

### 댓글
- 댓글 쓰기, 수정, 삭제
- 에디터 제공
- 채택
- 좋아요
![image](https://github.com/user-attachments/assets/94f5d36f-a870-4110-91a5-28c0164b1977)

### 게시판
- 질문, 자유 카테고리
- 조회수, 좋아요 개수, 댓글 개수
![image](https://github.com/user-attachments/assets/a2e410ae-e51f-414d-8f5e-48dd36191904)
![image](https://github.com/user-attachments/assets/ca016718-e89e-4242-ad25-7c78eabba2a6)

### 랭킹
![image](https://github.com/user-attachments/assets/f8ae4e84-12bc-4770-9996-c55dda97dc9c)

## 7. 신경 쓴 부분
- Next JS의 14버전 사용을 적극적으로 도입하였습니다.
- Session + Redis을 통해 유저를 관리하고, 요청마다 세션을 유효시간을 갱신하였습니다.
- SSR을 위해 최대한 서버 컴포넌트에서 Get API을 사용하고, 작성과 같은 POST, PATCH, DELETE는 클라이언트 컴포넌트에서 사용했습니다.
